'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [bookMarkedUser, setBookMarkedUsers] = useState([]);
  const [theme, setTheme] = useState('light');


  function addBookMarkUser(data) {
    setBookMarkedUsers(prev => [...prev, data]);
  }

  function deleteBookMarkUser(id) {
    const newData = bookMarkedUser.filter((el) => el.id !== id);
    setBookMarkedUsers(newData);
  }

  function toggleTheme(){
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedBookmarks = localStorage.getItem('bookMarkedUsers');
    const storedTheme = localStorage.getItem('theme');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch('https://dummyjson.com/users?limit=25')
        .then(res => res.json())
        .then(data => {
          setUsers(data.users);
          localStorage.setItem('users', JSON.stringify(data.users));
        });
    }

    if (storedBookmarks) {
      setBookMarkedUsers(JSON.parse(storedBookmarks));
    }
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookMarkedUsers', JSON.stringify(bookMarkedUser));
  }, [bookMarkedUser]);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <UserContext.Provider value={{ users, bookMarkedUser, addBookMarkUser, deleteBookMarkUser , bookMarkedUser , theme , toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUsers() {
  return useContext(UserContext);
}
