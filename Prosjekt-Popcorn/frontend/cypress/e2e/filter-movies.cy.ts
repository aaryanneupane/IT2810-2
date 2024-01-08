describe("DiscoverPage functionality", () => {
  it("should set filters, sort results, maintain state on navigation, and test pagination", () => {
    cy.visit("http://localhost:5173/project2");

    // Navigate to DiscoverPage
    cy.get('[data-testid="discover-page"]').click();

    // Set some filters
    cy.get('[data-testid="Action"]').click();
    cy.get('[data-testid="Drama"]').click();
    cy.get('[data-testid="year-start"]').select("2000");
    cy.get('[data-testid="year-end"]').select("2010");

    // Check that the dark knight is not on the page
    cy.get('[data-testid="movie-poster-tt0468569"]').should("not.exist");

    // Set a sorting option
    cy.get('[data-testid="sort-select"]').select("Highest Rating");

    // Check that the dark knight is now on the page
    cy.get('[data-testid="movie-poster-tt0468569"]').should("exist");

    // Check pagination
    cy.get('[data-testid="pagination"]').find("li").contains("2").click();

    // Check that the dark knight is not on the page
    cy.get('[data-testid="movie-poster-tt0468569"]').should("not.exist");

    // Set some more filters to only show Gladiator
    cy.get('[data-testid="director-input"]').type("Ridley Scott");
    cy.get('[data-testid="cast-input"]').type("Joaquin Phoenix");

    // Check that Gladiator is now on the page
    cy.get('[data-testid="movie-poster-tt0172495"]').should("exist");

    // Navigate to homepage and then back to DiscoverPage
    cy.get('[data-testid="home-page"]').click();
    cy.get('[data-testid="discover-page"]').click();

    // Check if the filters are still there
    cy.get('[data-testid="Action"]').should("have.class", "active");
    cy.get('[data-testid="Drama"]').should("have.class", "active");
    cy.get('[data-testid="sort-select"]').should(
      "have.value",
      "Highest Rating",
    );
    cy.get('[data-testid="year-start"]').should("have.value", "2000");
    cy.get('[data-testid="year-end"]').should("have.value", "2010");
    cy.get('[data-testid="director-input"]').should(
      "have.value",
      "Ridley Scott",
    );
    cy.get('[data-testid="cast-input"]').should(
      "have.value",
      "Joaquin Phoenix",
    );

    // Clear filters
    cy.get('[data-testid="clear-btn"]').click();

    // Check if the filters are cleared
    cy.get('[data-testid="Action"]').should("not.have.class", "active");
    cy.get('[data-testid="director-input"]').should("have.value", "");
    cy.get('[data-testid="cast-input"]').should("have.value", "");
    cy.get('[data-testid="sort-select"]').should("have.value", "");
  });
});
