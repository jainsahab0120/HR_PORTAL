'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Overview from './tabs/Overview';
import Projects from './tabs/Projects';
import Feedback from './tabs/Feedback';
import { useUsers } from '../../context/UserContext';

const tabs = ['Overview', 'Projects', 'Feedback'];

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const getBadgeColor = (rating) => {
  if (rating >= 4) return 'bg-green-500';
  if (rating >= 3) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function EmployeeDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const { theme } = useUsers();
  const rating = getRandomRating();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = storedUsers.find((u) => u.id == id);
    setUser(matchedUser);
  }, [id]);

  if (!user) return <div className="p-8 text-center text-gray-500">Loading employee details...</div>;

  const textColor = theme === 'light' ? 'text-gray-900' : 'text-gray-100';
  const bgColor = theme === 'light' ? 'bg-gray-50' : 'bg-gray-900';
  const cardColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  return (
    <div className={`min-h-screen p-8 ${bgColor}`}>
      <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>
        {user.firstName} {user.lastName}
      </h1>

      {/* Info Card */}
      <div className={`rounded-2xl shadow-lg p-6 mb-6 grid gap-4 sm:grid-cols-2 ${cardColor}`}>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className={`font-medium ${textColor}`}>{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className={`font-medium ${textColor}`}>{user.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <p className={`font-medium ${textColor}`}>{user.address?.address}, {user.address?.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Bio</p>
            <p className={`font-medium ${textColor}`}>
              Dedicated team player who values collaboration and growth.
            </p>
          </div>
        </div>

        {/* Performance Rating at Bottom */}
        <div className="flex flex-col justify-end sm:items-end mt-6 sm:mt-0">
          <p className="text-sm text-gray-400 font-semibold mb-1">Rating--</p>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
            <span className={`text-xs px-2 py-1 rounded-full text-white ${getBadgeColor(rating)}`}>
              {rating} Stars
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'Overview' && <Overview />}
        {activeTab === 'Projects' && <Projects />}
        {activeTab === 'Feedback' && <Feedback />}
      </div>
    </div>
  );
}
