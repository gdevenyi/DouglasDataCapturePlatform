// const username = 'david';
// const password = 'Password123';

// //randomizer function to create random test patient name
// function makeid(length: number) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

// const name = makeid(6);

// describe('look at questionaire', () => {
//   it('passes', () => {
//     //navigate to add visit page, fill in subject form
//     cy.login(username, password);
//     cy.get('span[data-cy="add-visit"]').first().click({ force: true });
//     cy.get('input[name=firstName]').type(name);
//     cy.get('input[name=lastName]').type('testPatient');
//     cy.get('input[class=field-input]').type('2023-09-21');

//     cy.get('nav').click();
//     cy.get('button[class="field-input capitalize"]').click({ force: true });
//     cy.get('li[id*="headlessui-listbox-option-:"]').first().click();
//     cy.get('button[type="submit"]').click({ force: true });

//     cy.wait(1000);

//     //navigate to view instrument page, select a form and confirm subject info is autofilled
//     cy.get('span[data-cy="view-instrument"]').first().click({ force: true });
//     cy.url().should('include', 'instruments/available');
//     cy.wait(1000);
//     cy.get('h3[data-cy="instrument-title"]').first().click();

//     cy.get('button').contains('Begin').click();
//     cy.get('input[name=firstName]').should('have.value', name);
//     cy.get('input[name=lastName]').should('have.value', 'testPatient');
//     cy.get('input[class=field-input]').should('have.value', '2023-09-21');
//   });
// });
