'use client';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaChartBar, FaBookmark } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const users = [
  { company: { department: 'Engineering' } },
  { company: { department: 'Support' } },
  { company: { department: 'Research and Development' } },
  { company: { department: 'Support' } },
  { company: { department: 'Human Resources' } },
];

const DepartmentChart = () => {
  const { theme } = useUsers();
  const [chartData, setChartData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);
  const [regionData, setRegionData] = useState(null);

  useEffect(() => {
    const deptSet = new Set();
    users.forEach((user) => {
      const dept = user.company?.department || 'Unknown';
      deptSet.add(dept);
    });

    const departments = Array.from(deptSet);
    const randomRatings = departments.map(() => Math.floor(Math.random() * 5) + 1);
    setChartData({
      labels: departments,
      datasets: [
        {
          label: 'Department Ratings',
          data: randomRatings,
          backgroundColor: '#67C6E3',
          borderRadius: 6,
        },
      ],
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = days.map(() => Math.floor(Math.random() * 10) + 1);
    setBookmarkData({
      labels: days,
      datasets: [
        {
          label: 'Bookmarks',
          data: counts,
          fill: true,
          borderColor: '#845EC2',
          backgroundColor: 'rgba(132, 94, 194, 0.3)',
          tension: 0.4,
        },
      ],
    });

    const regions = ['North', 'South', 'East', 'West'];
    const userDistribution = regions.map(() => Math.floor(Math.random() * 50) + 10);
    setRegionData({
      labels: regions,
      datasets: [
        {
          label: 'User Regions',
          data: userDistribution,
          backgroundColor: ['#FF6F91', '#6A93FF', '#FFC75F', '#00C9A7'],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const baseStyle =
    theme === 'light'
      ? 'bg-[#F8F9FA] text-[#1B1B1B]'
      : 'bg-[#1E1E2F] text-white';

  return (
    <div
      className={`min-h-screen py-10 px-6 md:px-12 lg:px-20 font-[Poppins] ${baseStyle} transition-all duration-300`}
    >
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Pie Chart */}
        <div className="rounded-xl border shadow-lg p-4 bg-white dark:bg-[#2D2D44] hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-[#FF6F91] dark:text-[#FFC75F]">
            <GiPieChart /> User by Region
          </h2>
          {regionData ? (
            <Pie data={regionData} />
          ) : (
            <p className="text-center text-gray-400">Loading pie chart...</p>
          )}
        </div>

        {/* Line Chart */}
        <div className="rounded-xl border shadow-lg p-4 bg-white dark:bg-[#2D2D44] hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-[#845EC2]">
            <FaBookmark /> Weekly Bookmarks
          </h2>
          {bookmarkData ? (
            <Line data={bookmarkData} />
          ) : (
            <p className="text-center text-gray-400">Loading line chart...</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="rounded-xl border shadow-lg p-4 bg-white dark:bg-[#2D2D44] hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-[#67C6E3]">
            <FaChartBar /> Dept Ratings
          </h2>
          {chartData ? (
            <Bar data={chartData} />
          ) : (
            <p className="text-center text-gray-400">Loading bar chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;
