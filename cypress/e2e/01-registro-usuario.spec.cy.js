/// <reference types="cypress"/>

import HomePage from '../pages/WebCom/HomePage';
import SignupPage from '../pages/WebCom/SignupPage';

describe('Requisito 1 - Registro de Usuário', () => {
    
    beforeEach(() => {
        HomePage.visit();
    });

    it('TC01 - Deve registrar um novo usuário com sucesso', () => {
        cy.fixture('webcom').then((data) => {
            const timestamp = Date.now();
            const email = data.validUser.email.replace('{{timestamp}}', timestamp);
            HomePage.goToSignupLogin();
            SignupPage.fillSignupForm(data.validUser.name, email);
            cy.url().should('include', '/signup');
            cy.contains('Enter Account Information').should('be.visible');
            SignupPage.fillAccountInformation({
                ...data.validUser,
                email: email
            });
            
            SignupPage.accountCreatedMessage.should('be.visible');
            SignupPage.accountCreatedMessage.should('contain', 'Account Created');
            SignupPage.continueButton.click();
            HomePage.loggedInUser.should('be.visible');
            HomePage.loggedInUser.should('contain', data.validUser.name);
            HomePage.deleteAccount();
            HomePage.accountDeletedMessage.should('be.visible');
        });
    });

    it('TC02 - Deve exibir erro ao tentar registrar com email já existente', () => {
        const existingEmail = 'test@example.com';
        const name = 'Existing User';
        HomePage.goToSignupLogin();
        SignupPage.fillSignupForm(name, existingEmail);
        cy.contains('Email Address already exist!').should('be.visible');
    });

    it('TC03 - Deve validar campos obrigatórios do formulário', () => {
        HomePage.goToSignupLogin();
        SignupPage.signupButton.click();
        cy.url().should('include', '/login');
    });

    it('TC04 - Deve registrar usuário com campos mínimos obrigatórios', () => {
        cy.fixture('webcom').then((data) => {
            const timestamp = Date.now();
            const email = data.validUser.email.replace('{{timestamp}}', timestamp);
            HomePage.goToSignupLogin();
            SignupPage.fillSignupForm(data.validUser.name, email);
            SignupPage.titleMr.check();
            SignupPage.password.type(data.validUser.password);
            SignupPage.firstName.type(data.validUser.firstName);
            SignupPage.lastName.type(data.validUser.lastName);
            SignupPage.address.type(data.validUser.address);
            SignupPage.country.select(data.validUser.country);
            SignupPage.state.type(data.validUser.state);
            SignupPage.city.type(data.validUser.city);
            SignupPage.zipcode.type(data.validUser.zipcode);
            SignupPage.mobileNumber.type(data.validUser.mobileNumber);
            SignupPage.createAccountButton.click();
            SignupPage.accountCreatedMessage.should('be.visible');
            SignupPage.continueButton.click();
            HomePage.deleteAccount();
        });
    });
});
