describe("Add/remove movie from watch later", () => {
  it("Should type in the search bar and perform a search and add the movie to the watch later list and then remove it afterwards", () => {
    cy.visit("http://localhost:5173/project2");

    // Assuming your search input has a data-testid attribute
    cy.get('[data-testid="search-input"]').type("Inception").type("{enter}");
    // Wait for the search results to be visible
    cy.get('[data-testid^="movie-poster-tt"]').should(
      "have.length.greaterThan",
      0,
    );

    // Clicking the movie "Inception", which should be there if properly loaded
    cy.get('[data-testid="movie-poster-tt1375666"]').click();

    // Wait for the movie details to be loaded
    cy.get(".title").should("be.visible");

    // Click on the add to watch later button
    cy.get(".list-button.add").click();

    // Navigate to the watch later tab
    cy.get('[title="Watch later"]').click();

    // Check if the movie appears in the watch later list
    cy.get('[data-testid="movie-poster-tt1375666"]').should("be.visible");

    // Click the movie
    cy.get('[data-testid="movie-poster-tt1375666"]').click();

    cy.get(".title").should("be.visible");

    // Remove the movie from the list
    cy.get(".list-button.remove").click();

    cy.reload();

    // Verify that the movie has been removed after refreshing
    cy.get('[data-testid^="movie-poster-tt"]').should("have.length", 0);
  });
});
