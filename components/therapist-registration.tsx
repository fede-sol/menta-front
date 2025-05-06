"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TherapistRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    external_id: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Handle therapist registration logic here
    console.log("Therapist registration with:", formData)
    alert("Registration submitted! Please wait for admin approval.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Register as a Therapist</CardTitle>
        <CardDescription>Complete this form to register as a professional on our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_id">External ID</Label>
            <Input
              id="external_id"
              name="external_id"
              type="number"
              value={formData.external_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Register Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
