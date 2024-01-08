describe("Search for a movie and test load more", () => {
  it("Should type in the search bar and perform a search and load more", () => {
    cy.visit("http://localhost:5173/project2");

    // Search for harry
    cy.get('[data-testid="search-input"]').type("Harry").type("{enter}");

    // Wait for the search results to be visible and verify that there are more than 0 results
    cy.get('[data-testid^="movie-poster-tt"]').should(
      "have.length.greaterThan",
      0,
    );
    // Verify that the load more button is visible in the given query "Harry". If done correctly it should be visible
    cy.get(".buttonContainer").should("be.visible");

    // Click on the load more button
    cy.get(".buttonContainer").click();

    // Verify that "Harry Potter and the Half-Blood Prince" is now visible after loading more
    cy.get('[alt="Harry Potter and the Half-Blood Prince"]').should(
      "be.visible",
    );

    // Click on the movie poster for "Harry Potter and the Half-Blood Prince"
    cy.get('[alt="Harry Potter and the Half-Blood Prince"]').click();

    cy.get(".title").should(($title) => {
      expect($title).to.have.text("Harry Potter and the Half-Blood Prince");
    });
  });
});
