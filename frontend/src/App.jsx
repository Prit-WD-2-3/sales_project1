import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';


import './App.css'

function App() {
  const [sales, setSales] = useState([]);
  const[summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    top_product: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/sales').then(res => setSales(res.data))
    .catch(err => console.log(err));

    axios.get('http://localhost:3000/summary').then(res => setSummary(res.data))
    .catch(err => console.log(err));
  },[]);


  return (
    <div className="App">
    <header className="App-header">
      <h1>Sales Dashboard</h1>
    </header>
    
    <main>
      <section className="summary-section">
        <h2>Sales Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Orders</h3>
            <p>{summary.totalOrders}</p>
          </div>
          <div className="summary-card">
            <h3>Total Revenue</h3>
            <p>₹{summary.totalRevenue}</p>
          </div>
          <div className="summary-card">
            <h3>Top Product</h3>
            <p>{summary.top_product}</p>
          </div>
        </div>
      </section>
      </main>


      <h3>Sales Data</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
