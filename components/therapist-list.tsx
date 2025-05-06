"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for therapists based on the provided model
const mockTherapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-123-4567",
    created_at: "2023-01-15T10:30:00Z",
    last_updated: "2023-05-20T14:45:00Z",
    external_id: 12345,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "555-234-5678",
    created_at: "2023-02-10T09:15:00Z",
    last_updated: "2023-06-05T11:20:00Z",
    external_id: 23456,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "555-345-6789",
    created_at: "2023-03-05T13:45:00Z",
    last_updated: "2023-06-10T16:30:00Z",
    external_id: 34567,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    phone: "555-456-7890",
    created_at: "2023-03-20T11:00:00Z",
    last_updated: "2023-06-15T09:45:00Z",
    external_id: 45678,
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    email: "aisha.patel@example.com",
    phone: "555-567-8901",
    created_at: "2023-04-12T15:30:00Z",
    last_updated: "2023-06-20T10:15:00Z",
    external_id: 56789,
  },
]

export default function TherapistList({ onViewDetails }) {
  const [therapists, setTherapists] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call
    setTherapists(mockTherapists)
  }, [])

  const filteredTherapists = therapists.filter((therapist) => {
    return therapist.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Find a Therapist</h2>

      <div className="space-y-2">
        <Label htmlFor="search">Search by Name</Label>
        <Input
          id="search"
          placeholder="Search therapists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id}>
            <CardHeader className="p-4">
              <h3 className="text-lg font-bold">{therapist.name}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: {therapist.email}</p>
                <p>Phone: {therapist.phone}</p>
                <p>ID: {therapist.external_id}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={() => onViewDetails(therapist)} className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredTherapists.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            No therapists found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
