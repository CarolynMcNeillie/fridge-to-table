import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FoodCategorySelect from './foodCategorySelect';
import moment from 'moment';

const thisMonth = moment().format(`YYYY, M`);

const AddToInventory = (props) => {

  return(
    <form onSubmit={props.addItem}>

      <header><h3>Add to Inventory</h3></header>

      <label htmlFor="foodItem">Food Item</label>
      <input type="text" value={props.data.foodItem} name="foodItem" onChange={props.handleChange} required/>

      <label htmlFor="foodCategory">Category</label>
      <FoodCategorySelect data={props.data} handleChange={props.handleChange} required/> 

      <p>Eat by</p>
      <DayPickerInput showOutsideDays value={props.data.eatBy} name="eatBy" onDayChange={day => props.handleDateChange(moment(day).format('YYYYMMDD'))} required/>

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToInventory;