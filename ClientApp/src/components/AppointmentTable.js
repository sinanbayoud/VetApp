import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import '../styles.css';

function AppointmentTable() {
  const [tableData, setTableData] = useState([]);
  //display a "loading" phrase if no table data is fetched
  const [loadingState, setLoadingState] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, onChange] = useState(new Date());

  var subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#0';
  }

  function closeModal() {
    setIsOpen(false);
  }

  /**
   * Async function that will fetch the data for the appointment table, and
   * set the states of both the "loading" state and table data state
   *
   * @alias namespace~doStuff
   */
  async function getData() {
    const response = await fetch('data');
    const data = await response.json();
    setTableData(data);
    setLoadingState(false);
  }

  useEffect(() => {
    getData();
  }, []);

  /**
   * Confirms an appointment, removes its row from the table based on a id param,
   * and sends a success toast with the pet names 
   *
   * @param id: the appointment id for the confirmed appointment
   * @param name: pet name to display on the toast
   */
  function confirm(id, name) {
    setTableData(tableData.filter(tableData => tableData.appointmentId !== id));
    toast.success("Confirmed Appointment For " + name);
  }

  function reschedule(apptTime) {
    openModal();
  }

  function newDateSubmitted(){
    toast.warning("Rescheduled Appointment Succesfully");
  }

  function renderModal() {
    const customStyles = {
      content: {
        width: '40%',
        height: '75%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'left'
      }
    };

    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Rescheduling Modal"
        >
          <button className="close" onClick={closeModal}>&times;</button>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Choose a Date:</h2>
          <div>Enter the alternative time:</div>
          <div>
            <DateTimePicker
              onChange={onChange}
              value={value}
              disableClock={true}
            />
          </div>

          <form>
            <button className="submit-button" onClick={newDateSubmitted}>Submit</button>
          </form>
        </Modal>
      </div>
    )
  }

  /**
   * Renders the appointments table
   *
   * @param appts: json object of all appointments
   */
  function renderAppointmentsTable(appts) {
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
      <table className='table' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Pet Parent</th>
            <th>Pet Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Appointment Type</th>
            <th>Requested Time</th>
            <th>Reschedule Appointment</th>
            <th>Confirm Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appts.map(appt =>
            <tr key={appt.appointmentId}>
              {/* <tr key={appt.appointmentId} onClick={() => alert(appt.animalName)}> */}
              <td>{appt.userFirstName} {appt.userLastName}</td>
              <td>{appt.animalName}</td>
              <td>{appt.species}</td>
              <td>{appt.breed}</td>
              <td>{appt.appointmentType}</td>
              <td>{new Date(appt.requestedDateTime).toLocaleDateString("en-US", options)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => { reschedule(appt.appointmentId, appt.animalName) }}>Reschedule</button>
              </td>
              <td>
                <button className="btn btn-success" onClick={() => { confirm(appt.appointmentId, appt.animalName, appt.requestedDateTime) }}>Confirm</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  let contents = loadingState
    ? <p><em>Loading...</em></p>
    : renderAppointmentsTable(tableData);

  let modalRender = renderModal();

  return (
    <div className="hello-world">
      <h1>Welcome Vet!</h1>
      <h3>Here are your appointments to confirm or reschedule:</h3>
      {contents}
      {modalRender}
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default AppointmentTable;