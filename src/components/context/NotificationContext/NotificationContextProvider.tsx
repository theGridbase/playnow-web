"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { notification } from "antd";

// Define the context type for Ant Design notifications
type NotificationContextType = {
  openNotification: (type: 'success' | 'info' | 'warning' | 'error', message: string, description?: string) => void;
};

// Default values for the context
const notificationContextDefaultValues: NotificationContextType = {
  openNotification: () => {},
};

const NotificationContext = createContext<NotificationContextType>(notificationContextDefaultValues);

// Custom hook to use the notification context
export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [api, contextHolder] = notification.useNotification();

  // Function to trigger the notification directly
  const openNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string, description?: string) => {
    api[type]({
      message,
      description,
      placement: "topRight", // Position of the notification
      duration: 3, // Duration in seconds
    });
  };

  const value = {
    openNotification,
  };

  return (
    <>
      {contextHolder} {/* Render the contextHolder to manage notifications */}
      <NotificationContext.Provider value={value}>
        {children}
      </NotificationContext.Provider>
    </>
  );
}
