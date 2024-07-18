import React, { useEffect, useState } from 'react';
import CustomerTable from './Components/CustomerTable/CustomerTable.jsx';
import TransactionGraph from './Components/TransactionGraph/TransactionGraph.jsx';
import './App.css'
const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        customers: [
          { id: 1, name: 'Ahmed Ali' },
          { id: 2, name: 'Aya Elsayed' },
          { id: 3, name: 'Mina Adel' },
          { id: 4, name: 'Sarah Reda' },
          { id: 5, name: 'Mohamed Sayed' }
        ],
        transactions: [
          { id: 1, customer_id: 1, date: '2022-01-01', amount: 1000 },
          { id: 2, customer_id: 1, date: '2022-01-02', amount: 2000 },
          { id: 3, customer_id: 2, date: '2022-01-01', amount: 550 },
          { id: 4, customer_id: 3, date: '2022-01-01', amount: 500 },
          { id: 5, customer_id: 2, date: '2022-01-02', amount: 1300 },
          { id: 6, customer_id: 4, date: '2022-01-01', amount: 750 },
          { id: 7, customer_id: 3, date: '2022-01-02', amount: 1250 },
          { id: 8, customer_id: 5, date: '2022-01-01', amount: 2500 },
          { id: 9, customer_id: 5, date: '2022-01-02', amount: 875 }
        ]
      };

      setCustomers(data.customers);
      setTransactions(data.transactions);
      setFilteredTransactions(data.transactions); 
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    if (selectedCustomer) {
      const filtered = transactions.filter(transaction => transaction.customer_id === parseInt(selectedCustomer));
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); 
    }
  }, [selectedCustomer, transactions]);

  return (
    <div className='container pt-5'>
      <h1 className='text-center text-white'>Customer Transactions</h1>
      <CustomerTable
        customers={customers}
        transactions={filteredTransactions} 
        onSelectCustomer={setSelectedCustomer}
      />
      {selectedCustomer && (
        <TransactionGraph
          customerId={selectedCustomer}
          transactions={filteredTransactions} 
        />
      )}
    </div>
  );
};

export default App;
