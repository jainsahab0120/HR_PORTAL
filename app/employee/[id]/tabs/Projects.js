'use client';
import { Hammer, CheckCircle2, Loader2 } from 'lucide-react';
import { useUsers } from '../../../context/UserContext';

export default function Projects() {
  const { theme } = useUsers();

  const projectList = [
    { name: "UI Revamp for Dashboard", status: "Completed" },
    { name: "Backend Sync API", status: "In Progress" },
    { name: "Internal Utility Builder", status: "Pending" },
  ];

  const statusStyles = {
    Completed: {
      icon: <CheckCircle2 className="text-green-600" size={18} />,
      bg: 'bg-green-100',
    },
    'In Progress': {
      icon: <Loader2 className="animate-spin text-yellow-500" size={18} />,
      bg: 'bg-yellow-100',
    },
    Pending: {
      icon: <Hammer className="text-orange-600" size={18} />,
      bg: 'bg-orange-100',
    },
  };

  return (
    <section className={`p-5 rounded-2xl shadow-lg transition duration-300 ${theme === 'dark' ? 'bg-[#262626] text-white' : 'bg-[#F1F7ED] text-[#2C2C2C]'}`}>
      <h3 className="text-2xl font-semibold mb-4 tracking-wide flex items-center gap-2">
        <Hammer className="text-[#6B705C]" size={22} />
        Active Projects
      </h3>

      <ul className="space-y-4">
        {projectList.map((project, i) => {
          const style = statusStyles[project.status] || {};
          return (
            <li
              key={i}
              className={`flex items-center justify-between p-4 rounded-xl border shadow-sm transition-transform hover:scale-105 duration-200 ${style.bg}`}
            >
              <div>
                <h4 className="font-bold text-md mb-1">{project.name}</h4>
                <p className="text-sm opacity-80 flex items-center gap-2">
                  {style.icon}
                  {project.status}
                </p>
              </div>
              <span className="text-xs uppercase font-semibold px-3 py-1 rounded-full bg-white/70 shadow-inner">
                {project.status}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
