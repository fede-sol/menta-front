"use client"

import { useState } from "react"
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

  const handleBookAppointment = (therapist, beginDate, endDate) => {
    const newAppointment = {
      id: Date.now(),
      begin_date: beginDate,
      end_date: endDate,
      patient_id: user.id,
      patient_name: user.name,
      patient_email: user.email,
      patient_phone: "555-123-4567", // Mock patient phone
      therapist: therapist,
      status: "pendiente",
      link: "",
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    }
    setReservedAppointments([...reservedAppointments, newAppointment])
    setActiveView("appointments")
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
          <h1 className="text-xl font-bold text-primary">Mental Health Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
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
            Find Therapists
          </Button>
          <Button
            variant={activeView === "appointments" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView("appointments")}
          >
            <Clock className="mr-2 h-4 w-4" />
            My Appointments
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
                      <h3 className="mb-2 font-semibold">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" onClick={() => setActiveView("therapists")}>
                          Find a Therapist
                        </Button>
                        <Button className="w-full justify-start" onClick={() => setActiveView("appointments")}>
                          View My Appointments
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h3 className="mb-2 font-semibold">Upcoming Appointments</h3>
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
                              View all appointments
                            </Button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No upcoming appointments. Book one now!</p>
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

  // Generate next 7 days
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  // Generate time slots
  const timeSlots = [
    { beginTime: "09:00", endTime: "10:00", available: true },
    { beginTime: "10:00", endTime: "11:00", available: false },
    { beginTime: "11:00", endTime: "12:00", available: true },
    { beginTime: "12:00", endTime: "13:00", available: true },
    { beginTime: "13:00", endTime: "14:00", available: false },
    { beginTime: "14:00", endTime: "15:00", available: true },
    { beginTime: "15:00", endTime: "16:00", available: true },
    { beginTime: "16:00", endTime: "17:00", available: false },
  ]

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
        ← Back to list
      </button>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{therapist.name}</h2>
        <div className="space-y-2">
          <p className="text-muted-foreground">Email: {therapist.email}</p>
          <p className="text-muted-foreground">Phone: {therapist.phone}</p>
          <p className="text-muted-foreground">ID: {therapist.external_id}</p>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-xl font-bold">Book an Appointment</h3>

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
            <h4 className="mb-3 font-medium">Available times for {formatDate(selectedDate)}:</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {timeSlots.map((slot) => (
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
                  {slot.beginTime} - {slot.endTime} {slot.available ? "(Available)" : "(Booked)"}
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

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="mb-4 flex items-center text-sm font-medium text-primary">
        ← Back to appointments
      </button>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-2xl font-bold">Appointment Details</h2>

        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Therapist</span>
            <span className="font-medium">{appointment.therapist.name}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Therapist Contact</span>
            <span>
              {appointment.therapist.email} | {appointment.therapist.phone}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Start Time</span>
            <span>{formatDateTime(appointment.begin_date)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">End Time</span>
            <span>{formatDateTime(appointment.end_date)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Status</span>
            <span>{appointment.status}</span>
          </div>

          {appointment.link && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Meeting Link</span>
              <a href={appointment.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Join Meeting
              </a>
            </div>
          )}

          <button className="mt-4 w-full rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
