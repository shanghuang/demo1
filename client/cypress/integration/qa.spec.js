const testUsername = 'test2@test.com';
const testPassword = "123456";

const testQuestionText = "Question1";
const testAnswerText = "Answer1";
describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      //cy.visit('https://example.cypress.io/todo')
    })

    it('should login', () => {
        cy.visit('http://localhost:3000')

        cy.get('#login-page').should('be.visible');

        cy.get('#login-page').click();

        cy.get('#email-input')
            .should('be.visible');

        cy.get('#email-input')
            .type(testUsername);

        cy.get('#password-input')
            .type(testPassword);

        cy.get('#login-btn').click();
        
        cy.get('#logout-btn').should('be.visible');
    });

    it('add new question', () => {
        cy.visit('http://localhost:3000')

        cy.get('#login-page').should('be.visible');

        cy.get('#login-page').click();

        cy.get('#email-input')
            .should('be.visible');

        cy.get('#email-input')
            .type(testUsername);

        cy.get('#password-input')
            .type(testPassword);

        cy.get('#login-btn').click();
        
        cy.get('#logout-btn').should('be.visible');

        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.visit('http://localhost:3000/qanew')
    
        // We can go even further and check that the default todos each contain
        // the correct text. We use the `first` and `last` functions
        // to get just the first and last matched elements individually,
        // and then perform an assertion with `should`.
        cy.get('#questionInput')
            .should('be.visible');

        cy.get('#questionInput')
            .type(testQuestionText);

        cy.get('#postBtn').should('be.visible');

        cy.get('#postBtn').click();




        cy.visit('http://localhost:3000/qamain')

        cy.get('#searchQuestionBtn').should('be.visible');

        cy.get('#searchQuestionBtn').click();


        //click 1st question
        cy.get('#questionIndex0').should('be.visible');

        //todo:search the question which has text 'testQuestionText'
        cy.get('#questionIndex0').click();

        cy.get('#qaQuestionPage').should('be.visible');     //switch to question page

        //add new answers

        cy.get('#qaAnswerPostInput')
            .should('be.visible');

        cy.get('#qaAnswerPostInput')
            .type(testAnswerText);

        cy.get('#postAnswerBtn').should('be.visible');

        cy.get('#postAnswerBtn').click();

    });

})

