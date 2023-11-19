/// <reference types="cypress" />

describe("works successfully", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem("accessToken", "test-accessToken");

    cy.visit("http://localhost:3000");
    cy.contains("Соберите бургер");
  });

  it("should work successfully", () => {
    //открытие модального окна с информацией об игредиенте
    cy.get('[alt="Соус с шипами Антарианского плоскоходца"]').click();
    cy.get('[data-cy="ingredient-modal"]').contains(
      "Соус с шипами Антарианского плоскоходца"
    );

    //закрытие модального окна с информацией об игредиенте
    cy.get('[data-cy="close-button"]').click();
    cy.get('[data-cy="close-button"]').should("not.exist");

    //добавление ингредиентов в конструктор
    cy.get('[alt="Краторная булка N-200i"]').trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[alt="Биокотлета из марсианской Магнолии"]').trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[alt="Соус с шипами Антарианского плоскоходца"]').trigger(
      "dragstart"
    );
    cy.get('[data-cy="constructor"]').trigger("drop");

    //удаление ингредиента из конструктора
    cy.get('[data-cy="constructor-item"]').eq(0).find("svg").eq(2).click();
    cy.get('[data-cy="constructor-items"]').should("have.length", 1);

    //оформление заказа зарегистрированным пользователем
    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="order-modal"]').contains("идентификатор заказа");

    //закрытие модального окна с номером заказа
    cy.get('[data-cy="close-button"]').click();
    cy.get('[data-cy="close-button"]').should("not.exist");
  });
});
