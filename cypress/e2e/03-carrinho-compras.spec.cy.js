/// <reference types="cypress"/>

import HomePage from '../pages/WebCom/HomePage';
import ProductsPage from '../pages/WebCom/ProductsPage';
import CartPage from '../pages/WebCom/CartPage';

describe('Requisito 3 - Adição de Itens ao Carrinho de Compras', () => {
    
    beforeEach(() => {
        HomePage.visit();
    });

    it('TC01 - Deve adicionar produto ao carrinho com sucesso', () => {
        HomePage.goToProducts();
        ProductsPage.viewFirstProduct();
        let productName;
        ProductsPage.productDetailName.invoke('text').then((text) => {
            productName = text;
        });
        ProductsPage.addProductToCart();
        cy.contains('Added!').should('be.visible');
        
        ProductsPage.viewCartLink.click();
        CartPage.cartProductNames.first().invoke('text').then((text) => {
            expect(text).to.include(productName);
        });
        CartPage.cartProducts.should('have.length.greaterThan', 0);
        CartPage.cartProductPrices.should('be.visible');
        CartPage.cartQuantities.should('be.visible');
    });

    it('TC02 - Deve adicionar múltiplas unidades do produto ao carrinho', () => {
        const quantity = 3;

        HomePage.goToProducts();
        ProductsPage.viewFirstProduct();
        ProductsPage.addProductToCart(quantity);
        ProductsPage.viewCartLink.click();
        CartPage.cartQuantities.first().should('contain', quantity);
    });

    it('TC03 - Deve adicionar vários produtos diferentes ao carrinho', () => {
        HomePage.goToProducts();
        ProductsPage.viewProductButtons.eq(0).click();
        ProductsPage.addProductToCart();
        ProductsPage.continueShoppingButton.click();
        HomePage.goToProducts();
        ProductsPage.viewProductButtons.eq(1).click();
        ProductsPage.addProductToCart();
        ProductsPage.viewCartLink.click();
        CartPage.cartProducts.should('have.length.greaterThan', 1);
    });

    it('TC04 - Deve exibir corretamente preço, quantidade e total no carrinho', () => {
        HomePage.goToProducts();
        ProductsPage.viewFirstProduct();
        let productPrice;
        ProductsPage.productDetailPrice.invoke('text').then((text) => {
            productPrice = text.replace('Rs. ', '').trim();
        });

        ProductsPage.addProductToCart();
        ProductsPage.viewCartLink.click();
        CartPage.cartProductPrices.should('be.visible');
        CartPage.cartQuantities.should('be.visible');
        CartPage.cartTotalPrices.should('be.visible');
        CartPage.cartProductPrices.first().should('contain', 'Rs.');
        CartPage.proceedToCheckoutButton.should('be.visible');
    });
});
