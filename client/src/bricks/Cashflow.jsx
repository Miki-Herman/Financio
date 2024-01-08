import React , { useState, useEffect } from "react";
import "../css/Cashflow.css"
import ReactECharts from 'echarts-for-react';

function Cashflow() {


  const [dataGet, setDataGet] = useState([]) 

  useEffect(() => {
    fetchData('http://localhost:4000/graph/get').then((data) => {
        setDataGet(data.graph)
        console.log(data.graph)
        });
}, []);

const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Chyba při získávání dat');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Chyba při získávání dat:', error);
      return [];
    }
  };

  const option = { 
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
          {
              name: 'Category info',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
              },
              data: dataGet,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
          },
      ],
  };

    return (
        <div className="Cashflow">
            <h1>Graph</h1>
            <ReactECharts option={option} style={{ height: '400px' }} />
        </div>
    )
}

export default Cashflow

















