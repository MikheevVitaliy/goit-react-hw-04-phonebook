import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { FormContacts } from './FormContacts/FormContacts';
import { FilterContacts } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactList/ContactList';

const keyLocalStorage = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saveContacts = JSON.parse(
      localStorage.getItem(keyLocalStorage) || '[]'
    );
    setContacts(saveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newId = nanoid(4);
    const names = contacts.map(contact => contact.name);

    if (names.indexOf(name) >= 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [{ name, number, id: newId }, ...prevState]);

    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify([{ name, number, id: newId }, ...contacts])
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );

    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(keyLocalStorage, JSON.stringify(updatedContacts));
  };

  return (
    <>
      <Section title="Phonebook">
        <FormContacts onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <FilterContacts
          name={'filter'}
          filterInput={e => setFilter(e.target.value)}
        />
        <ContactList
          contacts={contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
