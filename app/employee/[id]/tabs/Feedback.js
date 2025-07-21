import { MessageCircleHeart } from 'lucide-react';
import { useUsers } from '../../../context/UserContext';

export default function FeedbackSection() {
  const { theme } = useUsers();

  const feedbackList = [
    "Great team player and communicator.",
    "Delivered project ahead of deadline.",
    "Strong technical skills.",
    "Needs to improve documentation habits.",
  ];

  const cardStyles = theme === 'dark'
    ? 'bg-[#1e1e1e] text-white border-gray-700'
    : 'bg-[#fff8f0] text-[#2c2c2c] border-[#e2cfc3]';

  return (
    <div className={`rounded-xl shadow-lg p-5 border ${cardStyles}`}>
      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 tracking-wide">
        <MessageCircleHeart size={20} className="text-[#9b5de5]" />
        Team Feedback Highlights
      </h3>

      <div className="space-y-4">
        {feedbackList
          .sort(() => 0.5 - Math.random())
          .map((item, index) => (
            <div
              key={index}
              className={`relative pl-5 py-2 border-l-4 rounded-sm ${
                theme === 'dark' ? 'border-[#bb86fc]' : 'border-[#9b5de5]'
              }`}
            >
              <span className="absolute -left-2 top-2 w-3 h-3 rounded-full bg-[#9b5de5] shadow-md"></span>
              <p className="text-sm font-medium tracking-tight">{item}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
