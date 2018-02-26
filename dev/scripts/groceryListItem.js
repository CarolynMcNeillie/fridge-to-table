import React from 'react';

const GroceryListItem = (props) => {

  return(

      <li>
        <button onClick={() => props.removeGroceryItem(props.data.key)}>×</button>
        <span className="food">{props.data.groceryItem}</span>
      </li>
  )

}

export default GroceryListItem;