import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  let navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`https://backend-tqho.onrender.com/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // update loading state
      setIsLoading(false)
      let path = `/verify`; 
      navigate(path);

    }
  }

  return { signup, isLoading, error }
}