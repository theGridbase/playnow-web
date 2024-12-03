"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/components/scheduler.scss";
import CustomToolbar from "./Toolbar";

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  desc?: string;
};

const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    id: 1,
    title: "Meeting",
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
];

const Scheduler: React.FC = () => {
  const [eventsData, setEventsData] = useState<Event[]>(events);

  return (
    <div>
      <h1 className="heading-welcome">Welcome</h1>
      <p className="tag-line">Guests can reserve your place 24 hours after you publish</p>
      <Calendar<Event>
        localizer={localizer}
        events={eventsData}
        // startAccessor="start"
        // endAccessor="end"
        style={{ height: "80vh" }}
        components={{
          toolbar: CustomToolbar,
        }}
        
      />
    </div>
  );
};

export default Scheduler;
