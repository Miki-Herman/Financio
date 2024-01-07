import React, {useState, useEffect} from "react"
import Icon from '@mdi/react';
import Categories from '../mockData/category'


function Category(props) {

      
    
      const targetCategory = Categories.find(category => category.name === props.category);
      const categoryIcon = targetCategory ? targetCategory.icon : null;
      const color2 = targetCategory ? targetCategory.color : null;
    

return(
    <div>
    <Icon path={categoryIcon} size={1} color={color2}/> <span style={{color: color2}}>{targetCategory.name}</span>
    </div>
)
}

export default Category;
