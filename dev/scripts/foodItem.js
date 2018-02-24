import React from 'react';
import moment from 'moment';

const FoodItem = (props) => {
  return (
    <li>
      <button onClick={() => props.removeItem(props.data.key)}>×</button>
      <span className="food">{props.data.foodItem}</span>
      — Eat by {moment(props.data.eatBy, 'YYYYMMDD').calendar()}
    </li>
  );
};

export default FoodItem;