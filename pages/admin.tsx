import withAuth from '../components/withAuth';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(response => setUsers(response.data));
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(AdminPage, 'Super Admin');
