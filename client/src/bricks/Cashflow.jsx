import React from "react";
import Categories from "../mockData/category"
import Icon from '@mdi/react';
import Stack from "react-bootstrap/Stack"

function Cashflow() {

    return (<div>
         <h1>Cashflow</h1>
         <Stack direction="horizontal" gap={5}>
            {Categories.map((item) => (
                <div key={item.id}>
                <p>{item.name}</p>
                <Icon path={item.icon} color={item.color} size={1}></Icon>
                </div>
            ))}
           </Stack> 
            </div>
    )
}

export default Cashflow