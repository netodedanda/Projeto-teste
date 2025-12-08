class ProductsPage {
    get searchInput() {
        return cy.get('#search_product');
    }

    get searchButton() {
        return cy.get('#submit_search');
    }

    get productsTitle() {
        return cy.get('.title.text-center');
    }

    get allProducts() {
        return cy.get('.single-products');
    }

    get searchedProducts() {
        return cy.get('.productinfo.text-center');
    }

    get viewProductButtons() {
        return cy.get('a[href*="/product_details/"]');
    }

    get productDetailName() {
        return cy.get('.product-information h2');
    }

    get productDetailCategory() {
        return cy.get('.product-information p').first();
    }

    get productDetailPrice() {
        return cy.get('.product-information span span');
    }

    get productDetailAvailability() {
        return cy.get('.product-information p').eq(1);
    }

    get productDetailCondition() {
        return cy.get('.product-information p').eq(2);
    }

    get productDetailBrand() {
        return cy.get('.product-information p').eq(3);
    }

    get quantityInput() {
        return cy.get('#quantity');
    }

    get addToCartButton() {
        return cy.get('button.cart');
    }

    get continueShoppingButton() {
        return cy.get('button[data-dismiss="modal"]');
    }

    get viewCartLink() {
        return cy.get('u').contains('View Cart');
    }

    searchProduct(productName) {
        this.searchInput.type(productName);
        this.searchButton.click();
    }

    viewFirstProduct() {
        this.viewProductButtons.first().click();
    }

    addProductToCart(quantity = 1) {
        if (quantity > 1) {
            this.quantityInput.clear().type(quantity);
        }
        this.addToCartButton.click();
    }
}

export default new ProductsPage();
