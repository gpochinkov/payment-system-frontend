import './Merchants.css';
import {React, useState, useEffect, useContext } from 'react';
import MerchantEditModal from './MerchantEditModal';
import axios from '../util/axios';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../util/AuthProvider';

function Merchants() {

  const [modalShow, setModalShow] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth.accessToken
      }
  
      axios.get('/ui/merchants', {
        headers: headers
      })
      .then(response => {
        if (!response.status == 200) {
          throw new Error('Network response was not ok');
        }
        setMerchants(response?.data?.merchants);
        // console.log(response?.data?.merchants);
        console.log("Successful test");
      })
      .catch(error => {
        console.log("test error");
        console.log(error);
      });
  }, []);
  


  const handleDeleteRow = (index) => {
    const newMerchants = [...merchants];
    newMerchants.splice(index, 1);
    setMerchants(newMerchants);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbXSwiaWF0IjoxNjgyODAzOTM3LCJleHAiOjE2ODM2NjYwMDB9.f-NsKEkc7dCCyAXTbXz-zJ8Mbb_1MUQxbX5Wk7Skl05kzZ4RyDE84NaJJO6rxMfI'
    }

    axios.delete('/ui/merchants/' + index, {
      headers: headers
    })
    .then(response => {
      if (response.status == 400) {
        setSmShow(true);
      }

      // if (!response.status == 200) {
      //   throw new Error('Network response was not ok');
      // }
      setMerchants(response?.data?.merchants);
      // console.log(response?.data?.merchants);
      console.log("Successful test");
    })
    .catch(error => {
      console.log(error);
    });

  };

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Description</th>
          <th>Transaction Sum</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {merchants.map((merchant, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'} >
            <td>{merchant.id}</td>
            <td>{merchant.username}</td>
            <td>{merchant.email}</td>
            <td>{merchant.description}</td>
            <td>{merchant.totalTransactionSum}</td>
            <td>{merchant.status}</td>
            <td>
              <button className="edit" onClick={() => setModalShow(true)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteRow(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <MerchantEditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
    />

    <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Small Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>alabala portokala</Modal.Body>
    </Modal>

    </>
  );
}

export default Merchants;