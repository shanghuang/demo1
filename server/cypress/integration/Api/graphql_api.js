describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      //cy.visit('https://example.cypress.io/todo')
    })

    it('displays two todo items by default', () => {
        cy.request('POST', 'http://localhost:8080/graphql', 
            {   "query":`mutation createFriendMut($input:FriendInput)
                            {        friend: createFriend(input : $input)
                            {\n          id\n          lastName\n          gender\n          language\n        }\n    
                            }`,
                "variables":{
                    "input":{
                        "firstName":"name41",
                        "lastName":"name241",
                        "gender":"MALE",
                        "language":"Englist",
                        "age":23,
                        "email":"user1@test.com",
                        "contacts":[{"firstName":"name3","lastName":"name4"}]
                    }
                },
                "operationName":"createFriendMut",
        })
        .then(
            (response) => {
                console.log(response.body);
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('data', 'name41'); // true
        })
    })
})