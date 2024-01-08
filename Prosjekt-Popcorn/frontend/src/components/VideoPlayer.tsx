import React, { useRef, useState } from "react";
import "./styles/VideoPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeOff, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

/* 
This is the component for displaying the video player on the homepage.
It will play a different movie each day of the week.
*/

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Get the title of the video from the src
  const title = src.split("/")[src.split("/").length - 1].split(".")[0];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMuteUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="video-player" onClick={handlePlayPause}>
      <h2 className="video-title">
        Prosjekt - Popcorn's daily recommendation: {title}
      </h2>
      <button
        className="mute-btn"
        onClick={handleMuteUnmute}
        aria-label="Mute button"
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeOff : faVolumeUp} size="xl" />
      </button>
      <video
        ref={videoRef}
        loop
        playsInline
        autoPlay
        muted
        style={{ width: "100%" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
