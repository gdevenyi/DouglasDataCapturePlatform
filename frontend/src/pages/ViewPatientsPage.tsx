import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Layout from '@/components/Layout';
import Patient from '@/models/Patient';

interface HappinessQuestionnaire {
  score: number
}

const ViewPatientsPage = () => {
  const [modalPatientId, setModalPatientId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<HappinessQuestionnaire[]>();
  const [patients, setPatients] = useState<Patient[]>();
  const [updateRequired, setUpdateRequired] = useState(false);

  const getPatients = async () => {
    const response = await fetch('/api/patient');
    if (!response.ok) {
      console.error(response.status, response.statusText);
      return;
    }
    return await response.json();
  };

  const deletePatient = async (id: string) => {
    const response = await fetch(`/api/patient/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error(response.status, response.statusText);
      return;
    }
    setUpdateRequired(true);
  };

  const updatePatients = () =>
    getPatients().then((data) => {
      setPatients(data);
      setUpdateRequired(false);
    });
  
  useEffect(() => {
    fetch(`/api/instrument/happiness-scale/${modalPatientId}`)
      .then(data => data.json())
      .then(data => setModalData(data))
  }, [modalPatientId]);

  useEffect(() => {
    updatePatients();
    const intervalId = setInterval(updatePatients, 5000);
    return () => clearInterval(intervalId);
  }, [updateRequired]);

  const handleRowClick = (patientId: string | null) => {
    setModalPatientId(patientId)
  };

  return (
    <Layout>
      <h1 className="text-center py-4">View Patients</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Sex</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient, i) => (
            <tr className="patients-table-row" key={i} onClick={() => handleRowClick(patient._id || null)}>
              <td>{patient._id?.slice(0, 6) || 'NA'}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.dateOfBirth.toString()}</td>
              <td>{patient.sex}</td>
              <td>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => patient._id && deletePatient(patient._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal centered size="lg" show={modalPatientId !== null}>
        <Modal.Header>
          <Modal.Title>Happiness Scores for Patient {modalPatientId?.slice(0, 6)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{ JSON.stringify(modalData) }</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">Delete</Button>{' '}
          <Button onClick={() => setModalPatientId(null)} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default ViewPatientsPage;
