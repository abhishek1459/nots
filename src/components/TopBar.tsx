import { SearchBox } from './SearchBox'

interface TopBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  darkMode: boolean
  onToggleDarkMode: () => void
  onLogout: () => void
}

export function TopBar({
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  onLogout,
}: TopBarProps) {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-4 shrink-0 bg-white dark:bg-gray-950">
      <div className="text-lg font-bold text-gray-900 dark:text-gray-100 shrink-0">
        NOTS
      </div>

      <SearchBox value={searchQuery} onChange={onSearchChange} />

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
