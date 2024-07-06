import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { baseUrl } from './consts'

interface LoginResponse {
  access_token: string
}

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post<LoginResponse>(`${baseUrl}/auth/login`, { email, password })
  const { access_token } = response.data
  return access_token
}

export const getNotes = async (token: string) => {
  const decodedToken = jwtDecode(token) as { sub: string } // Decodifica o token JWT
  const userId = decodedToken.sub

  const response = await axios.get(`${baseUrl}/user/${userId}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
