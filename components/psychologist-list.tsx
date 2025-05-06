"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for psychologists
const mockPsychologists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Anxiety",
    licenseNumber: "PSY12345",
    email: "sarah.johnson@example.com",
    biography:
      "Dr. Johnson is a licensed clinical psychologist with over 10 years of experience treating anxiety disorders. She specializes in cognitive-behavioral therapy and mindfulness-based approaches. Her warm and empathetic style helps clients feel comfortable and supported throughout their therapy journey.",
    profilePicture: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Depression",
    licenseNumber: "PSY67890",
    email: "michael.chen@example.com",
    biography:
      "Dr. Chen has dedicated his career to helping individuals overcome depression and mood disorders. With a background in both psychodynamic and cognitive approaches, he tailors treatment to each client's unique needs. He believes in creating a safe space where clients can explore their thoughts and feelings without judgment.",
    profilePicture: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Trauma",
    licenseNumber: "PSY24680",
    email: "emily.rodriguez@example.com",
    biography:
      "Dr. Rodriguez specializes in trauma recovery and PTSD treatment. She is trained in EMDR and somatic experiencing techniques. Her approach focuses on helping clients process traumatic experiences and develop resilience. She works collaboratively with clients to establish safety and build coping skills before addressing deeper trauma work.",
    profilePicture: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Family Therapy",
    licenseNumber: "PSY13579",
    email: "james.wilson@example.com",
    biography:
      "Dr. Wilson is a family therapist who helps families improve communication and resolve conflicts. He creates an inclusive environment where all family members feel heard and respected. His systemic approach examines patterns of interaction and helps families develop healthier ways of relating to one another.",
    profilePicture: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    specialization: "Child Psychology",
    licenseNumber: "PSY97531",
    email: "aisha.patel@example.com",
    biography:
      "Dr. Patel specializes in working with children and adolescents. She uses play therapy and creative approaches to help young clients express themselves and work through challenges. She also works closely with parents to provide guidance and support. Her office is designed to be a welcoming space where children feel comfortable and safe.",
    profilePicture: "/placeholder.svg?height=400&width=400",
  },
]

export default function PsychologistList({ onViewDetails }) {
  const [psychologists, setPsychologists] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call
    setPsychologists(mockPsychologists)
  }, [])

  const filteredPsychologists = psychologists.filter((psych) => {
    const matchesSearch = psych.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = specialization === "" || psych.specialization === specialization
    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Find a Psychologist</h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search by Name</Label>
          <Input
            id="search"
            placeholder="Search psychologists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="specialization">Filter by Specialization</Label>
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger>
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="Anxiety">Anxiety</SelectItem>
              <SelectItem value="Depression">Depression</SelectItem>
              <SelectItem value="Trauma">Trauma</SelectItem>
              <SelectItem value="Family Therapy">Family Therapy</SelectItem>
              <SelectItem value="Child Psychology">Child Psychology</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPsychologists.map((psychologist) => (
          <Card key={psychologist.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={psychologist.profilePicture || "/placeholder.svg"}
                alt={psychologist.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <h3 className="text-lg font-bold">{psychologist.name}</h3>
              <p className="text-sm text-primary">{psychologist.specialization}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="line-clamp-3 text-sm text-muted-foreground">{psychologist.biography}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={() => onViewDetails(psychologist)} className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredPsychologists.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            No psychologists found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
