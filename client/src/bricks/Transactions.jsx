import React, { useState, useEffect } from "react"
import Category from "./categories"
import "../css/Transactions.css"
import Icon from '@mdi/react';
import { mdiCreditCardPlusOutline, mdiSquareEditOutline, mdiTrashCanOutline} from '@mdi/js';
import {Table, Button, Modal, Form, Stack} from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import * as mdiIcons from "@mdi/js";


const Transactions = () => {
  const [transactionData, setTransactionData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [mode, setMode] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('')
  const [selectedDate, setSelectedDate] = useState('');
  const [editId, setEditId] = useState('')
  const [editTransaction, setEditTransaction] = useState({
    amount: 0,
    category: '',
    description: '',
    id: '',
    date: ''
  });

  useEffect(() => {
    fetchData('http://localhost:4000/transaction/list?userId=2').then((data) => {
      setTransactionData(data.data);
      console.log(data.data)
    });

    fetchCategories('http://localhost:4000/category/list').then((categories) => {
      setCategoryData(categories);
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

  const fetchCategories = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Chyba při získávání kategorií');
      }

      const responseData = await response.json();
      return responseData.types;
    } catch (error) {
      console.error('Chyba při získávání kategorií:', error);
      return [];
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setMode(null);
    
  };

  const openEditModal = (item) => {
    setEditTransaction(item);
    setShowEditModal(true);
    setSelectedDate(null)
    
  };


  const deleteItem = async (idToDelete) => {
    try {
      const url= `http://localhost:4000/transaction/delete?id=${idToDelete}`;
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(idToDelete)
  
      if (response.ok) {
        fetchData('http://localhost:4000/transaction/list?userId=2').then((data) => {
          setTransactionData(data.data);
          console.log(data.data)
        });
          toast.success('Successfully deleted!')
      } else {
        toast.error("This didn't work.")
        throw new Error('Chyba při mazání transakce');
      }
    } catch (error) {
        toast.error("This didn't work.")
      console.error('Chyba při mazání transakce:', error);
    }
  };
 
  const freeMoney = () => { 
    if (!transactionData || transactionData.length === 0) {
      return 0; // Pokud transactionData není definována nebo je prázdná, vrátíme 0
    }
    const result = transactionData.reduce((now, item) => {
      return item.category === 'Income' ? now + item.amount : now - item.amount;
    }, 0);

    return result;
  };

  const totalAmount = freeMoney();

  const createTransaction = async () => {

    
    try {
      const dToIn = {
        amount: editAmount,
        category: editCategory,
        description: editDescription,
        id: Math.random().toString(),
        userId: 2,
        date: selectedDate
      };

      console.log(dToIn)
  
      const response = await fetch('http://localhost:4000/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dToIn),
      });

      console.log(dToIn)
  
      if (response.ok) {
        fetchData('http://localhost:4000/transaction/list?userId=2').then((data) => {
          setTransactionData(data.data);
          console.log(data.data)
        });
        closeEditModal();
        setMode(null);
        toast.success('Successfully added!')
      } else {
        toast.error("This didn't work.")
        throw new Error('Chyba při aktualizaci transakce');
      }
    } catch (error) {
        toast.error("This didn't work.")
      console.error('Chyba při aktualizaci transakce:', error);
    }
  };

  const updateTransaction = async () => {
    try {
      const dToIn = {
        amount: editAmount,
        category: editCategory,
        description: editDescription,
        id: editId,
        userId: 2,
        date: selectedDate
      };
  
      const response = await fetch('http://localhost:4000/transaction/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dToIn),
      });

      console.log(dToIn)
  
      if (response.ok) {
        fetchData('http://localhost:4000/transaction/list?userId=2').then((data) => {
          setTransactionData(data.data);
          console.log(data.data)
        });
        closeEditModal();
        setMode(null);
        toast.success('Successfully changed!')
      } else {
        toast.error("This didn't work.");
        throw new Error('Chyba při aktualizaci transakce');
      }
    } catch (error) {
        toast.error("This didn't work.");
      console.error('Chyba při aktualizaci transakce:', error);
    }
  }

  

  const handleDateChange = (e) => {
    const selectedValue = e.target.value
    const selectedISODate = `${selectedValue}T00:00:00.000Z`
    setSelectedDate(selectedISODate);
  };


  return (
    <div className="Transactions">
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <Stack direction="horizontal">
                <h1>This month</h1>
                <h2 className="p-2 ms-auto">Useable finances: <span style={{color: totalAmount >= 0 ? ("green") : ("red")}}>{totalAmount} Kč</span></h2>
            </Stack>
            <Table className="Table">
                <thead>
                    <tr className="tHead">
                        <th><h4>Amount</h4></th>
                        <th><h4>Category</h4></th>
                        <th><h4>Description</h4></th>
                        <th><h4>Date</h4></th>
                        <th className="Actions"><Button variant="success" onClick={() => {openEditModal(); setMode("add"); }}><Icon path={mdiCreditCardPlusOutline} size={1} /></Button ></th>
                    </tr>
                    {transactionData &&
          transactionData.map((item) => {
            const targetCategory = categoryData.find(
              (category) => category.name === item.category
            );
            const categoryIconName = targetCategory
            ? targetCategory.icon
            : null;

                          
                          const IconComponent = categoryIconName
                          ? mdiIcons[categoryIconName] 
                          : null;

                          const categoryColor = targetCategory ? targetCategory.color : null;

            return (
              <tr key={item.id}>
                {item.category === "Income" ? (
                  <td style={{ color: "green" }}>+{item.amount} Kč</td>
                ) : (
                  <td style={{ color: "red" }}>- {item.amount} Kč</td>
                )}
                  <td>
                    {IconComponent && categoryColor && (
                      <><Icon path={IconComponent} size={1} color={categoryColor} /> {item.category}</>
                    )}
                  </td>
                <td>{item.description}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td className="Actions">
                            <Button className="Button" variant="primary" onClick={() => {openEditModal(item); setMode("edit"); setEditId(item.id)}}><Icon path={mdiSquareEditOutline} size={1} /></Button>
                            <Button className="Button" variant="danger" onClick={() => deleteItem(item.id)}><Icon path={mdiTrashCanOutline} size={1} /></Button>
                        </td>
              </tr>
            );
          })}
                </thead>
            </Table>
        

        <Modal show={showEditModal} onHide={() => { closeEditModal(); setMode(null); }}>
            <Modal.Header>
                <Modal.Title>
                    {mode === "add" ? (<>Add new transaction</>):(<>Edit transaction</>)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Amount - Kč</Form.Label>
                        <Form.Control placeholer="Description" onChange={(e) => setEditAmount(e.target.value)}></Form.Control>
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={(e) => setEditCategory(e.target.value)}>
                            <option />
                        {categoryData.map((item) => (
                                <option value={item.name}> {item.name} </option>
                        ))}
                        </Form.Select>
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholer="Description" onChange={(e) => setEditDescription(e.target.value)}></Form.Control>
                        <Form.Label>Date</Form.Label>
                        <input type="date" className="datum" onChange={handleDateChange}></input>
                    </Form.Group>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeEditModal}>Cancel</Button>
                {mode === "add" ? (
                    <Button variant="primary" onClick={createTransaction}>Add</Button>
                ):(
                    <Button variant="primary" onClick={updateTransaction}>Update</Button>
                )}
            </Modal.Footer>
        </Modal>
        </div>
  );
};

export default Transactions;
