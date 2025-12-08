/// <reference types="cypress"/>

import HomePage from '../pages/WebCom/HomePage';
import SignupPage from '../pages/WebCom/SignupPage';
import ProductsPage from '../pages/WebCom/ProductsPage';
import CartPage from '../pages/WebCom/CartPage';
import CheckoutPage from '../pages/WebCom/CheckoutPage';

describe('Requisito 4 - Finalização da Compra', () => {
    
    beforeEach(() => {
        HomePage.visit();
    });

    it('TC01 - Deve finalizar compra com sucesso (usuário registrado)', () => {
        cy.fixture('webcom').then((data) => {
            const timestamp = Date.now();
            const email = data.validUser.email.replace('{{timestamp}}', timestamp);
            HomePage.goToSignupLogin();
            SignupPage.fillSignupForm(data.validUser.name, email);
            SignupPage.fillAccountInformation({
                ...data.validUser,
                email: email
            });
            SignupPage.continueButton.click();
            HomePage.goToProducts();
            ProductsPage.viewFirstProduct();
            ProductsPage.addProductToCart();
            ProductsPage.viewCartLink.click();
            CartPage.proceedToCheckout();
            CheckoutPage.deliveryAddressDetails.should('be.visible');
            CheckoutPage.billingAddressDetails.should('be.visible');
            CheckoutPage.reviewOrderTable.should('be.visible');
            CheckoutPage.addComment('Por favor, entregar após às 14h');
            CheckoutPage.placeOrder();
            CheckoutPage.fillPaymentDetails(data.payment);
            CheckoutPage.successMessage.should('be.visible');
            cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
            HomePage.deleteAccount();
        });
    });

    it('TC02 - Deve exibir endereços de entrega e cobrança corretamente', () => {
        cy.fixture('webcom').then((data) => {
            const timestamp = Date.now();
            const email = data.validUser.email.replace('{{timestamp}}', timestamp);
            HomePage.goToSignupLogin();
            SignupPage.fillSignupForm(data.validUser.name, email);
            SignupPage.fillAccountInformation({
                ...data.validUser,
                email: email
            });
            SignupPage.continueButton.click();
            HomePage.goToProducts();
            ProductsPage.viewFirstProduct();
            ProductsPage.addProductToCart();
            ProductsPage.viewCartLink.click();
            CartPage.proceedToCheckout();
            CheckoutPage.deliveryAddressDetails.should('contain', data.validUser.firstName);
            CheckoutPage.deliveryAddressDetails.should('contain', data.validUser.lastName);
            CheckoutPage.deliveryAddressDetails.should('contain', data.validUser.address);
            CheckoutPage.deliveryAddressDetails.should('contain', data.validUser.city);
            HomePage.deleteAccount();
        });
    });

    it('TC03 - Deve solicitar login ao tentar finalizar compra sem autenticação', () => {
        HomePage.goToProducts();
        ProductsPage.viewFirstProduct();
        ProductsPage.addProductToCart();
        ProductsPage.viewCartLink.click();
        CartPage.proceedToCheckout();
        
        cy.get('body').then(($body) => {
            if ($body.find('.modal').length > 0) {
                cy.get('.modal').should('be.visible');
            } else {
                CartPage.registerLoginLink.should('be.visible');
            }
        });
    });

    it('TC04 - Deve exibir confirmação e permitir download de invoice', () => {
        cy.fixture('webcom').then((data) => {
            const timestamp = Date.now();
            const email = data.validUser.email.replace('{{timestamp}}', timestamp);
            HomePage.goToSignupLogin();
            SignupPage.fillSignupForm(data.validUser.name, email);
            SignupPage.fillAccountInformation({
                ...data.validUser,
                email: email
            });
            SignupPage.continueButton.click();
            
            HomePage.goToProducts();
            ProductsPage.viewFirstProduct();
            ProductsPage.addProductToCart();
            ProductsPage.viewCartLink.click();
            CartPage.proceedToCheckout();
            CheckoutPage.placeOrder();
            CheckoutPage.fillPaymentDetails(data.payment);
            CheckoutPage.successMessage.should('be.visible');
            CheckoutPage.downloadInvoiceButton.should('be.visible');
            CheckoutPage.continueButton.should('be.visible');
            CheckoutPage.continueButton.click();
            HomePage.deleteAccount();
        });
    });
});
