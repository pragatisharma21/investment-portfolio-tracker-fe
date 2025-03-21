import apiClient from './index.js'

export default class AccountService {
  constructor() {}

  static loginUser = async (params) => {
    const res = await apiClient.post('/user/login', params)
    return res.data
  }

  static signupUser = async (params) => {
    const res = await apiClient.post('/user/signup', params)
    return res.data
  }

  static googleSingnupUser = async (token) => {
    const res = await apiClient.post('/user/googleSignup', { token })
    return res.data
  }

  static getUserProfile = async (userId) => {
    const res = await apiClient.get(`/user/profile/${userId}`)
    return res.data
  }

  static updateUserProfile = async (userId, params) => {
    try {
      const res = await apiClient.put(`/user/updateProfile/${userId}`, params)
      return res.data
    } catch (error) {
      console.error('Error updating profile:', error)
      return { ok: false }
    }
  }
}
