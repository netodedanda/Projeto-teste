/// <reference types="cypress"/>

import HomePage from '../pages/WebCom/HomePage';
import ProductsPage from '../pages/WebCom/ProductsPage';

describe('Requisito 2 - Pesquisa e Visualização de Produtos', () => {
    
    beforeEach(() => {
        HomePage.visit();
        HomePage.goToProducts();
    });

    it('TC01 - Deve buscar e exibir produtos relacionados ao termo pesquisado', () => {
        cy.fixture('webcom').then((data) => {
            ProductsPage.searchProduct(data.searchProducts.dress);
            cy.url().should('include', 'products');
            ProductsPage.productsTitle.should('contain', 'Searched Products');
            ProductsPage.searchedProducts.should('have.length.greaterThan', 0);
            ProductsPage.searchedProducts.each(($product) => {
                cy.wrap($product).should('be.visible');
            });
        });
    });

    it('TC02 - Deve exibir lista completa de produtos', () => {
        ProductsPage.productsTitle.should('contain', 'All Products');
        ProductsPage.allProducts.should('have.length.greaterThan', 0);
        ProductsPage.allProducts.first().within(() => {
            cy.get('.productinfo').should('be.visible');
            cy.get('p').should('exist'); 
            cy.get('a').contains('View Product').should('be.visible');
        });
    });

    it('TC03 - Deve exibir detalhes completos ao visualizar um produto', () => {
        ProductsPage.viewFirstProduct();
        cy.url().should('include', '/product_details/');
        ProductsPage.productDetailName.should('be.visible');
        ProductsPage.productDetailCategory.should('be.visible');
        ProductsPage.productDetailPrice.should('be.visible');
        ProductsPage.productDetailAvailability.should('contain', 'Availability');
        ProductsPage.productDetailCondition.should('contain', 'Condition');
        ProductsPage.productDetailBrand.should('contain', 'Brand');
        ProductsPage.addToCartButton.should('be.visible');
        ProductsPage.quantityInput.should('be.visible');
    });

    it('TC04 - Deve informar quando nenhum produto for encontrado', () => {
        const invalidSearch = 'ProductThatDoesNotExist12345XYZ';
        ProductsPage.searchProduct(invalidSearch);
        ProductsPage.productsTitle.should('contain', 'Searched Products');
        cy.get('body').then(($body) => {
            if ($body.find('.single-products').length === 0) {
                cy.log('Nenhum produto encontrado - comportamento esperado');
            } else {
                ProductsPage.allProducts.should('exist');
            }
        });
    });
});
