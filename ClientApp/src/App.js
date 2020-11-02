import React from 'react';
import AppointmentTable from './components/AppointmentTable';
import Modal from 'react-modal';

import './styles.css'

function App() {
  return (
    <div className="background">
      <AppointmentTable />
      <Modal></Modal>
    </div>
  );
}

export default App;