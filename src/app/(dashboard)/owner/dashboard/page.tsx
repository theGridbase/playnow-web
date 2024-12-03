import Header from '@/components/Header/Header'
import Leftcalendar from '@/components/Leftccalendar/leftcakendar'
import Rightccalendar from '@/components/RightCalendar/rightcalendar'
import React from 'react'

function dashboard() {
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Optional: ensures spacing between calendars
        alignItems: 'flex-start', // Aligns both calendars to the top
        width: '100%', // Full width of the parent container
      }}>
        <div style={{  marginRight: '20px' }}> {/* Optional margin between the calendars */}
          <Leftcalendar />
        </div>
        <div style={{ flex: 1 }}> {/* Ensure Rightcalendar takes up the remaining space */}
          <Rightccalendar style={{
            backgroundColor: '#E73725', // Customize color as needed
            borderRadius: '0px 6px 0px 0px', // Adjust border-radius
            padding: '20px', // Adjust padding as needed
          }} />
        </div>
      </div>
    </div>
  )
}

export default dashboard
