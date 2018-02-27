import React from 'react';
import moment from 'moment';

const FoodItem = (props) => {

  const relativeDate = moment(props.data.eatBy).fromNow();
  const daysFromNow = moment(props.data.eatBy, 'YYYYMMDD').calendar();
  const regexAgo = /ago/ig;
  const regexHours = /hours/ig;
  //date contains "ago" = food is old
  let oldFood = regexAgo.test(relativeDate); 
  let hoursRange = regexHours.test(relativeDate);
  let liClass;

  //anything that should have been eaten "x timeframe ago" is marked old and falls to the end of the list
  if (oldFood === true) {
    liClass='oldFood';
  }

   // this captures any items marked to be eaten today, tomorrow, day after tomorrow, and day after that: a four-day range in all
  if (relativeDate === 'in a day' || relativeDate === 'in 2 days' || relativeDate === 'in 3 days' || hoursRange === true) {
    liClass='eatSoon'
    }

  if (props.data.foodCategory === props.filterBy || props.filterBy === 'All') {
  return (

    // <li className={oldFood === undefined ? null : liClass}>
    
    //   <button onClick={() => props.removeItem(props.data.key)}>×</button>
    //   <span className="food">{props.data.foodItem}</span>
    //   -  {liClass === 'oldFood' ? `Ready for the compost ${relativeDate}` : `Eat by ${daysFromNow}`}  
    // </li>

    <li className={oldFood === undefined ? null : liClass}>

      <button onClick={() => props.toggleModal(props.data.key, props.data.foodItem, props.data.foodCategory)}>×</button>

      <p>
      <span className="food">{props.data.foodItem}</span> - 
       {liClass === 'oldFood' ? `Ready for the compost ${relativeDate} ` : `Eat by ${daysFromNow}`}

        <span className="emoji">  
        {liClass === 'eatSoon' ? ' ❗️' : null}
        {liClass === 'oldFood' ? ' 🤢' : null}
        </span>
       </p>

    </li>
  

  )
  } else {
  return ( null )
}
}

export default FoodItem;