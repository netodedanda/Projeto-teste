class SignupPage {
    get nameInput() {
        return cy.get('input[data-qa="signup-name"]');
    }

    get emailInput() {
        return cy.get('input[data-qa="signup-email"]');
    }

    get signupButton() {
        return cy.get('button[data-qa="signup-button"]');
    }

    get titleMr() {
        return cy.get('#id_gender1');
    }

    get titleMrs() {
        return cy.get('#id_gender2');
    }

    get password() {
        return cy.get('input[data-qa="password"]');
    }

    get firstName() {
        return cy.get('input[data-qa="first_name"]');
    }

    get lastName() {
        return cy.get('input[data-qa="last_name"]');
    }

    get company() {
        return cy.get('input[data-qa="company"]');
    }

    get address() {
        return cy.get('input[data-qa="address"]');
    }

    get address2() {
        return cy.get('input[data-qa="address2"]');
    }

    get country() {
        return cy.get('select[data-qa="country"]');
    }

    get state() {
        return cy.get('input[data-qa="state"]');
    }

    get city() {
        return cy.get('input[data-qa="city"]');
    }

    get zipcode() {
        return cy.get('input[data-qa="zipcode"]');
    }

    get mobileNumber() {
        return cy.get('input[data-qa="mobile_number"]');
    }

    get createAccountButton() {
        return cy.get('button[data-qa="create-account"]');
    }

    get accountCreatedMessage() {
        return cy.get('h2[data-qa="account-created"]');
    }

    get continueButton() {
        return cy.get('a[data-qa="continue-button"]');
    }

    get loggedInUser() {
        return cy.contains('Logged in as');
    }

    fillSignupForm(name, email) {
        this.nameInput.type(name);
        this.emailInput.type(email);
        this.signupButton.click();
    }

    fillAccountInformation(userData) {
        if (userData.gender === 'male') {
            this.titleMr.check();
        } else {
            this.titleMrs.check();
        }
        
        this.password.type(userData.password);
        this.firstName.type(userData.firstName);
        this.lastName.type(userData.lastName);
        
        if (userData.company) {
            this.company.type(userData.company);
        }
        
        this.address.type(userData.address);
        
        if (userData.address2) {
            this.address2.type(userData.address2);
        }
        
        this.country.select(userData.country);
        this.state.type(userData.state);
        this.city.type(userData.city);
        this.zipcode.type(userData.zipcode);
        this.mobileNumber.type(userData.mobileNumber);
        
        this.createAccountButton.click();
    }
}

export default new SignupPage();
