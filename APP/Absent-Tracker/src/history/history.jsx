// import React, { useEffect, useState } from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// function History() {
//   const [events, setEvents] = useState([]);
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
//     setEvents(storedEvents);
//   }, []);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             History
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {events.length === 0 ? (
//               <p>No events found.</p>
//             ) : (
//               <ul>
//                 {events.map((event, index) => (
//                   <li key={index}>
//                     <strong>{event.date}</strong>: {event.text}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </Typography>
//         </Box>
//       </Modal>
//       <Button onClick={handleOpenModal} color="inherit">History</Button>
//     </div>
//   );
// }

// export default History;
