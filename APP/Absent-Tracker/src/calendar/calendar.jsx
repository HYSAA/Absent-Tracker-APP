import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import './customCalendar.css';


Modal.setAppElement('#root');

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (value) => {
    setSelectedDate(value);
    const eventForDate = events.find(event => event.date === value.toDateString());
    setEventText(eventForDate ? eventForDate.text : '');
    setModalIsOpen(true);
  };

  const handleSaveEvent = () => {
    setEvents(prevEvents => {
      const existingEventIndex = prevEvents.findIndex(event => event.date === selectedDate.toDateString());
      if (existingEventIndex > -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex].text = eventText;
        return updatedEvents;
      }
      return [...prevEvents, { date: selectedDate.toDateString(), text: eventText }];
    });
    setModalIsOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents(prevEvents => prevEvents.filter(event => event.date !== selectedDate.toDateString()));
    setModalIsOpen(false);
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        value={date}
        onChange={setDate}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Event Modal"
      >
        <h2>{selectedDate && selectedDate.toDateString()}</h2>
        <textarea
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
        <div>
          <button onClick={handleSaveEvent}>Save</button>
          <button onClick={handleDeleteEvent}>Delete</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default MyCalendar;
