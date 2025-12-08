/// <reference types="cypress" />

import HomePage from '../pages/WebCom/HomePage';
import SignupPage from '../pages/WebCom/SignupPage';
import ProductsPage from '../pages/WebCom/ProductsPage';
import CartPage from '../pages/WebCom/CartPage';
import CheckoutPage from '../pages/WebCom/CheckoutPage';

describe('Fluxo E2E - Compra completa (Registro -> Comprar -> Pagar)', () => {

    beforeEach(() => {
        // inicia na home usando baseUrl
        HomePage.visit();
    });

    it('Deve criar usuário, adicionar produto ao carrinho e finalizar compra', () => {
        // Cria usuário com comando custom (usa fixture webcom.json)
        cy.createAndLoginUser();

        // Navega para produtos e seleciona o primeiro produto
        HomePage.goToProducts();
        // captura o nome do produto antes de adicionar
        ProductsPage.viewProductButtons.first().click();
        ProductsPage.productDetailName.invoke('text').then((productName) => {
            // adiciona ao carrinho
            ProductsPage.addProductToCart(1);
            // o botão de continuar/visualizar carrinho aparece no modal, clicar em View Cart
            ProductsPage.viewCartLink.click();

            // valida que o produto está no carrinho
            CartPage.cartProductNames.should('contain.text', productName.trim());

            // proceder para checkout
            CartPage.proceedToCheckout();

            // no checkout, verificar que o endereço de entrega e fatura estão visíveis
            CheckoutPage.deliveryAddressDetails.should('be.visible');
            CheckoutPage.billingAddressDetails.should('be.visible');

            // adicionar um comentário rápido
            CheckoutPage.addComment('Pedido automatizado - teste E2E');

            // iniciar processo de pagamento
            CheckoutPage.placeOrder();

            // preencher dados de pagamento (do fixture)
            cy.fixture('webcom').then((data) => {
                CheckoutPage.fillPaymentDetails(data.payment);

                // verificar confirmação do pedido
                CheckoutPage.orderPlacedMessage.should('be.visible');
                CheckoutPage.orderPlacedMessage.should('contain.text', 'Order Placed!');

                // opcional: baixar fatura / olhar mensagem de sucesso
                CheckoutPage.successMessage.should('be.visible');
            });
        });
    });
});
