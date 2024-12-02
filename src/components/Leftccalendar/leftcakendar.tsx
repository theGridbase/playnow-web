"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "../../styles/components/leftcalendar.module.scss"
import Icon from '@/components/ui/Icon/Icon';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className={styles.calendarContainer}>
      
      
      <Calendar
        onChange={onChange}
        value={date}
        nextLabel={<span>&#8250;</span>}  // Next month
        prevLabel={<span>&#8249;</span>}  // Previous month
        navigationLabel={({ date }) => (
          <span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        )}
        className={styles.customCalendar}
      />
      
      <div className={styles.eventList}>
      <div className={styles.eventDay}>
         <div className={styles.mainWrapper}> <span className={styles.eventDate}>TOMORROW </span><span className={styles.date}>2/27/2021</span> <span className={styles.weatherdegree}>55º/45º</span> <Icon size='16' name='sun.svg'/></div>
          <div className={styles.groundtext}>Gorgie Football Ground</div>
          <div className={styles.eventItem}>
            <span className={styles.time}> <Icon  size='12' name='dot.svg'/> 8:30 - 9:00 AM</span>
            <span className={styles.eventDescription}>Tennis Playground</span>
          </div>
        </div>
        <div className={styles.eventDay}>
         <div className={styles.mainWrapper}> <span className={styles.eventDate}>TOMORROW </span><span className={styles.date}>2/27/2021</span> <span className={styles.weatherdegree}>55º/45º</span> <Icon size='16' name='sun.svg'/></div>
          <div className={styles.eventItem}>
            <span className={styles.time}> <Icon  size='12' name='dot.svg'/> 8:30 - 9:00 AM</span>
            <span className={styles.eventDescription}>Tennis Playground</span>
          </div>
        </div>

        <div className={styles.eventDay}>
         <div className={styles.mainWrapper}> <span className={styles.eventDate}>TOMORROW </span><span className={styles.date}>2/27/2021</span> <span className={styles.weatherdegree}>55º/45º</span> <Icon size='16' name='sun.svg'/></div>
          <div className={styles.eventItem}>
            <span className={styles.time}> <Icon  size='12' name='dot.svg'/> 8:30 - 9:00 AM</span>
            <span className={styles.eventDescription}>Tennis Playground</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
