import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; 
import 'chartjs-adapter-moment'; 

const TransactionGraph = ({ customerId, transactions }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    
    if (chartInstance) {
      chartInstance.destroy();
    }

   
    const filteredTransactions = transactions.filter(transaction => transaction.customer_id === parseInt(customerId));

    
    const data = {
      labels: filteredTransactions.map(transaction => transaction.date),
      datasets: [{
        label: 'Transaction Amount',
        data: filteredTransactions.map(transaction => transaction.amount),
        fill: false,
        borderColor: 'rgb(255, 255, 255)',
        tension: 0.1,
        borderWidth: 3
      }]
    };

    
    const options = {
        plugins: {
            legend: {
              labels: {
                font: {
                  family: 'Arial', 
                  size: 14 
                }
              }
            },
            tooltip: {
              titleFont: {
                family: 'Arial', 
                size: 16 
              },
              bodyFont: {
                family: 'Arial', 
                size: 14 
              }
            }},
      scales: {
        x: {
          type: 'time', 
          time: {
            unit: 'day', 
            tooltipFormat: 'll', 
          },
          title: {
            display: true,
            text: 'Transaction Date',
            font: {
                size: 18, 
                color: 'white',
                family: 'Arial'
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount',
            font: {
                size: 18, 
                color: 'white',
                family: 'Arial'
            }
          },
          
        }
      }
    };

    
    const newChartInstance = new Chart(chartRef.current, {
      type: 'line',
      data,
      options
    });

    setChartInstance(newChartInstance); 

    
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [customerId, transactions]);

  return (
    <div className='mt-8'>
      <h2 className='text-white text-center'>Transactions Graph</h2>
      <div className='w-75 m-auto'>
        <canvas ref={chartRef} />
      </div>
      
    </div>
  );
};

export default TransactionGraph;
