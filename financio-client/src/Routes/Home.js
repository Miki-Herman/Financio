import React from "react"
import Transactions from "../bricks/Transactions"
import Cashflow from "../bricks/Cashflow"
import SavingGoal from "../bricks/SavingGoal"

function Home() {

    return(
        <div> 
         <Transactions/>
         <div>
            <SavingGoal/>
            <Cashflow/>
         </div>
        </div>
        
    )
}

export default Home