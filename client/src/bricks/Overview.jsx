import React, {useState, useEffect} from "react";
import "../css/Overview.css"
import { Button, Modal, Table } from "react-bootstrap" 

function Overview () {

    const [dataGet, setDataGet] = useState()
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        fetchData('http://localhost:4000/overview/list').then((data) => {
            setDataGet(data)
            console.log(data)
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
            setLoading(false)
            throw new Error('Chyba při získávání dat');
          }
    
          const responseData = await response.json();
          setLoading(false)
          return responseData;
        } catch (error) {
          console.error('Chyba při získávání dat:', error);
          setLoading(false)
          return [];
        }
      };

      const openMonth = (month) => {
        setSelectedMonth(month);
        openModal()
      };

      const closeModal = () => {
        setShowModal(false);
      };

      const openModal = () => {
        setShowModal(true);
      };

      const calculateTotal = (monthData) => {
        let totalIncome = 0;
        let totalCosts = 0;
    
        monthData.forEach((item) => {
          if (item.category === 'Income') {
            totalIncome += item.amount;
          } else {
            totalCosts += item.amount;
          }
        });
    
        return { totalIncome, totalCosts };
      };

      const totals = selectedMonth ? calculateTotal(dataGet[selectedMonth]) : { totalIncome: 0, totalCosts: 0 };

    return(
        <div className="Overview">
            {loading ? (null) : (
                <div>
                    <h1>Overview</h1>
                    <ul className="list">
                        {Object.keys(dataGet).map((month, index) => (
                            <li key={index}>
                                <Button variant="light" onClick={() => openMonth(month)}>
                                    {month.replace(/([a-zA-Z])(\d)/, "$1 $2")}
                                </Button>
                            </li>
                        ))}
                    </ul>
                    {selectedMonth && (
                        <Modal show={showModal} onHide={() => { closeModal() }} size="xl">
                            <Modal.Header>
                                <Modal.Title>
                                    <h1 className="modalh1">Overview {selectedMonth.replace(/([a-zA-Z])(\d)/, "$1 $2")}</h1>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table striped hover>
                                    <thead>
                                        <tr className="tHead">
                                            <th><h4>Amount</h4></th>
                                            <th><h4>Category</h4></th>
                                            <th><h4>Description</h4></th>
                                            <th><h4>Date</h4></th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        {dataGet[selectedMonth].map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                                <td style={{ color: item.category === "Income" ? "green" : "red"}}>
                                                    <span>{item.category === "Income" ? "+ " : "- "}</span>
                                                    {item.amount.toLocaleString('cs-CZ')}
                                                </td>
                                                <td>{item.category}</td>
                                                <td>{item.description}</td>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody> 
                                </Table>
                                <h3>
                                    <span style={{color: "green"}}>++ {totals.totalIncome.toLocaleString('cs-CZ')} Kč</span> | <span style={{color: "red"}}>-- {totals.totalCosts.toLocaleString('cs-CZ')} Kč</span>
                                </h3>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
        
                    )}
                </div>        
            )}    
        </div>
    )
}

export default Overview