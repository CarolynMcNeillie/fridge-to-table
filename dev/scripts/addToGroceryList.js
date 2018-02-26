import React from 'react';
import FoodCategories from './foodCategories';

const AddToGroceryList = (props) => {

  return (
    <form onSubmit={props.addGroceryItem}>

      <h3>Add to Grocery List</h3>

      <label htmlFor="groceryItem">Food Item</label>
      <input type="text" value={props.data.groceryItem} name="groceryItem" onChange={props.handleChange} required/>

      <label htmlFor="groceryCategory">Category</label>
      <select name="groceryCategory" value={props.data.groceryCategory} onChange={props.handleChange} required>

        {FoodCategories.map((category, i) => {
          return (
            <option value={category} key={`groceryCategory-${i}`} >{category}</option>
          )
        })
        }

      </select>

      <input type="submit" value="Add" />
    </form>
  );
};

export default AddToGroceryList;