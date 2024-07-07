// auth.ts

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const setUserId = (userId: string): void => {
  localStorage.setItem('userId', userId)
}

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

// lib/auth.ts

export const getUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId')
  }
  return null
}


export const removeToken = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId') // Remover também o userId se necessário
}
