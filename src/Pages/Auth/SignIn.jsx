import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useLogin } from "@/hooks/use-user-login"
import { useAuth } from "@/Context/AuthProvider"
import AccountService from '@/Api/Account.service'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user?.token) {
    navigate('/dashboard')
  }

  const handleGoogleLogin = async (response) => {
    const googleToken = response?.credential
    if (!googleToken) {
      toast.error('Google login failed. No token received.')
      return
    }
    try {
      const res = await AccountService.googleSignupUser(googleToken)
      if (res.status === 201 || res.status === 200) {
        toast.success(`${res.status === 201 ? 'Signup' : 'Login'} Successfully`)
        login(res.data.token, res.data.id)
        navigate('/dashboard')
      } else {
        toast.error('Google login failed. Please try again.')
      }
    } catch (err) {
      toast.error('Google login failed. Please try again.')
      console.error('Google Login Error:', err)
    }
  }

  const { mutate: loginMutation, isPending: isLoading } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    loginMutation(
      { email, password },
      { onSuccess: () => navigate('/dashboard') }
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-5">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('Google login failed')}
            />
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}