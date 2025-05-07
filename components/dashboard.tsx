"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import TherapistList from "@/components/therapist-list"
import ReservedAppointments from "@/components/reserved-appointments"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Clock, LogOut } from "lucide-react"

export default function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedTherapist, setSelectedTherapist] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [reservedAppointments, setReservedAppointments] = useState([])

  const fetchReservedAppointments = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/patient/${user.id}/`)
    const data = await response.json()
    setReservedAppointments(data)
  }
  useEffect(() => {
    fetchReservedAppointments()
  }, [])
  const handleBookAppointment = async (therapist, beginDate, endDate) => {
    const newAppointment = {
      begin_date: beginDate,
      end_date: endDate,
      patient_id: user.id,
      patient_name: user.name,
      patient_email: user.email,
      patient_phone: "555-123-4567", // Mock patient phone
      therapist: therapist.id,
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/create/`, {
        method: "POST",
        body: JSON.stringify(newAppointment),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
  } catch (error) {
    console.error("Error al crear el turno:", error)
  }
    setActiveView("appointments")
    fetchReservedAppointments()
  }

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setActiveView("appointmentDetail")
  }

  const handleViewTherapistDetails = (therapist) => {
    setSelectedTherapist(therapist)
    setActiveView("therapistDetail")
  }

  const handleBackToList = () => {
    setSelectedTherapist(null)
    setActiveView("therapists")
  }

  const handleBackToAppointments = () => {
    setSelectedAppointment(null)
    setActiveView("appointments")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-primary">Menta Health Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Bienvenido, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={onLogout} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto grid gap-6 px-4 py-6 md:grid-cols-[240px_1fr] lg:gap-8">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Button
            variant={activeView === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView("dashboard")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeView === "therapists" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView("therapists")}
          >
            <Users className="mr-2 h-4 w-4" />
            Encontrar un psicólogo
          </Button>
          <Button
            variant={activeView === "appointments" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {setActiveView("appointments"); fetchReservedAppointments()}}
          >
            <Clock className="mr-2 h-4 w-4" />
            Mis Turnos
          </Button>
        </aside>

        {/* Content Area */}
        <main>
          <Card>
            <CardContent className="p-6">
              {activeView === "dashboard" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Dashboard</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4">
                      <h3 className="mb-2 font-semibold">Acciones rápidas</h3>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" onClick={() => setActiveView("therapists")}>
                          Encontrar un psicólogo
                        </Button>
                        <Button className="w-full justify-start" onClick={() => setActiveView("appointments")}>
                          Ver mis turnos
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h3 className="mb-2 font-semibold">Turnos próximos</h3>
                      {reservedAppointments.length > 0 ? (
                        <div className="space-y-2">
                          {reservedAppointments.slice(0, 2).map((appointment) => (
                            <div key={appointment.id} className="rounded-md border p-2">
                              <p className="font-medium">{appointment.therapist.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(appointment.begin_date).toLocaleString()}
                              </p>
                            </div>
                          ))}
                          {reservedAppointments.length > 2 && (
                            <Button variant="link" className="px-0" onClick={() => setActiveView("appointments")}>
                              Ver todos los turnos
                            </Button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No tienes turnos próximos. Reserva uno ahora!</p>
                      )}
                    </Card>
                  </div>
                </div>
              )}

              {activeView === "therapists" && <TherapistList onViewDetails={handleViewTherapistDetails} />}

              {activeView === "therapistDetail" && selectedTherapist && (
                <TherapistDetail
                  therapist={selectedTherapist}
                  onBack={handleBackToList}
                  onBookAppointment={handleBookAppointment}
                />
              )}

              {activeView === "appointments" && (
                <ReservedAppointments
                  appointments={reservedAppointments}
                  onViewDetails={handleViewAppointmentDetails}
                />
              )}

              {activeView === "appointmentDetail" && selectedAppointment && (
                <AppointmentDetail appointment={selectedAppointment} onBack={handleBackToAppointments} />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function TherapistDetail({ therapist, onBack, onBookAppointment }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [therapistDetail, setTherapistDetail] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    external_id: "",
    available_slots: {}
  })
  
  useEffect(() => {
    const fetchTherapist = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/therapists/${therapist.id}/`)
      const data = await response.json()
      setTherapistDetail(data)
    }
    fetchTherapist()
  }, [therapist])

  // Generate next 7 days
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  // Format date as YYYY-MM-DD for accessing available_slots
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get available time slots for the selected date
  const getTimeSlotsForDate = (date) => {
    if (!date) return []
    
    const dateKey = formatDateKey(date)
    const availableSlots = therapistDetail.available_slots?.[dateKey] || {}
    
    return Object.entries(availableSlots).map(([time, available]) => {
      const [hours] = time.split(':')
      const beginHour = parseInt(hours, 10)
      const endHour = beginHour + 1
      const endTime = `${endHour.toString().padStart(2, '0')}:00`
      
      return {
        beginTime: time,
        endTime: endTime,
        available: available
      }
    }).sort((a, b) => a.beginTime.localeCompare(b.beginTime))
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const createDateTimeString = (date, timeString) => {
    const [hours, minutes] = timeString.split(":")
    const newDate = new Date(date)
    newDate.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0, 0)
    return newDate.toISOString()
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="mb-4 flex items-center text-sm font-medium text-primary">
        ← Volver a la lista
      </button>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{therapist.name}</h2>
        <div className="space-y-2">
          <p className="text-muted-foreground">Email: {therapist.email}</p>
          <p className="text-muted-foreground">Celular: {therapist.phone}</p>
          <p className="text-muted-foreground">Especialidad: {therapist?.specialty || "N/A"}</p>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-xl font-bold">Reservar un turno</h3>

        <div className="mb-6 flex flex-wrap gap-2">
          {next7Days.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`rounded-md px-3 py-2 text-sm ${
                selectedDate && selectedDate.toDateString() === date.toDateString()
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>

        {selectedDate && (
          <div>
            <h4 className="mb-3 font-medium">Turnos disponibles para {formatDate(selectedDate)}:</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {getTimeSlotsForDate(selectedDate).map((slot) => (
                <button
                  key={slot.beginTime}
                  disabled={!slot.available}
                  onClick={() =>
                    slot.available &&
                    onBookAppointment(
                      therapist,
                      createDateTimeString(selectedDate, slot.beginTime),
                      createDateTimeString(selectedDate, slot.endTime),
                    )
                  }
                  className={`rounded-md px-3 py-2 text-sm ${
                    slot.available
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  }`}
                >
                  {slot.beginTime} - {slot.endTime} {slot.available ? "(Disponible)" : "(Ocupado)"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AppointmentDetail({ appointment, onBack }) {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString()
  }
  const [appointmentDetail, setAppointmentDetail] = useState(appointment)
  const fetchAppointment = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointment.id}/`)
    const data = await response.json()
    setAppointmentDetail(data)
  }

  useEffect(() => {
    fetchAppointment()
  }, [])

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="mb-4 flex items-center text-sm font-medium text-primary">
        ← Volver a la lista
      </button>

      <div className="rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Detalles del turno</h2>
          <Button 
            onClick={fetchAppointment}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            Verificar estado
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Psicólogo</span>
            <span className="font-medium">{appointment.therapist.name}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Contacto del psicólogo</span>
            <span>
              {appointment.therapist.email} | {appointment.therapist.phone}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Hora de inicio</span>
            <span>{formatDateTime(appointment.begin_date)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Hora de fin</span>
            <span>{formatDateTime(appointment.end_date)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Estado</span>
            <span>{appointmentDetail.status}</span>
          </div>

          {appointmentDetail.link && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Enlace de reunión</span>
              <a href={appointmentDetail.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Unirse a la reunión
              </a>
            </div>
          )}
          {
            appointmentDetail.status === "pendiente" && (
              <Button onClick={() => {}} className="mt-4 w-full">
              <a href={`http://billing-frontend-francisco.s3-website-us-east-1.amazonaws.com/${appointmentDetail?.id}`} target="_blank" rel="noopener noreferrer">
                Pagar sesión
              </a>
              </Button>
            )
          }

          <button className="mt-4 w-full rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
            Cancelar turno
          </button>
        </div>
      </div>
    </div>
  )
}
