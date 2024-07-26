import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Checkbox } from '@mui/material';

const Contacts = ({ contacts, onDelete }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleDeleteSelected = () => {
    // Perform deletion for selected contacts
    selectedContacts.forEach((id) => {
      onDelete(id);
    });
    // Clear selected contacts after deletion
    setSelectedContacts([]);
  };

  return (
    <>
      <div>
        <Button onClick={handleDeleteSelected} disabled={selectedContacts.length === 0}>
          Delete
        </Button>
      </div>
      <ul className="">
        {contacts &&
          contacts.data.map((contact) => (
            <li key={contact.id}>
              <Checkbox
                checked={selectedContacts.includes(contact.id)}
                onChange={() => toggleSelect(contact.id)}
                inputProps={{ 'aria-label': 'Select contact' }}
              />
              <Link href={`/contact/${contact.id}`}>
                <a>{contact.attributes.empName}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Contacts;
