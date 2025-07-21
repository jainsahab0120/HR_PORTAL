import { useUsers } from '../../../context/UserContext';
import { Sparkles } from 'lucide-react';

export default function Overview() {
  const { theme } = useUsers();

  const achievements = [
    'Promoted to Team Lead in 2023',
    'Completed AWS Certification',
    'Led Development of Product X',
    'Mentored Three Interns',
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`rounded-2xl shadow-md p-5 transition-all duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className={`w-5 h-5 ${isDark ? 'text-yellow-300' : 'text-indigo-600'}`} />
        <h3 className="text-xl font-bold tracking-wide">Career Highlights</h3>
      </div>

      <ul className="space-y-3">
        {achievements
          .sort(() => Math.random() - 0.5)
          .map((achievement, index) => (
            <li
              key={index}
              className={`px-4 py-2 rounded-lg border-l-4 shadow-sm transition hover:scale-[1.02] duration-200 
                ${isDark ? 'bg-gray-800 border-yellow-400' : 'bg-gray-100 border-indigo-500'}`}
            >
              <span className="block text-sm font-medium">{achievement}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
