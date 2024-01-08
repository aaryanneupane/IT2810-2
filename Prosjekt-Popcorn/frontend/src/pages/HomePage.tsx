import MovieComponent from "../components/MovieComponent";
import "../index.css";
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";
import videos from "../../public/videoIndex";

/* 
This is the homepage. It is the first page you see when you enter the website.
*/

const HomePage = () => {
  const currentDayIndex = new Date().getDay();

  // Choose the video based on the current day
  const videoFile = videos[currentDayIndex];

  return (
    <main>
      <Header />
      <VideoPlayer src={videoFile} />
      <MovieComponent theme={"dark"}></MovieComponent>
    </main>
  );
};

export default HomePage;
