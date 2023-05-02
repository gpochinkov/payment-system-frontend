import './Merchants.css';
import { React, useState, useEffect, useContext } from 'react';
import axios from '../util/axios';
import AuthContext from '../util/AuthProvider';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: auth.accessToken
    };

    axios
      .get('/ui/transactions', {
        headers: headers
      })
      .then((response) => {
        if (!response.status === 200) {
          throw new Error('Network response was not ok');
        }
        console.log(response);

        setTransactions(response?.data?.paymentTransactions);
      })
      .catch((error) => {
        console.log('test error');
        console.log(error);
      });
  }, [auth.accessToken]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UUID</th>
            <th>Type</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Merchant ID</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{transaction.id}</td>
              <td>{transaction.uuid}</td>
              <td>{transaction.type}</td>
              <td>{transaction.email}</td>
              <td>{transaction.phone}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
              <td>{transaction.merchantId}</td>
              <td>{transaction.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Transactions;
