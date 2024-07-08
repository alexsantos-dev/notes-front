import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import * as dotenv from 'dotenv'
interface LoginResponse {
  token: string
}

interface Data {
  note: string
}

dotenv.config()

export async function createUser(name: string, email: string, password: string) {
  try {
    const response = await axios.post(`${process.env.API}/user`, { name, email, password })
    return response.data
  }
  catch (error: any) {
    if (error.response.data.message = 'SQLITE_CONSTRAINT: UNIQUE constraint failed: Users.email') {
      throw new Error('Email já cadastrado')
    }
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(`${process.env.API}/auth/login`, { email, password })
    const { token } = response.data
    const decodedToken = jwtDecode<{ sub: string }>(token)
    const userId = decodedToken.sub
    return { response, token, userId }
  } catch (error: any) {
    throw new Error('Email ou senha inválida')
  }
}

export async function GetAllNotes(userId: string, token: string) {
  try {
    const response = await axios.get(`${process.env.API}/user/${userId}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function AddNote(userId: string, data: Data, token: string) {
  try {
    const response = await axios.post(`${process.env.API}/user/${userId}/notes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function UpdateNote(userId: string, noteId: string, token: string, data: Data) {
  try {
    const response = await axios.patch(`${process.env.API}/user/${userId}/notes/${noteId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function DeleteNote(userId: string, noteId: string, token: string) {
  try {
    await axios.delete(`${process.env.API}/user/${userId}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
