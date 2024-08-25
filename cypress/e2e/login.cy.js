const APP_URL = Cypress.env("host");

describe("Login", () => {
  it("redirects to login for the first time", () => {
    cy.visit(APP_URL);

    cy.url().should("include", "/login");
  });

  it("should not login with incorrect credentials", () => {
    cy.visit(APP_URL);

    cy.get("#login_form_username").type("test_user");
    cy.get("#login_form_password").type("TestUser@123");
    cy.get(".login-form-button").click();

    cy.url().should("include", "/login");
    cy.contains("Invalid username or password").should("be.visible");
  });

  it("should not login with correct credentials", () => {
    cy.visit(APP_URL);

    cy.intercept("POST", "http://localhost:3001/api/auth/login", { fixture: "login.json" });
    cy.intercept("GET", "http://localhost:3001/api/todo", { fixture: "todo.json" });

    cy.get("#login_form_username").type("correct_user");
    cy.get("#login_form_password").type("correctUser@123");
    cy.get(".login-form-button").click();

    cy.contains("TODO").should("be.visible");
  });
});
