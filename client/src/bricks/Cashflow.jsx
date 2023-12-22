import React from "react";
import Categories from "../mockData/category"
import Icon from '@mdi/react';
import { PureComponent } from "react";
import Stack from "react-bootstrap/Stack"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/Cashflow.css"

function Cashflow() {

    //<Stack direction="horizontal" gap={5}>
    //{Categories.map((item) => (
        //<div key={item.id}>
        //<p>{item.name}</p>
        //<Icon path={item.icon} color={item.color} size={1}></Icon>
        //</div>
    //))}
   //</Stack> 
   const Mock = [{
    Income: 3500,
    Groceries: 750,
    Transport: 200,
    Housing: 550,
    Health: 150
   }]

    return (
        <div className="Cashflow">
            <h1>Graph</h1>
        <BarChart
          name="Cashflow"
          width={300}
          height={400}
          data={Mock}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid/>

          <YAxis />
          <Tooltip />
          <Bar dataKey="Income" fill="#8884d8" />
          <Bar dataKey="Housing" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Transport" stackId="a" fill="red" />
          <Bar dataKey="Groceries" stackId="a" fill="gold" />
          <Bar dataKey="Health" stackId="a" fill="pink" />
        </BarChart>
      </div>
    )
}

export default Cashflow