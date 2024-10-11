import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface Event {
  title: string
  start: Date
  end: Date
}

const Calendar: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      title: 'Evento de Vuelo Grupal',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 12, 0),
    },
    {
      title: 'Competencia de Aterrizaje',
      start: new Date(2024, 2, 20, 14, 0),
      end: new Date(2024, 2, 20, 16, 0),
    },
  ])

  return (
    <div className="h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Calendario de Eventos</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
      />
    </div>
  )
}

export default Calendar