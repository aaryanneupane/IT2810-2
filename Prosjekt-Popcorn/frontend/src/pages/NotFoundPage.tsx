import Header from "../components/Header";

// This is a default page for non-existing routes

export default function NotFoundPage() {
  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1>404 Not Found</h1>
        <a href="/project2">Click here to go back to the home page</a>
      </div>
    </div>
  );
}
