import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/Context/AuthProvider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useUserProfile } from '@/hooks/use-user-profile'

const Profile = () => {
  const { user, logout} = useAuth()
  const {data: userData} = useUserProfile(user.id)
  const [username, setUsername] = useState(userData?.name || '')
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(userData?.profileImage)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSaveChanges = useCallback(
    async (e) => {
      e.preventDefault()
      
      const formData = new FormData()
      formData.append('name', username)
      if (profileImage) formData.append('profileImage', profileImage)
      
      // await updateUserProfile(user.userId, formData)
      // await fetchUser(user.userId)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username, profileImage, user]
  )

  const handleLogout = () => logout()

  if (!user) return <div>Loading...</div>

  return (
    <div className="py-4 mx-auto max-w-lg">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="profile-image-input" className="cursor-pointer flex flex-col gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewImage} alt={username} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </label>
            <input
              type="file"
              id="profile-image-input"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="w-full flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label>Email</Label>
              <Input value={userData?.email} disabled />
            </div>
            <div className="flex gap-2 w-full mt-4">
              <Button onClick={handleSaveChanges} className="w-full">
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
