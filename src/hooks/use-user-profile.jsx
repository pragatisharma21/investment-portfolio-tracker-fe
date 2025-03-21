import AccountService from '@/Api/Account.service'
import { useAuth } from '@/Context/AuthProvider'
import { useQuery } from '@tanstack/react-query'

export const useUserProfile = (userId) => {
  const { user } = useAuth()
  const query = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => AccountService.getUserProfile(userId),
    enabled: !!user,
  })

  return query
}
