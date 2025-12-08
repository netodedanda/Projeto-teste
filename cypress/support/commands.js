// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import ticketsPage from "../pages/Tickets/TicketsPages"
import HomePage from "../pages/WebCom/HomePage"
import SignupPage from "../pages/WebCom/SignupPage"
import ProductsPage from "../pages/WebCom/ProductsPage"

Cypress.Commands.add("fillMandatoryFields", () => {
    cy.fixture("user.json").then((user) => {
        ticketsPage.FirstName.type(user.name);
        ticketsPage.LastName.type(user.lastName);
        ticketsPage.Email.type(user.email);
    })

    ticketsPage.Agree.check();
    ticketsPage.SubmitButton.click();
})

/**
 * Comando customizado para criar e logar um usuário
 * @param {Object} userData - Dados do usuário (opcional, usa fixture se não fornecido)
 */
Cypress.Commands.add("createAndLoginUser", (userData = null) => {
    cy.fixture('webcom').then((data) => {
        const timestamp = Date.now();
        const email = data.validUser.email.replace('{{timestamp}}', timestamp);
        const user = userData || { ...data.validUser, email };
        
        HomePage.visit();
        HomePage.goToSignupLogin();
        SignupPage.fillSignupForm(user.name, email);
        SignupPage.fillAccountInformation(user);
        SignupPage.continueButton.click();
        
        // Retornar email para uso posterior
        cy.wrap(email).as('userEmail');
    });
});

/**
 * Comando customizado para adicionar produto ao carrinho
 * @param {number} productIndex - Índice do produto (padrão: 0)
 * @param {number} quantity - Quantidade (padrão: 1)
 */
Cypress.Commands.add("addProductToCart", (productIndex = 0, quantity = 1) => {
    HomePage.goToProducts();
    ProductsPage.viewProductButtons.eq(productIndex).click();
    ProductsPage.addProductToCart(quantity);
});

/**
 * Comando customizado para limpar carrinho
 */
Cypress.Commands.add("clearCart", () => {
    HomePage.goToCart();
    cy.get('body').then(($body) => {
        if ($body.find('.cart_quantity_delete').length > 0) {
            cy.get('.cart_quantity_delete').each(($btn) => {
                cy.wrap($btn).click();
                cy.wait(500);
            });
        }
    });
});