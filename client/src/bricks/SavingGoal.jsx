import React, {useState, useEffect} from "react";
import "../css/SavingGoal.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack'
import {Button, Modal, Form} from 'react-bootstrap'
import Icon from '@mdi/react';
import { mdiPlus, mdiSquareEditOutline, mdiTrashCanOutline} from '@mdi/js';
import toast, { Toaster } from 'react-hot-toast';



function SavingGoal() {

    const [loading, setLoading] = useState(true)  
    const [dataGet, setDataGet] = useState()
    const [showModal, setShowModal] = useState(false); 
    const [mode, setMode] = useState(null);
    const [amount, setAmount] = useState('');
    const [editId, setEditId] = useState('')


    useEffect(() => {
        fetchData('http://localhost:4000/savingGoal/get?userId=2').then((data) => {
            setDataGet(data)
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
          if (Array.isArray(responseData.userSavingGoal)) {
            const updatedData = responseData.userSavingGoal.map(({ id, goal, saved }) => ({ id, goal, saved }));
            const simplifiedResponse = updatedData.length > 0 ? updatedData[0] : {};
            setLoading(false) 
            return simplifiedResponse;
          } else {
            return {};
        }
        } catch (error) {
          console.error('Chyba při získávání dat:', error);
          setLoading(false)
          return [];
        }
      };

      const closeModal = () => {
        setShowModal(false);
        setAmount(0)
      };
      const openModal = () => {
        setShowModal(true);
      };

      const createNewPlan = async () => {
            try {
              const dToIn = {
                goal: amount,
                id: Math.random().toString(),
                userId: 2,
              };
        
              console.log(dToIn)
          
              const response = await fetch('http://localhost:4000/savingGoal/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dToIn),
              });
        
              console.log(dToIn)
          
              if (response.ok) {
                fetchData('http://localhost:4000/savingGoal/get?userId=2').then((data) => {
                    setDataGet(data)
                });
                closeModal();
                setMode(null);
                toast.success('Successfully added!')
              } else {
                toast.error("This didn't work.")
                throw new Error('Chyba při aktualizaci goalu');
              }
            } catch (error) {
                toast.error("This didn't work.")
              console.error('Chyba při aktualizaci goalu:', error);
            }
          
        
      };

      const updatePlan = async () => {
        try {
            const dToIn = {
              newGoal: amount,
              id: editId,
            };
        
            const response = await fetch('http://localhost:4000/savingGoal/edit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dToIn),
            });
      
            console.log(dToIn)
        
            if (response.ok) {
              fetchData('http://localhost:4000/savingGoal/get?userId=2').then((data) => {
                setDataGet(data)
              });
              closeModal();
              setMode(null);
              toast.success('Successfully changed!')
            } else {
              toast.error("This didn't work.");
              throw new Error('Chyba při aktualizaci goalu');
            }
          } catch (error) {
              toast.error("This didn't work.");
            console.error('Chyba při aktualizaci goalu:', error);
          }
        
      };

      const deleteItem = async (idToDelete) => {
        try {
          const url= `http://localhost:4000/savingGoal/delete?id=${idToDelete}`;
      
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          console.log(idToDelete)
      
          if (response.ok) {
            fetchData('http://localhost:4000/savingGoal/get?userId=2').then((data) => {
                setDataGet(data)
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


    return (
        <div className="SavingGoal">
            {loading ? (<></>) : (
            <>
                {dataGet.goal > 0 ? (<>
                    <Stack direction="horizontal">
                        <h1>Saving goal - {dataGet.goal} Kč</h1>
                        <Button variant="primary" className="p-2 ms-auto" onClick={() => {openModal(); setMode("edit"); setEditId(dataGet.id)}}><Icon path={mdiSquareEditOutline} size={1} style={{margin:"2px 2px"}}/></Button>
                        <Button variant="danger" className="p-2" style={{margin: "0 5px"}} onClick={() => deleteItem(dataGet.id)}><Icon path={mdiTrashCanOutline} size={1} style={{margin:"2px 2px"}}/></Button>
                    </Stack>
                    <ProgressBar animated now={(dataGet.saved / dataGet.goal) * 100} label={`${((dataGet.saved / dataGet.goal) * 100).toFixed(2)}%`}/>
                    <p style={{fontWeight: "bold"}}><span style={{color:"green"}}>Saved {dataGet.saved} Kč </span><span style={{fontWeight: "400"}}>| Remaining {dataGet.goal - dataGet.saved} Kč</span></p>
                </>) : (
                    <Stack direction="horizontal">
                        <h1>Saving goal - {dataGet.goal} Kč</h1>
                        <Button variant="success" className="p-2 ms-auto" onClick={() => {openModal(); setMode("add"); }}><Icon path={mdiPlus} size={1} style={{margin:"2px 2px"}}/></Button>
                    </Stack>
                )}

            </>)}
            <Modal show={showModal} onHide={() => { closeModal() }}>
            <Modal.Header>
                <Modal.Title>
                    {mode === "add" ? (<>Create new plan</>):(<>Edit saving plan</>)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Saving goal - Kč</Form.Label>
                        <Form.Control placeholer="Description" onChange={(e) => setAmount(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                {mode === "add" ? (
                    <Button variant="primary" onClick={createNewPlan}>Create</Button>
                ):(
                    <Button variant="primary" onClick={updatePlan}>Update</Button>
                )}
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default SavingGoal