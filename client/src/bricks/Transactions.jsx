import React, { useState } from "react"
import Category from "./categories"
import Categories from "../mockData/category"
import "../css/Transactions.css"
import Icon from '@mdi/react';
import { mdiCreditCardPlusOutline, mdiSquareEditOutline, mdiTrashCanOutline } from '@mdi/js';
import {Table, Button, Modal, Form, Stack} from "react-bootstrap"


function Transactions() {

    const [transactionData, setTransactionData] = useState([
        {
            "id": "1",
            "amount": 250,
            "category": "Transport",
            "description": "Washing my car",
            "date": "2023-11-27T18:00:00Z"
        },
        {
            "id": "2",
            "amount": 500,
            "category": "Groceries",
            "description": "Groceries",
            "date": "2023-11-27T18:00:00Z"
        },
        {
            "id": "3",
            "amount": 1500,
            "category": "Housing",
            "description": "Rent",
            "date": "2023-11-27T18:00:00Z"
        },
        {
            "id": "4",
            "amount": 10000,
            "category": "Income",
            "description": "Income",
            "date": "2023-11-28T18:00:00Z"
        },
    ])
    const [showEditModal, setShowEditModal] = useState(false); 
    const closeEditModal = () => setShowEditModal(false);
    const openEditModal = (item) => {
        setEditTransaction(item); 
        setShowEditModal(true); 
    };

    const [mode, setMode] = useState(null)
    
    const [editAmount, setEditAmount] = useState();
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [editTransaction, setEditTransaction] = useState({
        amount: 0,
        category: "",
        description: "",
    });

    const updateTransaction = () => {
        const updatedTransactions = transactionData.map((item) => {
            if (item.id === editTransaction.id) {
                return {
                    ...item,
                    amount: editAmount || item.amount,
                    category: editCategory || item.category,
                    description: editDescription || item.description
                };
            }
            return item;
        });

        setTransactionData(updatedTransactions); 
        setShowEditModal(false);
    }

    const deleteItem = (id) => {
        const updatedTransactions = transactionData.filter(transaction => transaction.id !== id);
        setTransactionData(updatedTransactions);
    }

    const freeMoney = (transactionData) => {
        const result = transactionData.reduce((now, item) => {
        return item.category === "Income" ? now + item.amount : now - item.amount;
        }, 0)

        return result
    }
    const totalAmount = freeMoney(transactionData)

    const createTransaction = async () => {
        try {
          const dToIn = {
            amount: editAmount,
            category: editCategory,
            description: editDescription,
            id: 1,
            userId: 2,
            date: new Date()
          };
      
          const response = await fetch('http://localhost:4000/transaction/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dToIn),
          });

          console.log(dToIn)
      
          if (response.ok) {
            closeEditModal();
            setMode(null);
          } else {
            throw new Error('Chyba při aktualizaci transakce');
          }
        } catch (error) {
          console.error('Chyba při aktualizaci transakce:', error);
        }
      };

    return(
        <div className="Transactions">
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
                        <th className="Actions"><Button variant="success" onClick={() => {openEditModal(); setMode("add")}}><Icon path={mdiCreditCardPlusOutline} size={1} /></Button ></th>
                    </tr>
                {transactionData.map((item) => (
                    <tr key={item.id}>
                        {item.category === "Income" ? (<td style={{color: "green"}}>+{item.amount} Kč</td>) : (<td style={{color: "red"}}>- {item.amount} Kč</td>) }
                        <td><Category category={item.category}/></td>
                        <td>{item.description}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td className="Actions">
                            <Button className="Button" variant="primary" onClick={() => {openEditModal(item); setMode("edit")}}><Icon path={mdiSquareEditOutline} size={1} /></Button>
                            <Button className="Button" variant="danger" onClick={() => deleteItem(item.id)}><Icon path={mdiTrashCanOutline} size={1} /></Button>
                        </td>
                    </tr>
                ))}
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
                        {Categories.map((item) => (
                                <option value={item.name}> {item.name} </option>
                            ))}
                        </Form.Select>
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholer="Description" onChange={(e) => setEditDescription(e.target.value)}></Form.Control>
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
    )
}

export default Transactions