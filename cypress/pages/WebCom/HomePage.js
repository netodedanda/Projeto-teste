class HomePage {
    get signupLoginLink() {
        return cy.get('a[href="/login"]');
    }

    get logoutLink() {
        return cy.get('a[href="/logout"]');
    }

    get deleteAccountLink() {
        return cy.get('a[href="/delete_account"]');
    }

    get productsLink() {
        return cy.get('a[href="/products"]');
    }

    get cartLink() {
        return cy.get('a[href="/view_cart"]');
    }

    get loggedInUser() {
        return cy.get('a').contains('Logged in as');
    }

    get accountDeletedMessage() {
        return cy.get('h2[data-qa="account-deleted"]');
    }

    get continueButton() {
        return cy.get('a[data-qa="continue-button"]');
    }

    visit() {
        // Use baseUrl from cypress.config.js for portability
        cy.visit('/');
    }

    goToSignupLogin() {
        this.signupLoginLink.click();
    }

    goToProducts() {
        this.productsLink.click();
    }

    goToCart() {
        this.cartLink.click();
    }

    logout() {
        this.logoutLink.click();
    }

    deleteAccount() {
        this.deleteAccountLink.click();
    }
}

export default new HomePage();
