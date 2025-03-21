import AccountService from '@/Api/Account.service'
import { useAuth } from '@/Context/AuthProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { login } = useAuth()

  const navigate = useNavigate()

  const query = useMutation({
    mutationKey: ['login'],
    mutationFn: (params) => AccountService.loginUser(params),
    onSuccess: async (data) => {
      toast.success(`${data.status === 201 ? 'Signup' : 'Login'} Successfully`)

      login(data.token, data.id)

      queryClient.prefetchQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
          return AccountService.getUserProfile(data.id)
        },
      })
      navigate('/dashboard')
    },
  })

  return query
}
