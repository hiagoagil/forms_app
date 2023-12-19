import { faker } from '@faker-js/faker';

const formulario = {
  username: faker.internet.userName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  cor: faker.color.rgb()
};

describe('Preenchendo os campos obrigatórios do formulário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Preenchendo os campos obrigatórios e envio com sucesso do formulário', () => {
    cy.get('#nome')
      .type(formulario.username)
      .should('have.value', formulario.username)
    cy.get('#sobrenome')
      .type(formulario.lastname)
      .should('have.value', formulario.lastname)
    cy.get('#email')
      .type(formulario.email)
      .should('have.value', formulario.email)
    cy.get('#pais')
      .type('Brasil')
      .should('have.value', 'Brasil')
    cy.get('button').click()
    cy.contains('Ação realizada com sucesso').should('be.visible')
  });

  it('Preenchendo os campos obrigatórios e envio com sucesso do formulário por meio do Commands', () => {
    cy.Forms(formulario)
  });

  it('Selecionando a linguagem de programação preferida', () => {
    cy.get('#linguagem')
      .select('JavaScript')
      .should('be.visible', 'JavaScript') 
  });

  it('Testando a selecão cheackbox', () => {
    cy.get('input[type="checkbox"]')
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
    cy.get('input[type="radio"]')
      .each(function ($radio) {
        cy.wrap($radio)
          .check()
          .should('be.checked')
      })
  });

  it('Selecionando a cor na aplicação utilizando invoke', () => {
    cy.get('input[type="color"]').invoke('val', formulario.cor);
    cy.get('#cor').should('have.value', formulario.cor);
  });

  it('Selecionando um arquivo válido', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('Selecionando um arquivo inválido', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/download.png')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('download.png')
      })
  })
  

  it('Selecionando o arquivo simulando drag-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/download.png', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('download.png')
      })
  });

  it('Selecionando o arquivo simulando drag-drop com arquivo inválido', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/download.png', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('download.png')
      })
  });

  it('Testando links que abrem em outra página', () => {
    cy.get('a[target="_blank"]')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click();
  });


});