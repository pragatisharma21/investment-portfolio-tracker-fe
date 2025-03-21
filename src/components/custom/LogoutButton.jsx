import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuth } from '@/Context/AuthProvider'

const LogoutButton = ({className = ''}) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
    queryClient.invalidateQueries()
  }

  return <Button className={className} onClick={handleLogout}>Logout</Button>
}

export default LogoutButton
