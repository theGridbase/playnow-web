"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import styles from "@/styles/components/rightcalendarr.module.scss";
import Icon from '@/components/ui/Icon/Icon';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState([
    {
      title: "Roar Cricket Academy",
      start: new Date(2024, 10, 22, 8, 0),
      end: new Date(2024, 10, 22, 10, 0),
      resourceId: 1,
    },
    {
      title: "Sam Tennis Ground",
      start: new Date(2024, 10, 23, 10, 0),
      end: new Date(2024, 10, 23, 12, 0),
      resourceId: 2,
    },
    {
      title: "Scheduled Event",
      start: new Date(2024, 11, 4, 9, 0),
      end: new Date(2024, 11, 4, 11, 0),
      resourceId: 3,
    },
    {
      title: "Scheduled Event",
      start: new Date(2024, 11, 5, 14, 0),
      end: new Date(2024, 11, 5, 16, 0),
      resourceId: 4,
    },
    {
      title: "Scheduled Event",
      start: new Date(2024, 11, 6, 13, 0),
      end: new Date(2024, 11, 6, 15, 0),
      resourceId: 5,
    },
  ]);

  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Handle change in view (day/week/month)
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  // Handle the date change when navigating through the calendar
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter events based on the search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) // Search through event titles
  );

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.h1}>Welcome, Sam!</h1>
      <p className={styles.p}>Guests can reserve your place 24 hours after you publish</p>
      
      <Icon size='16' name='sun.svg'/>
      <input
        type="text"
        placeholder="Search events by title..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      
      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={filteredEvents}  // Use filtered events based on the search query
        startAccessor="start"
        endAccessor="end"
        views={{ day: true, week: true, month: true, agenda: true }}
        view={currentView}  // Use `view` instead of `defaultView`
        date={currentDate}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#E73725", // Apply custom background color
            borderRadius: "0px 6px 0px 0px",
            border: "none",
          },
        })}
        components={{
          toolbar: (props) => (
            <div className={styles.toolbar}>
              <button
                onClick={() => handleViewChange("day")}
                className={`${styles.toolbarButton} ${currentView === Views.DAY ? styles.toolbarbtn : ""}`}
              >
                Day
              </button>
              <button
                onClick={() => handleViewChange("week")}
                className={`${styles.toolbarButton} ${currentView === Views.WEEK ? styles.toolbarbtn : ""}`}
              >
                Week
              </button>
              <button
                onClick={() => handleViewChange("month")}
                className={`${styles.toolbarButton} ${currentView === Views.MONTH ? styles.toolbarbtn : ""}`}
              >
                Month
              </button>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default MyCalendar;
