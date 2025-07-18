import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-glass dark:bg-glass-dark backdrop-blur-lg 
                border border-white/10 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <SunIcon className="w-7 h-7 text-yellow-400" />
      ) : (
        <MoonIcon className="w-7 h-7 text-slate-700" />
      )}
    </button>
  );
}
