const express = require("express");
const app = express();

const { uuid } = require("uuidv4")

app.use(express.json());

const contacts = [];

// ROTA GET ------------------------------------------------

app.get('/', (request, response) => {
  return response.json(contacts);
})

// ROTA POST ------------------------------

app.post('/contacts', (request, response) => {
const { nome, sobrenome, telefone, dn, endereço, email } = request.body;

const contact = {
  id: uuid(),
  nome,
  sobrenome,
  telefone,
  dn,
  endereço,
  email,
}

contacts.push(contact);

 return response.status(201).json(contact);
})

// ROTA PUT ------------------------------------------------------

app.put('/contacts/:id', (request, response) => {
  const { id } = request.params;
  const {  nome, sobrenome, telefone, dn, endereço, email } = request.body;

  const newContact = {
    id,
    nome,
    sobrenome,
    telefone,
    dn,
    endereço,
    email,
  }

  const contactIndex = contacts.findIndex(contacts => contacts.id === id);

  contacts[contactIndex] = newContact;

  return response.json(newContact);
})

// ROTA DELETE ------------------------------

app.delete('/contacts/:id', (request, response) => {
  const { id } = request.params;

  const contactIndex = contacts.findIndex(contacts => contacts.id === id);

  contacts.splice(contactIndex, 1);

  return response.status(204).send();

});

app.listen(3001);