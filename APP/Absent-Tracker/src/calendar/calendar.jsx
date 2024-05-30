import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import './customCalendar.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '300px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    }
  }, [events]);

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
      const newEvent = { date: selectedDate.toDateString(), text: eventText };
      return [...prevEvents, newEvent];
    });
    setModalIsOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents(prevEvents => {
      const filteredEvents = prevEvents.filter(event => event.date !== selectedDate.toDateString());
      return filteredEvents;
    });
    setModalIsOpen(false);
  };

  const eventsForSelectedDate = events.filter(event => event.date === selectedDate?.toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      if (events.some(event => event.date === dateString)) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        value={date}
        onChange={setDate}
        tileClassName={tileClassName}
      />
      <button onClick={() => setHistoryModalIsOpen(true)}>Show History</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Event Modal"
      >
        <h2>{selectedDate && selectedDate.toDateString()}</h2>
        <textarea
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          style={{ width: '100%', height: '100px' }}
        />
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSaveEvent}>Save</button>
          <button onClick={handleDeleteEvent}>Delete</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
        {eventsForSelectedDate.length > 0 && (
          <div style={{ marginTop: '20px', width: '100%' }}>
            <h3>Absent ka because???</h3>
            <ul>
              {eventsForSelectedDate.map((event, index) => (
                <li key={index}>{event.text}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={historyModalIsOpen}
        onRequestClose={() => setHistoryModalIsOpen(false)}
        style={customStyles}
        contentLabel="History Modal"
      >
        <h2>Rason sa absent bi</h2>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.date}: {event.text}</li>
            ))}
          </ul>
        </div>
        <button onClick={() => setHistoryModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default MyCalendar;
