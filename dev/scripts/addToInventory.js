import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FoodCategorySelect from './foodCategorySelect';

const AddToInventory = (props) => {

  return(

    <form onSubmit={props.addItem}>

      <label htmlFor="foodItem">Food Item</label>
        <input type="text" value={props.data.foodItem} name="foodItem" onChange={props.handleChange} />

      <label htmlFor="foodCategory">Category</label>

      <FoodCategorySelect data={props.data} handleChange={props.handleChange}/>

      <p>Eat by</p>
      <DayPickerInput value={props.data.eatBy} name="eatBy" onDayChange={day => props.handleDateChange(day)} />

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToInventory;