import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function ThemeSwitcher() {
  const { themeIndex, setTheme, themes, currentTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold shadow transition-all border border-white/20 dark:border-white/10 backdrop-blur-xl bg-gradient-to-br ${currentTheme.gradient} text-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {themes[themeIndex].name}
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          className={`absolute right-0 mt-2 w-40 rounded-xl shadow-xl z-50 bg-gradient-to-br ${currentTheme.gradient} backdrop-blur-xl border border-white/20 dark:border-white/10`}
          tabIndex={-1}
          role="listbox"
        >
          {themes.map((t, idx) => (
            <li
              key={t.name}
              role="option"
              aria-selected={themeIndex === idx}
              className={`px-5 py-2 cursor-pointer font-semibold text-white transition-all ${themeIndex === idx ? 'bg-white/20 dark:bg-black/20' : 'hover:bg-white/10 dark:hover:bg-black/10'}`}
              onClick={() => { setTheme(idx); setOpen(false); }}
              onKeyDown={e => { if (e.key === 'Enter') { setTheme(idx); setOpen(false); } }}
              tabIndex={0}
            >
              {t.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
