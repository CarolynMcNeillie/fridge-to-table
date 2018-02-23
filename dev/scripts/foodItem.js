import React from 'react';

const FoodItem = (props) => {
  return (
    <li>
      <button onClick={() => props.remove(props.itemIndex)}>×</button>
      <span className="food">{props.data.foodItem}</span>
      — Eat within {props.data.eatBy}
    </li>
  );
};

export default FoodItem;