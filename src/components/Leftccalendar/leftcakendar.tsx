"use client";

import React, { useState } from "react";
import styles from "../../styles/components/leftcalendar.module.scss";
import Icon from "@/components/ui/Icon/Icon";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";

const CustomCalendar = () => {
  const [date, setDate] = useState<Dayjs | undefined>();

  const onChange = (newDate: Dayjs) => {
    setDate(newDate);
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        fullscreen={false}
        mode="month"
        value={date}
        onChange={onChange}
        className={styles.calender}
        headerRender={({ value, onChange }) => {
          const monthName = value.format("MMMM YYYY"); // Format month and year
          const goToPrevious = () => {
            const prev = value.clone().subtract(1, "month");
            onChange(prev);
          };
          const goToNext = () => {
            const next = value.clone().add(1, "month");
            onChange(next);
          };

          return (
            <div className={styles.calendarHeader}>
              <div className={styles.monthName}>{monthName}</div>
              <div className={styles.navigation}>
                <button onClick={goToPrevious} className={styles.navButton}>
                  <Icon name="prev.svg" size="24" fill="#ffffff" />
                </button>
                <button onClick={goToNext} className={styles.navButton}>
                  <Icon name="next.svg" size="24" fill="#ffffff"  />
                </button>
              </div>
            </div>
          );
        }}
      />

      <div className={styles.eventList}>
        <div className={styles.eventDay}>
          <div className={styles.mainWrapper}>
            <span className={styles.eventDate}>TOMORROW </span>
            <span className={styles.date}>2/27/2021</span>
            <span className={styles.weatherdegree}>55º/45º</span>
            <Icon size="16" name="sun.svg" />
          </div>
          <div className={styles.groundtext}>Gorgie Football Ground</div>
          <div className={styles.eventItem}>
            <span className={styles.time}>
              <Icon size="12" name="dot.svg" /> 8:30 - 9:00 AM
            </span>
            <span className={styles.eventDescription}>Tennis Playground</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
