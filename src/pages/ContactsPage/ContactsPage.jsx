import Form from "../../components/ContactForm/ContactForm.jsx";
import ContactList from "../../components/ContactsList/ContactList.jsx";
import Filter from "../../components/Filter/Filter.jsx";

import {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from "../../services/serviceAPI.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Box } from "./ContactsPage.syeled.jsx";
import { useSelector } from "react-redux";

const ContactsPage = () => {
  const token = useSelector((state) => state.users.token);
  const { data: contacts, isFetching } = useFetchContactsQuery(token, {
    skip: token === null,
  });
  const [deleteContact] = useDeleteContactMutation();
  const [addContact] = useAddContactMutation();

  const [filter, setFilter] = useState("");

  const here = useSelector((state) => state.users.isLoggedIn);

  useEffect(() => {}, [contacts]);
  const setContact = (name, number) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        name: name,
        number: number,
      };
      try {
        addContact(contact);
        toast.success("Contact added");
      } catch (error) {}
    }
  };

  const changeFilter = (event) => {
    const filterdName = event.target.value;
    setFilter(filterdName);
  };

  const filteredContacts = () => {
    if (contacts) {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };
  return (
    <Box>
      <Toaster />
      {here && (
        <>
          <h1>Contacts</h1>
          <Form onSubmit={setContact} />
          <h2>Filter</h2>
          <Filter value={filter} onChange={changeFilter} />
          {isFetching && <Spinner />}
          {contacts && !isFetching && (
            <ContactList
              persons={filteredContacts(contacts)}
              onDeleteContact={deleteContact}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ContactsPage;
