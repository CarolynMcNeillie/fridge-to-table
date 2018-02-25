import React from 'react';
import FoodCategories from './foodCategories';

class FoodCategorySelect extends React.Component {

 render(){

  return(

    <select name = "foodCategory" value = { this.props.data.foodCategory } onChange = { this.props.handleChange } >

      {FoodCategories.map((category, i) => {
        return (
          <option value={category} key={i} >{category}</option>
        )
      })
      }



      </select >

  )
}

};

export default FoodCategorySelect;