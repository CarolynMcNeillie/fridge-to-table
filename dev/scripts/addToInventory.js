import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FoodCategorySelect from './foodCategorySelect';
import moment from 'moment';

const thisMonth = moment().format(`YYYY, M`);

const AddToInventory = (props) => {

  return(
    <form onSubmit={props.addItem}>

    <h3>Add to Inventory</h3>

      <label htmlFor="foodItem">Food Item</label>
        <input type="text" value={props.data.foodItem} name="foodItem" onChange={props.handleChange} />

      <label htmlFor="foodCategory">Category</label>


        <FoodCategorySelect data={props.data} handleChange={props.handleChange} /> 

    
      <p>Eat by</p>
      <DayPickerInput showOutsideDays value={props.data.eatBy} name="eatBy" onDayChange={day => props.handleDateChange(moment(day).format('YYYYMMDD'))} />

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToInventory;