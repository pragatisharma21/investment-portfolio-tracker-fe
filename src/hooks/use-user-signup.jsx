import AccountService from '@/Api/Account.service'
import { useMutation } from '@tanstack/react-query'

export const useSignup = () => {
  const query = useMutation({
    mutationKey: ['signup'],
    mutationFn: (params) => AccountService.signupUser(params),
  })

  return query
}
