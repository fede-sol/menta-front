"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would validate credentials against a backend
    // For now, we'll simulate a successful login
    onLogin({
      id: 1,
      name: "John Doe",
      email: email,
      role: "patient",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
          <div className="text-center text-sm">
            No tienes una cuenta?{" "}
            <button type="button" onClick={onRegisterClick} className="text-primary underline">
              Registrarse
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
