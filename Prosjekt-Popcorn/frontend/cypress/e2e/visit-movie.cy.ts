describe("Open a movie from the homepage and visit the movie page.", () => {
  it("Should open a popup from the homepage and click on more information.", () => {
    cy.visit("http://localhost:5173/project2");

    // Verify that he movie "Antidote" should be visible on the homepage, if loaded correctly.
    cy.get('[data-testid="movie-poster-tt11840988"]').should("be.visible");

    // Click on the movie poster
    cy.get('[data-testid="movie-poster-tt11840988"]').click();

    // Wait for the movie details to be loaded and verify that the title is visible and is correct.
    cy.get(".title").should(($title) => {
      expect($title).to.have.text("Antidote");
    });

    // Navigate to the movie page
    cy.get(".moreinfo-button").click();

    // Verify that the movie page is loaded and subdetails are visible.
    cy.get(".subdetails").should("be.visible");
  });
});
