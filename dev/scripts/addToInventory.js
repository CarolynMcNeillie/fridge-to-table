import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const AddToInventory = (props) => {

  return(

    <form onSubmit={props.addItem}>

      <label htmlFor="foodItem">Food Item</label>
        <input type="text" value={props.data.foodItem} name="foodItem" onChange={props.handleChange} />

      <label htmlFor="foodCategory">Category</label>
        <select name="foodCategory" value={props.data.foodCategory} onChange={props.handleChange}>
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
      </select>

      <p>Eat by</p>
      <DayPickerInput value={props.data.eatBy} name="eatBy" onDayChange={day => props.handleDateChange(day)} />

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToInventory;