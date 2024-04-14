import React, { useState } from 'react';

interface Props {
  onFormSubmit: (firstName: string, lastName: string) => void;
}

const UserForm: React.FC<Props> = ({ onFormSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(firstName, lastName);
    setFirstName('');
    setLastName('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default UserForm;
