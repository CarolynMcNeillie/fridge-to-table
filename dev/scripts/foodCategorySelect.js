import React from 'react';

const FoodCategorySelect = (props) => {
  console.log('hi')

  return(
    <select name = "foodCategory" value = { props.data.foodCategory } onChange = { props.handleChange } >
      <option value="fruit">Fruit</option>
      <option value="vegetable">Vegetable</option>
      <option value="meat">Meat</option>
      <option value="fish">Fish</option>
      <option value="dairy">Dairy</option>
      <option value="frozen">Frozen</option>
      <option value="canned">Canned</option>
      <option value="bread">Bread</option>
      <option value="pantry">Pantry</option>
      <option value="other">Other</option>
      </select >
  )

};

export default FoodCategorySelect;