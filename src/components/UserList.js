import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/api';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <select className="form-select" onChange={(e) => onSelectUser(e.target.value)}>
      <option value="">Selecciona un usuario</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default UserList;
