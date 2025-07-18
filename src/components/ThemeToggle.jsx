import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 rounded-full bg-glass dark:bg-glass-dark backdrop-blur-lg 
                border border-white/10 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-slate-700" />
      )}
    </button>
  );
}
