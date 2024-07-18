import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './CustomerTable.module.css'; 

const CustomerTable = ({ customers, transactions, onSelectCustomer }) => {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [maxAmount, setMaxAmount] = useState(2550); 

    const handleCustomerChange = (customerId) => {
        setSelectedCustomer(customerId);
        onSelectCustomer(customerId); 
    };

    const handleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxAmount(value);
    };

    
    const getSelectedCustomerName = () => {
        if (selectedCustomer === '') {
            return 'Select Customer';
        } else {
            const selectedCustomerObj = customers.find(customer => customer.id === selectedCustomer);
            return selectedCustomerObj ? selectedCustomerObj.name : 'Select Customer';
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-between text-white mb-2 '>
                <div>
                    <label htmlFor="customerDropdown" className="form-label">Filter by Name:</label>
                    <Dropdown className="mb-2">
                        <Dropdown.Toggle variant="primary" id="dropdown-customers">
                            {getSelectedCustomerName()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleCustomerChange('')}>
                                All Customers
                            </Dropdown.Item>
                            {customers.map(customer => (
                                <Dropdown.Item
                                    key={customer.id}
                                    onClick={() => handleCustomerChange(customer.id)}
                                    className={style.hover_dropdown_item} 
                                >
                                    {customer.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="mt-3">
                    <label htmlFor="amountRange" className="form-label">Filter by Amount:</label>
                    <input
                        type="range"
                        className="form-range"
                        id="amountRange"
                        min="475"
                        max="2550"
                        step="25"
                        value={maxAmount}
                        onChange={handleAmountChange}
                    />
                    <div>Current Max Amount: {maxAmount}</div>
                </div>
            </div>


            <table className="table table-hover text-center">
                <thead className="table-info">
                    <tr>
                        <th>Customer Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions
                        .filter(transaction =>
                            (selectedCustomer === '' || transaction.customer_id === selectedCustomer) &&
                            transaction.amount <= maxAmount
                        )
                        .map(transaction => (
                            <tr key={transaction.id}>
                                <td>{customers.find(customer => customer.id === transaction.customer_id)?.name}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
