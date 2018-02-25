import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FoodCategorySelect from './foodCategorySelect';
import moment from 'moment';

const thisMonth = moment().format(`YYYY, M`);
console.log(thisMonth)

const AddToInventory = (props) => {

  return(
    <form onSubmit={props.addItem}>

      <label htmlFor="foodItem">Food Item</label>
        <input type="text" value={props.data.foodItem} name="foodItem" onChange={props.handleChange} />

      <label htmlFor="foodCategory">Category</label>

      {/* <select name="foodCategory" value={props.data.foodCategory} onChange={props.handleChange} > */}

        <FoodCategorySelect data={props.data} handleChange={props.handleChange} displayDropdown={props.displayDropdown} /> 

      {/* </select > */}
    
      <p>Eat by</p>
      <DayPickerInput showOutsideDays value={props.data.eatBy} name="eatBy" onDayChange={day => props.handleDateChange(day)} />

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToInventory;