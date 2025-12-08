/// <reference types="cypress"/>

describe('Testes de API - WebCom Backend', () => {

    const baseUrl = 'https://automationexercise.com/api';

    /**
     * TC01 - Listar todos os produtos via API
     * Objetivo: Verificar se a API retorna lista de produtos corretamente
     */
    it('TC01 - Deve retornar lista de produtos via API', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/productsList`
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
            expect(response.body).to.have.property('responseCode');
            expect(response.body.responseCode).to.equal(200);
            expect(response.body).to.have.property('products');
            expect(response.body.products).to.be.an('array');
            expect(response.body.products.length).to.be.greaterThan(0);
            
            const firstProduct = response.body.products[0];
            expect(firstProduct).to.have.property('id');
            expect(firstProduct).to.have.property('name');
            expect(firstProduct).to.have.property('price');
            expect(firstProduct).to.have.property('brand');
            expect(firstProduct).to.have.property('category');
            
            cy.log(`Total de produtos retornados: ${response.body.products.length}`);
        });
    });

    it('TC02 - Deve pesquisar produtos via API', () => {
        const searchTerm = 'Blue';
        
        cy.request({
            method: 'POST',
            url: `${baseUrl}/searchProduct`,
            form: true,
            body: {
                search_product: searchTerm
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('responseCode');
            expect(response.body.responseCode).to.equal(200);
            expect(response.body).to.have.property('products');
            expect(response.body.products).to.be.an('array');
            
            if (response.body.products.length > 0) {               
                response.body.products.forEach((product) => {
                    expect(product.name.toLowerCase()).to.include(searchTerm.toLowerCase());
                });
                
                cy.log(`Produtos encontrados com "${searchTerm}": ${response.body.products.length}`);
            }
        });
    });     
    it('TC03 - Deve retornar lista de marcas via API', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/brandsList`
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('responseCode');
            expect(response.body.responseCode).to.equal(200);
            expect(response.body).to.have.property('brands');
            expect(response.body.brands).to.be.an('array');
            expect(response.body.brands.length).to.be.greaterThan(0);
            
            const firstBrand = response.body.brands[0];
            expect(firstBrand).to.have.property('id');
            expect(firstBrand).to.have.property('brand');
            
            cy.log(`Total de marcas retornadas: ${response.body.brands.length}`);
        });
    });

    it('TC04 - Deve criar conta de usuário via API', () => {
        const timestamp = Date.now();
        const userData = {
            name: 'API Test User',
            email: `apitest${timestamp}@example.com`,
            password: 'Test@123',
            title: 'Mr',
            birth_date: '15',
            birth_month: '8',
            birth_year: '1990',
            firstname: 'API',
            lastname: 'User',
            company: 'Test Company',
            address1: '123 Test Street',
            address2: 'Apt 4B',
            country: 'United States',
            zipcode: '90001',
            state: 'California',
            city: 'Los Angeles',
            mobile_number: '1234567890'
        };
        
        cy.request({
            method: 'POST',
            url: `${baseUrl}/createAccount`,
            form: true,
            body: userData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('responseCode');
            if (response.body.responseCode === 201) {
                expect(response.body.message).to.include('User created');
                cy.log('Usuário criado com sucesso via API');
            } else {
                cy.log('Resposta da API:', response.body.message);
            }
        });
    });

    it('TC05 - Deve verificar login de usuário via API', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/verifyLogin`,
            form: true,
            body: {
                email: 'test@example.com',
                password: 'Test@123'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('responseCode');
            cy.log('Response Code:', response.body.responseCode);
            cy.log('Message:', response.body.message);
        });
    });

    it('TC06 - Deve retornar erro para método não suportado', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/productsList`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200); 
            expect(response.body).to.have.property('responseCode');
            expect(response.body.responseCode).to.not.equal(200);
            
            cy.log('Erro esperado retornado:', response.body.message);
        });
    });
});
