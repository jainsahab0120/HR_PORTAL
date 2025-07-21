'use client';

import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import Link from 'next/link';
import {
  FaUserTie,
  FaBuilding,
  FaEnvelope,
  FaStar,
  FaTrashAlt,
  FaEye,
  FaArrowUp,
  FaTint,
  FaGlasses,
  FaFlag,
  FaCalendarAlt,
} from 'react-icons/fa';

const Bookmarked = () => {
  const { bookMarkedUser, deleteBookMarkUser, theme } = useUsers();
  const [savedEmployees, setSavedEmployees] = useState([]);

  useEffect(() => {
    setSavedEmployees(bookMarkedUser);
  }, [bookMarkedUser]);

  const handleRemove = (emp) => {
    deleteBookMarkUser(emp.id);
    alert(`${emp.firstName} has been removed from bookmarks.`);
  };

  const handlePromote = (emp) => {
    alert(`${emp.firstName} ${emp.lastName} has been promoted successfully.`);
  };

  const darkTheme = 'bg-[#0B3619] text-[#F5F5DC]';
  const lightTheme = 'bg-[#F5F5F5] text-[#1A3A2F]';
  const cardDark = 'bg-[#1F3B2C] text-white border border-[#679267]';
  const cardLight = 'bg-white text-[#1A3A2F] border border-gray-200 shadow-md';

  return (
    <section
      className={`min-h-screen px-4 sm:px-8 py-10 transition-colors duration-300 ${
        theme === 'light' ? lightTheme : darkTheme
      }`}
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 tracking-wide text-center">
        📌 Bookmarked Employees
      </h1>

      {savedEmployees.length === 0 ? (
        <p className="text-center text-lg text-red-600 font-semibold mt-20">
          ❌ No bookmarked employees found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedEmployees.map((emp) => (
            <div
              key={emp.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                theme === 'light' ? cardLight : cardDark
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={emp.image}
                  alt={`${emp.firstName} ${emp.lastName}`}
                  className="w-16 h-16 rounded-full border-2 object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {emp.firstName} {emp.lastName}
                  </h2>
                  <p className="text-sm flex items-center gap-2 text-gray-500">
                    <FaEnvelope /> {emp.email}
                  </p>
                </div>
              </div>

              {/* Info Section */}
              <div className="text-sm space-y-2 leading-relaxed mb-4">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-500" />
                  <span>
                    <strong>Age:</strong> {emp.age}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaBuilding className="text-blue-600" />
                  <span>
                    <strong>Department:</strong> {emp.company?.department || 'N/A'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaUserTie className="text-green-600" />
                  <span>
                    <strong>Title:</strong> {emp.company?.title || 'N/A'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span>
                    <strong>Rating:</strong> {emp.rating}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaTint className="text-red-400" />
                  <span>
                    <strong>Blood Group:</strong> {emp.bloodGroup || 'N/A'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaGlasses className="text-teal-500" />
                  <span>
                    <strong>Eye Color:</strong> {emp.eyeColor || 'N/A'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaFlag className="text-orange-400" />
                  <span>
                    <strong>Country:</strong> {emp.address?.country || 'N/A'}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-start gap-3 mt-auto">
                <Link href={`/employee/${emp.id}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#678D58] hover:bg-[#567b45] text-white text-sm rounded-md transition">
                    <FaEye /> View Profile
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(emp)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
                >
                  <FaTrashAlt /> Remove
                </button>
                <button
                  onClick={() => handlePromote(emp)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#347a3f] hover:bg-[#2b6233] text-white text-sm rounded-md transition"
                >
                  <FaArrowUp /> Promote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Bookmarked;
