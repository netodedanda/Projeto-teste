class CheckoutPage {
    get deliveryAddressDetails() {
        return cy.get('#address_delivery');
    }

    get billingAddressDetails() {
        return cy.get('#address_invoice');
    }

    get reviewOrderTable() {
        return cy.get('#cart_info');
    }

    get commentTextarea() {
        return cy.get('textarea[name="message"]');
    }

    get placeOrderButton() {
        return cy.get('a[href="/payment"]');
    }

    get nameOnCard() {
        return cy.get('input[data-qa="name-on-card"]');
    }

    get cardNumber() {
        return cy.get('input[data-qa="card-number"]');
    }

    get cvc() {
        return cy.get('input[data-qa="cvc"]');
    }

    get expirationMonth() {
        return cy.get('input[data-qa="expiry-month"]');
    }

    get expirationYear() {
        return cy.get('input[data-qa="expiry-year"]');
    }

    get payAndConfirmButton() {
        return cy.get('button[data-qa="pay-button"]');
    }

    get orderPlacedMessage() {
        return cy.get('h2[data-qa="order-placed"]');
    }

    get successMessage() {
        return cy.get('.title.text-center');
    }

    get downloadInvoiceButton() {
        return cy.get('a[href="/download_invoice/"]');
    }

    get continueButton() {
        return cy.get('a[data-qa="continue-button"]');
    }

    addComment(comment) {
        this.commentTextarea.type(comment);
    }

    placeOrder() {
        this.placeOrderButton.click();
    }

    fillPaymentDetails(paymentData) {
        this.nameOnCard.type(paymentData.nameOnCard);
        this.cardNumber.type(paymentData.cardNumber);
        this.cvc.type(paymentData.cvc);
        this.expirationMonth.type(paymentData.expirationMonth);
        this.expirationYear.type(paymentData.expirationYear);
        this.payAndConfirmButton.click();
    }
}

export default new CheckoutPage();
