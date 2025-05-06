"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

export default function ReservedAppointments({ appointments, onViewDetails }) {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString()
  }

  if (appointments.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-2xl font-bold">Mis Turnos</h2>
        <p className="text-muted-foreground">No tienes ningún turno programado.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mis Turnos</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold">Turno con {appointment.therapist.name}</h3>
              <p className="text-sm text-muted-foreground">Estado: {appointment.status}</p>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Inicio: {formatDateTime(appointment.begin_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Fin: {formatDateTime(appointment.end_date)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => onViewDetails(appointment)}>
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
