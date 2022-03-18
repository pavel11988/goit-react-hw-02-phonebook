import React, { Component } from 'react';

import shortid from 'shortid';

import { Container } from './Container/Containet.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Contact } from './ContactList/ContactList.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', tel: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', tel: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', tel: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', tel: '227-91-26' },
    ],
    filter: '',
  };

  checkDuplicateContact = checkName => {
    return this.state.contacts.find(contact => contact.name === checkName);
  };

  addContact = ({ name, tel }) => {
    if (!this.checkDuplicateContact(name) || name.length <= 1) {
      const contact = {
        id: shortid.generate(),
        name: name,
        tel: tel,
      };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(
        'Warning! A contact with this name already exists in the contact book! '
      );
    }
  };

  deleteContact = contactId => {
    const newArray = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState(prevState => ({
      contacts: newArray,
    }));
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        >
          <Contact />
        </ContactList>
      </Container>
    );
  }
}

export default App;
