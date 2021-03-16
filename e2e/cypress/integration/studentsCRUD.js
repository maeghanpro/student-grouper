/// <reference types="Cypress" />

describe("students CRUD", () => {
  before(() => {
    cy.task("db:truncate", "User");

    cy.task("db:truncate", "ClassSection");

    cy.task("db:truncate", "Student");

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

    cy.task("db:find", {
      modelName: "ClassSection",
      conditions: { name: "7A" },
    }).then((classSection) => {
      cy.task("db:insert", {
        modelName: "Student",
        json: {
          firstName: "Maeghan",
          lastInitial: "P.",
          classSectionId: classSection[0].id,
          academicTier: "1",
          socialEmotionalTier: "3",
        },
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

    cy.get(".class-card")
      .find(".class-card-button")
      .first()
      .click();
  });

  it("view student in the table", () => {
    cy.get("tbody")
      .first()
      .find("th")
      .should("contain", "Maeghan P.")
  })
});