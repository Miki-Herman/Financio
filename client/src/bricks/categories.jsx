import React from "react"
import Icon from '@mdi/react';
import Categories from '../mockData/category'



function Category(props) {



const targetCategory = Categories.find(category => category.name === props.category)
const categoryIcon = targetCategory ? targetCategory.icon : null
const color = targetCategory.color

return(
    <div>
    <Icon path={categoryIcon} size={1} color={color}/> <span style={{color: color}}>{targetCategory.name}</span>
    </div>
)
}



export default Category