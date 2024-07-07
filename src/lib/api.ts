import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { baseUrl } from './consts'

interface LoginResponse {
  token: string
}
interface AuthResponse {
  token: string
  userId: string
}

interface Data {
  note: string
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(`${baseUrl}/auth/login`, { email, password })
    const { token } = response.data
    const decodedToken = jwtDecode<{ sub: string }>(token)
    const userId = decodedToken.sub
    return { token, userId }
  } catch (error) {
    console.log(error)
  }
}

export async function GetAllNotes(userId: string, token: string) {
  try {
    const response = await axios.get(`${baseUrl}/user/${userId}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function AddNote(userId: string, data: Data, token: string) {
  try {
    const response = await axios.post(`${baseUrl}/user/${userId}/notes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function UpdateNote(userId: string, noteId: string, token: string, data: Data) {
  try {
    const response = await axios.patch(`${baseUrl}/user/${userId}/notes/${noteId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function DeleteNote(userId: string, noteId: string, token: string) {
  try {
    await axios.delete(`${baseUrl}/user/${userId}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error
  }
}
