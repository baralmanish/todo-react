const APP_URL = Cypress.env("host");
const AP_URL = Cypress.env("apiUrl");

describe("TODO", () => {
  beforeEach(() => {
    cy.visit(APP_URL);

    cy.intercept("POST", "http://localhost:3001/api/auth/login", { fixture: "login.json" });
    cy.intercept("GET", "http://localhost:3001/api/todo", { fixture: "todo.json" });
    cy.intercept("POST", "http://localhost:3001/api/todo", { fixture: "new-todo.json" });
    cy.intercept("PUT", "http://localhost:3001/api/todo/1", { fixture: "marked-todo.json" });
    cy.intercept("DELETE", "http://localhost:3001/api/todo/1", { fixture: "" });

    cy.get("#login_form_username").type("correct_user");
    cy.get("#login_form_password").type("correctUser@123");
    cy.get(".login-form-button").click();
  });

  it("should list all todos", () => {
    cy.contains("TODO").should("be.visible");
    cy.get(".ant-list-item").should("have.length", 2);

    cy.contains("Todo 1").should("be.visible");
    cy.contains("Todo 2").should("be.visible");
  });

  it("add new todo", () => {
    cy.contains("TODO").should("be.visible");
    cy.get(".ant-list-item").should("have.length", 2);

    cy.get("#todo_add_form_title").type("Todo 3");
    cy.get("#todo_add_form").submit();

    cy.get(".ant-list-item").should("have.length", 3);
    cy.contains("Todo 3").should("be.visible");
  });

  it("mark complete", () => {
    cy.get(".ant-list-item").last().contains("Todo 1");
    cy.get(".ant-list-item").last().find(".ant-checkbox-wrapper").should("be.visible");
    cy.get(".ant-list-item").last().find(".ant-checkbox-wrapper").click();

    cy.get(".ant-list-item").last().find(".todo-title").should("have.class", "line-through");
  });

  it("delete todo", () => {
    cy.get(".ant-list-item").should("have.length", 2);

    cy.get(".ant-list-item").last().contains("Todo 1");
    cy.get(".ant-list-item").last().find(".anticon-delete").should("be.visible");
    cy.get(".ant-list-item").last().find(".anticon-delete").click();

    cy.get(".ant-popconfirm-buttons").should("be.visible");
    cy.get(".ant-popconfirm-buttons").find("button").last().contains("Yes");
    cy.get(".ant-popconfirm-buttons").find("button").last().click();

    cy.get(".ant-list-item").should("have.length", 1);
  });
});
