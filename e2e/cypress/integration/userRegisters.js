/// <reference types="Cypress" />

describe("As a user visiting the registration page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/users/new");
  };

  before(() => {
    cy.task("db:truncate", "User");
  });
  
  it.only("If I provide a valid email, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage();
    Cypress.Cookies.defaults({
      preserve: ["student-grouper-session", "student-grouper-session.sig"]
    })
    cy.get("form").within(() => {
      cy.findByLabelText("Email*").type("user@example.com");

      cy.findByLabelText("Password*").type("password");
      cy.findByLabelText("Password Confirmation*").type("password")

      cy.root().submit().debug;

      cy.url().should("eq", `${Cypress.config().baseUrl}/classes`);
    });
    cy.contains("SIGN OUT");
  });

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText("Email*").type("just@a.joke");
      cy.findByLabelText("Password*").type("password");
      cy.root().submit();

      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`);
    });
  });

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText("Email*").type("user@example.com");

      cy.findByLabelText("Password*").type("password");
      cy.findByLabelText("Password Confirmation*").type("passwordNotAMatch");

      cy.root().submit();
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`);
    });
  });

  it("I will see an error message when no email is provided", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText("Password*").type("migratedata");
      cy.root().submit();

      cy.contains("is invalid");
    });
  });
});
