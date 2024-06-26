import { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';


interface User {
  _uuid: string;
  FirstName: string;
  LastName: string;
}



function App(): JSX.Element {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('/api/v1/Users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Response Failed!');
        return res.json();
      })
      .then((data) =>
        setUserList(
          data.items.map((user: User) => ({
            FirstName: user.FirstName,
            LastName: user.LastName,
            _uuid: user._uuid,
          }))
        )
      )
      .catch((err) => console.log(err));
  };

  const onFormSubmit = (FirstName: string, LastName: string) => {
    fetch('/api/v1/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ FirstName, LastName }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Response Failed!');
        return res.json();
      })
      .then((data) =>
        setUserList((prev) => [
          {
            FirstName: data.items[0].FirstName,
            LastName: data.items[0].LastName,
            _uuid: data.items[0]._uuid,
          },
          ...prev,
        ])
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className='App'>
      <UserForm onFormSubmit={onFormSubmit} />
      <button onClick={getUsers}>Get Users</button>
      <button onClick={() => setUserList([])}>Clear Users</button>

      {userList.map((user) => (
        <div key={user._uuid} style={{ border: '3px solid grey' }}>
          <h3>{user.FirstName}</h3>
          <h4>{user.LastName}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;