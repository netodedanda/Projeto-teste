class CartPage {
    get cartProducts() {
        return cy.get('.cart_description');
    }

    get cartProductNames() {
        return cy.get('.cart_description h4 a');
    }

    get cartProductPrices() {
        return cy.get('.cart_price p');
    }

    get cartQuantities() {
        return cy.get('.cart_quantity button');
    }

    get cartTotalPrices() {
        return cy.get('.cart_total_price');
    }

    get proceedToCheckoutButton() {
        return cy.get('.btn.btn-default.check_out');
    }

    get registerLoginLink() {
        return cy.contains('Register / Login');
    }

    get deleteProductButtons() {
        return cy.get('.cart_quantity_delete');
    }

    get emptyCartMessage() {
        return cy.get('#empty_cart');
    }

    verifyProductInCart(productName) {
        this.cartProductNames.should('contain', productName);
    }

    proceedToCheckout() {
        this.proceedToCheckoutButton.click();
    }

    deleteFirstProduct() {
        this.deleteProductButtons.first().click();
    }
}

export default new CartPage();
