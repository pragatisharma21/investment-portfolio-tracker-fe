import SignIn from '@/Pages/Auth/SignIn'
import SignUp from '@/Pages/Auth/SignUp'
import Landing from '@/Pages/Landing/Landing'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '@/Pages/Common/Dashboard'
import Profile from '@/Pages/Common/Profile'
import { useAuth } from '@/Context/AuthProvider'

const AllRoutes = () => {
  const { user } = useAuth()
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Landing />}
      />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
