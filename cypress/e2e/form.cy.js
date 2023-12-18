import { faker } from '@faker-js/faker';

describe('Preenchendo os campos obrigatórios do formulário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Preenchendo os campos obrigatórios e envio com sucesso do formulário', () => {
    const formulario = {
      username: faker.internet.userName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email()
    };

    cy.get('#nome')
      .type(formulario.username)
      .should('be.visible', formulario.username)
    cy.get('#sobrenome')
      .type(formulario.lastname)
      .should('be.visible', formulario.lastname)
    cy.get('#email')
      .type(formulario.email)
      .should('be.visible', formulario.email)
    cy.get('#pais')
      .type('Brasil')
      .should('have.value', 'Brasil')
    cy.get('button').click()
    cy.contains('Ação realizada com sucesso').should('be.visible')
  });

  it('Preenchendo os campos obrigatórios e envio com sucesso do formulário por meio do Commands', () => {
    const formulario = {
      username: faker.internet.userName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email()
    };
    cy.Forms(formulario)
  });

  it('Selecionando a linguagem preferida', () => {
    cy.get('#linguagem')
      .select('JavaScript')
      .should('be.visible', 'JavaScript') //da pra testar todos os nomes?
  });

  it('Testando a selecão cheackbox', () => {
    cy.get('input[type="checkbox"][name="checkCypress"') 
      .should('not.be.checked')
      .check()
      .should('be.checked')
  });

  it('Selecionado a data', () => {
    cy.get('input[type="date"]')
      .type('2023-12-18')
      .should('have.value', '2023-12-18')
  });

  it('Selecionando nível do mentorando utilizando a função check', () => {
    cy.get('input[type="radio"][value="iniciante"]') //não soube usar o .each para acessar cada label
      .should('not.be.checked')
      .check()
      .should('be.checked')
  });

  it('Selecionando a cor na aplicação utilizando invoke', () => {
    const corEsperada = '#00ff00';
    cy.get('input[type="color"]').invoke('val', corEsperada);
    cy.get('#cor').should('have.value', corEsperada);
  });

  it('Selecionando um arquivo', () => {
    cy.get('input[type="file"][accept=".pdf, .doc, .docx"')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selecionando o arquivo simulando drag-drop', () => {
    cy.get('input[type="file"][accept=".pdf, .doc, .docx"')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){     
    expect($input[0].files[0].name).to.equal('example.json')
    })
});

  it('Testando links que abrem em outra página', () => {
    cy.get('a[href="link.html"][target="_blank"]')
      .should('have.attr', 'target', '_blank') 
      .invoke('removeAttr', 'target')
      .click(); 
  });


});