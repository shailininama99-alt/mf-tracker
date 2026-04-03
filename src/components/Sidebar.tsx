import { LayoutDashboard, TrendingUp, Briefcase, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: Briefcase, label: 'Portfolio', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fund Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track & Monitor</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}
