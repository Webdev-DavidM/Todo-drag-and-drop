/// <reference types="cypress" />

describe("tests for todos", () => {
  beforeEach(() => {
    cy.viewport(1500, 1000);
    cy.visit("http://localhost:3000");
  });
  it("On page load the todos are loaded and displayed in the UI", () => {
    cy.getByData("todo-card").should("exist");
  });
  it("If I create a todo, a modal appears and once completed the new Todo  shows in the ui", () => {
    cy.getByData("add-todo-button").first().click();
    cy.getByData("todo-input-title").type("test title");
    cy.getByData("todo-input-description").type("test description");
    cy.getByData("todo-save-button").click();
    cy.getByData("todo-title").contains("test title");
  });

  it("If the user deletes an item, a modal will appear and the todo will not show in the ui anymore", () => {
    cy.getByData("add-todo-button").first().click();
    cy.getByData("todo-input-title").type("todo to delete");
    cy.getByData("todo-input-description").type("test description");
    cy.getByData("todo-save-button").click();
    cy.getByData("todo-card")
      .contains("todo to delete")
      .parent()
      .parent()
      .find("[data-cy=todo-delete-button]")
      .click()
      .getByData("delete-modal-confirmation")
      .click();
    cy.getByData("todo-card").contains("todo to delete").should("not.exist");
  });

  it.only("If you click edit the field in a todo, it will update the todo", () => {
    cy.getByData("todo-card")
      .first()
      .find("[data-cy=todo-edit-button]")
      .click();
    cy.getByData("todo-card")
      .first()
      .find("[data-cy=todo-input-title]")
      .click()
      .clear()
      .type("updated title")
      .parent()
      .parent()
      .find("[data-cy=todo-save-button]")
      .click();
    cy.getByData("todo-card").contains("updated title");
  });
});
