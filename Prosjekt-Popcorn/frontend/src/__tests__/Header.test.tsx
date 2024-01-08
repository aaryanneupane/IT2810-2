import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";
import { expect } from "vitest";

// This a component test for the header navigation

test("Header navigation", () => {
  const { getAllByText } = render(
    <Router>
      <Header />
    </Router>,
  );

  // Click on the "Discover" button
  const discoverButtons = getAllByText("Discover");
  fireEvent.click(discoverButtons[0]);
  const path1 = location.pathname;
  expect(path1).toBe("/discover");

  // Click on the "Watch later" button
  const watchLaterButtons = getAllByText("Watch later");
  fireEvent.click(watchLaterButtons[0]);
  const path2 = location.pathname;
  expect(path2).toBe("/watch-later");

  // Go back to the home page
  const HomeButtons = getAllByText("Home");
  fireEvent.click(HomeButtons[0]);
  const path3 = location.pathname;
  expect(path3).toBe("/");
});
