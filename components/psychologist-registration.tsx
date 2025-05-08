"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PsychologistRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    licenseNumber: "",
    specialization: "",
    biography: "",
    profilePicture: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, specialization: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapists/create/`, {
      method: "POST",
      body: JSON.stringify(formData),
    })
    alert("Psicólogo registrado con éxito")
    console.log("Psychologist registration with:", formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Registrarse como psicólogo</CardTitle>
        <CardDescription>Completa este formulario para registrarte como profesional en nuestra plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>


          <div className="space-y-2">
            <Label htmlFor="specialization">Especialización</Label>
            <Select value={formData.specialization} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Anxiety">Anxiety</SelectItem>
                <SelectItem value="Depression">Depression</SelectItem>
                <SelectItem value="Trauma">Trauma</SelectItem>
                <SelectItem value="Addiction">Addiction</SelectItem>
                <SelectItem value="Family Therapy">Family Therapy</SelectItem>
                <SelectItem value="Child Psychology">Child Psychology</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <Button type="submit" className="w-full">
            Register Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
