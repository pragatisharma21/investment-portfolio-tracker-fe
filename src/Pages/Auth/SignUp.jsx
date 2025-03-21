import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { FaCamera } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useGoogleSignup } from '@/hooks/use-user-google-login'
import { useSignup } from '@/hooks/use-user-signup'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('/placeholder-user.jpg')

  const { data: user } = useUserProfile()

  const navigate = useNavigate()
  const googleLoginMutation = useGoogleSignup()
  const signupMutation = useSignup()

  if (user) {
    navigate('/dashboard')
  }

  const handleGoogleLogin = async (response) => {
    const googleToken = response?.credential

    googleLoginMutation.mutate(googleToken, {
      onSuccess: () => navigate('/dashboard'),
    })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', username)
    formData.append('email', email)
    formData.append('password', password)

    if (profileImage) {
      formData.append('profileImage', profileImage)
    }

    signupMutation.mutate(formData)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('Google login failed')}
            />
          </div>
          <div className="flex justify-center items-center flex-col mb-4">
            <Label htmlFor="profile-upload" className="cursor-pointer">
              <Avatar className="h-24 w-24 border-2 border-gray-300">
                <AvatarImage src={previewImage} />
                <AvatarFallback>
                  {' '}
                  <FaCamera className="text-2xl" />{' '}
                </AvatarFallback>
              </Avatar>
            </Label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to={'/sign-in'} className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
