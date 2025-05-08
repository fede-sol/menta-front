"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TherapistRegistration() {
  const [formData, setFormData] = useState({
    external_id: Math.floor(Math.random() * 10000) + 2,
    name: "",
    email: "",
    phone: "",
    password: "",
    speciality: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapists/create/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      alert("Psicólogo registrado con éxito")
    } else {
      alert("Error al registrar el psicólogo")
    }
    console.log("Therapist registration with:", formData)
  }
  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, speciality: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Registrarse como psicólogo</CardTitle>
        <CardDescription>Complete este formulario para registrarte como profesional en nuestra plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>


          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Especialización</Label>
            <Select value={formData.speciality} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una especialización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ansiedad">Ansiedad</SelectItem>
                <SelectItem value="Depresión">Depresión</SelectItem>
                <SelectItem value="Trauma">Trauma</SelectItem>
                <SelectItem value="Adicción">Adicción</SelectItem>
                <SelectItem value="Terapia Familiar">Terapia Familiar</SelectItem>
                <SelectItem value="Psicología Infantil">Psicología Infantil</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <Button type="submit" className="w-full">
            Registrar perfil
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
