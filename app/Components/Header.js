'use client';
import Link from 'next/link';
import {
  MoreVertical,
  Home,
  BookMarked,
  BarChartBig,
  Sun,
  Moon,
} from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { useState } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useUsers();
  const [showMenu, setShowMenu] = useState(false);

  const isDark = theme === 'dark';

  const baseStyle = {
    backgroundColor: isDark ? '#2E3337' : '#FEFAE0',
    color: isDark ? '#FEFAE0' : '#0A400C',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/' },
    { label: 'Bookmarks', icon: BookMarked, href: '/Bookmarks' },
    { label: 'Analytics', icon: BarChartBig, href: '/Analytics' },
  ];

  return (
    <header style={baseStyle}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          HR Portal
        </h1>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle Navigation Menu"
            style={{
              padding: '0.5rem',
              borderRadius: '9999px',
              border: '1px solid transparent',
              backgroundColor: isDark ? '#3F4A3C' : '#E6E3C5',
              cursor: 'pointer',
            }}
          >
            <MoreVertical
              size={24}
              color={isDark ? '#FFD700' : '#14532D'}
            />
          </button>

          {showMenu && (
            <nav
              style={{
                position: 'absolute',
                right: 0,
                top: '3rem',
                backgroundColor: '#F8F8F0',
                color: '#0A400C',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '1rem',
                width: '180px',
                zIndex: 100,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      color: '#0A400C',
                      backgroundColor: '#EDEAD0',
                    }}
                  >
                    <item.icon size={20} color="#0A400C" />
                    <span>{item.label}</span>
                  </Link>
                ))}

                <button
                  onClick={toggleTheme}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    backgroundColor: '#EDEAD0',
                    color: '#0A400C',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {isDark ? (
                    <Sun size={20} color="#FFD700" />
                  ) : (
                    <Moon size={20} color="#1E40AF" />
                  )}
                  <span>Toggle Theme</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
