import React from "react";
import "../css/SavingGoal.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'



function SavingGoal() {

    const now = 60

    return (
        <div className="SavingGoal">
            <Stack direction="horizontal">
            <h1 >Saving goal</h1>
            <Button variant="primary" className="p-2 ms-auto">Change saving plan</Button>
            </Stack>
            <ProgressBar animated now={now} label={`${now}%`}/>
            <p>12 000 saved, 8 000 remaining</p>
        </div>
    )
}

export default SavingGoal