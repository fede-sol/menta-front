"use client"

import { useEffect, useState } from "react"
import LoginForm from "@/components/login-form"
import RegisterForm from "@/components/register-form"
import TherapistRegistration from "@/components/therapist-registration"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showTherapistRegistration, setShowTherapistRegistration] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsLoggedIn(true)
    }
  }, [])
  const handleLogin = (userData: any) => {
    setCurrentUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    setShowRegister(false)
    setShowTherapistRegistration(false)
    localStorage.removeItem("user")
  }

  const handleRegisterClick = () => {
    setShowRegister(true)
    setShowTherapistRegistration(false)
  }

  const handleLoginClick = () => {
    setShowRegister(false)
    setShowTherapistRegistration(false)
  }

  const handleTherapistRegistrationClick = () => {
    setShowTherapistRegistration(true)
  }

  if (isLoggedIn) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-primary md:text-4xl">Mental Health Platform</h1>

      {!showRegister && !showTherapistRegistration && (
        <div className="mx-auto max-w-md">
          <LoginForm onLogin={handleLogin} onRegisterClick={handleRegisterClick} />
          <div className="mt-4 text-center">
            <button onClick={handleTherapistRegistrationClick} className="text-sm text-primary underline">
              Register as a Therapist
            </button>
          </div>
        </div>
      )}

      {showRegister && !showTherapistRegistration && (
        <div className="mx-auto max-w-md">
          <RegisterForm onLoginClick={handleLoginClick} />
        </div>
      )}

      {showTherapistRegistration && (
        <div className="mx-auto max-w-md">
          <button onClick={handleLoginClick} className="mb-4 flex items-center text-sm font-medium text-primary">
            ← Back to Login
          </button>
          <TherapistRegistration />
        </div>
      )}
    </main>
  )
}
