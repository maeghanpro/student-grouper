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

    cy.get(".class-card").find(".class-card-button").first().click();
  });

  it("view student in the table", () => {
    cy.get("tbody").first().find("th").should("contain", "Maeghan P.");
  });

  it("create a new student", () => {
    cy.get(".student-fab").click();

    cy.get("tbody")
      .first()
      .within(() => {
        cy.findByLabelText("First Name*").type("Craig");

        cy.findByLabelText("Last Initial*").type("B.");

        cy.get("#new-student-academicTier").click();

        cy.focused().siblings("li").contains("1 - No support").click();

        cy.get("#new-student-socialEmotionalTier").click();

        cy.focused().siblings("li").contains("2 - Some support").click();

        cy.get("#submit-new-student-button").click();
      });

    cy.get("tbody")
      .find("th")
      .contains("Craig B.")
      .siblings("td")
      .each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
        } else if (index === 1) {
          expect($el).to.contain("2");
        }
      });
  });

  it("update a student", () => {
    cy.get("tbody").find(".edit-student-icon").first().click();

    cy.get("tbody")
      .first()
      .within(() => {
        cy.findByLabelText("First Name*").clear().type("Molly");

        cy.findByLabelText("Last Initial*").clear().type("P.");

        cy.get("#edit-student-academicTier").click();

        cy.focused().siblings("li").contains("2 - Some support").click();

        cy.get("#edit-student-socialEmotionalTier").click();

        cy.focused().siblings("li").contains("1 - No support").click();

        cy.get("#save-student-button").click();
      });

    cy.get("tbody")
      .find("th")
      .contains("Molly P.")
      .siblings("td")
      .each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("2");
        } else if (index === 1) {
          expect($el).to.contain("1");
        }
      });
  });

  it("delete a student", () => {
    cy.get("tbody").find(".delete-student-icon").first().click();

    cy.get(".dialog-proceed-button").click();

    cy.get("tbody").find("th").contains("Maeghan P.").should("not.exist");
  });
});
