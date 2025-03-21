import { useTheme } from '../../Context/ThemeProvider'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = ({ text = '' }) => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div
      onClick={toggleTheme}
      className="flex justify-center items-center gap-2"
    >
      <button className="p-1 rounded-full bg-background  text-foreground hover:bg-muted transition cursor-pointer">
        {theme === 'dark' ? <FiSun size={22} /> : <FiMoon size={22} />}
      </button>
      {text}
    </div>
  )
}

export default ThemeToggle
