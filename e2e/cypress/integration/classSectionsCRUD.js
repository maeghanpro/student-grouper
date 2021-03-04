/// <reference types="Cypress" />

describe("classes CRUD", () => {
  before(() => {
    cy.task("db:truncate", "User");

    cy.task("db:truncate", "ClassSection");

    cy.task("db:insert", {
      modelName: "User",
      json: { email: "user@example.com", password: "password" },
    });

    cy.task("db:find", {
      modelName: "User",
      conditions: { email: "user@example.com" },
    }).then((user) => {
      cy.task("db:insert", {
        modelName: "ClassSection",
        json: { name: "7A", userId: user[0].id, color: "#93995F" },
      });
    });
  });

  beforeEach(() => {
    cy.visit("/user-sessions/new");

    cy.get("form").within(() => {
      cy.findByLabelText("Email*").type("user@example.com");

      cy.findByLabelText("Password*").type("password");

      cy.root().submit();
    });
  });

  it("view classes on the page", () => {
    cy.get(".class-card").should("contain", "7A");
  });

  it("create a new class", () => {
    cy.get(".class-fab").click();

    cy.get("form").within(() => {
      cy.findByLabelText("Class Name*").type("7B");

      cy.root().submit();
    })
    cy.get(".class-card").last().should("contain", "7B");
  });

  it("update a class", () => {
    cy.get(".class-card").first().within(() => {
      cy.get(".edit-class-icon").click();
    })

    cy.get("form").within(() => {
      cy.findByLabelText("Class Name*").clear().type("6A");

      cy.root().submit();
    })
    cy.get(".class-card").first().should("contain", "6A");
  });

  it("delete a class", () => {
    cy.get(".class-card").first().within(() => {
        cy.get(".delete-class-icon").click();
      });

    cy.get(".dialog-proceed-button").click();

    cy.get(".class-card").contains("6A").should("not.exist");
  });
});