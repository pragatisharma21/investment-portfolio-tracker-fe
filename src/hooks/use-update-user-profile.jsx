import { updateUserProfile } from '@/Api/Account.service'
import {
  QueryClient,
  useMutation,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const useUpdateUserProfile = (userId) => {
  return useMutation({
    mutationFn: (data) => updateUserProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', userId])
    },
  })
}

export default { queryClient, QueryClientProvider }
