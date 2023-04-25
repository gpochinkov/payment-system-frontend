import './Merchants.css';
import React, { useState, useEffect } from 'react';
import MerchantEditModal from './MerchantEditModal';

function Merchants() {

    const [modalShow, setModalShow] = React.useState(false);

    const [rows, setRows] = useState([
        {id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555'},
        {id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '555-555-5555'},
        {id: 3, name: 'Bob Johnson', email: 'bjohnson@example.com', phone: '555-555-5555'},
        {id: 4, name: 'Alice Williams', email: 'awilliams@example.com', phone: '555-555-5555'},
        {id: 5, name: 'Tom Brown', email: 'tbrown@example.com', phone: '555-555-5555'}
    ]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setPosts(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);


  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'} >
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
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

    </>
  );
}

export default Merchants;