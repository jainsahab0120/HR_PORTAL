'use client';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import Link from 'next/link';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const { addBookMarkUser, theme } = useUsers();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const ratedUsers = storedUsers.map(user => ({
      ...user,
      rating: (Math.random() * 2 + 3).toFixed(1),
    }));
    setUsers(ratedUsers);
  }, []);

  const allDepartments = [...new Set(users.map(u => u.company?.department).filter(Boolean))];

  const toggleDepartment = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const resetDep = () => setSelectedDepartments([]);

  const filteredUsers = users.filter(user => {
    const name = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const department = user.company?.department?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) ;
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(user.company?.department);
    return matchesSearch && matchesDepartment;
  });

  const addBook = (data) => {
    addBookMarkUser(data);
    alert(`${data.firstName} is added in Bookmarks`);
  };

  const promotionUser = (data) => {
    alert(`${data.firstName} ${data.lastName} is promoted to higher post`);
  };

  // Theme Styles
  const bg = theme === 'light' ? 'bg-[#FEFAE0]' : 'bg-[#A9A9A9]';
  const text = theme === 'light' ? 'text-[#0A400C]' : 'text-[#FEFAE0]';
  const cardBg = theme === 'light' ? 'bg-white text-[#0A400C]' : 'bg-[#1c1f1b] text-[#FEFAE0]';
  const borderColor = theme === 'light' ? 'border-[#B1AB86]' : 'border-[#819067]';

  return (
    <div className={`p-6 min-h-screen ${bg} ${text} transition-all duration-300`}>
      <h1 className="text-5xl font-bold mb-10 tracking-wide text-center">Employee ScoreCard</h1>

      {/* Search Centered */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name....."
          className={`px-6 py-4 rounded-full border ${borderColor} bg-transparent w-full max-w-3xl text-base ${text} placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#B1AB86]`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Department Filters Below */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {allDepartments.map((dept) => (
          <button
            key={dept}
            onClick={() => toggleDepartment(dept)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              selectedDepartments.includes(dept)
                ? 'bg-[#819067] text-white border-[#819067]'
                : `${text} ${borderColor} hover:bg-[#B1AB86] hover:text-white`
            }`}
          >
            {dept}
          </button>
        ))}
        {allDepartments.length > 0 && (
          <button
            onClick={resetDep}
            className="px-4 py-1.5 text-sm font-medium border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            ❌
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`${cardBg} rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 border ${borderColor} relative`}
          >
            {/* Role Badge */}
            <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full uppercase tracking-wide">
              {user.role}
            </span>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover border border-[#B1AB86]"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-sm opacity-70">{user.email}</p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm space-y-1 mb-4 leading-5">
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Department:</strong> {user.company?.department || 'N/A'}</p>
              <p><strong>Title:</strong> {user.company?.title || 'N/A'}</p>
              <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
              <p><strong>Eye Color:</strong> {user.eyeColor}</p>
              <p><strong>Country:</strong> {user.address?.country || 'N/A'}</p>
              <p><strong>Rating:</strong> <span className="text-yellow-500">⭐ {user.rating}</span></p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap mt-auto">
              <Link href={`/employee/${user.id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-full transition-all">
                  More Details
                </button>
              </Link>
              <button
                onClick={() => addBook(user)}
                className="bg-[#FEFAE0] hover:bg-[#B1AB86] text-[#0A400C] px-4 py-1.5 text-sm rounded-full border border-[#B1AB86] transition-all"
              >
                Bookmark
              </button>
              <button
                onClick={() => promotionUser(user)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-sm rounded-full transition-all"
              >
                Promote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
