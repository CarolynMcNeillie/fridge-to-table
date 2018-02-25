import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import FoodItem from './foodItem';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import AddToInventory from './addToInventory';
import GroceryListItem from './groceryListItem';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZFZhYfViuHOl1LG-jOEVCB1a-bDhbxJQ",
  authDomain: "fridge-to-table-drumgolds.firebaseapp.com",
  databaseURL: "https://fridge-to-table-drumgolds.firebaseio.com",
  projectId: "fridge-to-table-drumgolds",
  storageBucket: "fridge-to-table-drumgolds.appspot.com",
  messagingSenderId: "873236419127"
};
firebase.initializeApp(config);

//Define how dates display on the front end. (Thanks moment.js!)
moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[Last] dddd',
    nextWeek: 'dddd',
    sameElse: 'MMMM DD YYYY'
  }
});

class App extends React.Component {
    constructor() {

      super();

      const today = moment().format('YYYYMMDD')

      this.state = {
        foodItem: '',
        foodCategory: 'fruit',
        purchasedDate: today,
        eatBy: '',
        inventory: [
        ]
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);

    }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleDateChange(date) {
    const formattedDate = moment(date).format('YYYYMMDD');
    this.setState({ 
      eatBy: formattedDate
    })
  }
    
  addItem(e) {
    e.preventDefault();

    const foodItem = {
      foodItem: this.state.foodItem,
      foodCategory: this.state.foodCategory,
      purchasedDate: this.state.purchasedDate,
      eatBy: this.state.eatBy
    };

    const dbRef = firebase.database().ref('Drumgolds/inventory');
    dbRef.push(foodItem);

    this.setState({
      foodItem: '',
      foodCategory: 'fruit',
      purchasedDate: 'Today',
      eatBy: ''
    });
  }

  removeItem(key) {
    const dbRef = firebase.database().ref(`Drumgolds/inventory/${key}`);
    dbRef.remove();

  }
  
  componentDidMount() {
    const dbRef = firebase.database().ref('Drumgolds/inventory');

    dbRef.on('value', (firebaseData) => {
      const itemsArray = [];
      const itemsData = firebaseData.val();

      for(let itemKey in itemsData){
        itemsData[itemKey].key = itemKey;
        itemsArray.push(itemsData[itemKey]);
      }

      itemsArray.sort(function (a, b) {
        return a.eatBy - b.eatBy;
      });

      console.log(itemsArray);

      this.setState({
        inventory: itemsArray,
      })

    })
  }

  render() {

    return (
      <div>
        <h1> Fridge to Table </h1>
        <AddToInventory data={this.state} handleChange={this.handleChange} handleDateChange={this.handleDateChange} addItem={this.addItem} />
          
        <h2>Inventory</h2> 
        <ul>
          {this.state.inventory.map((item) => {
            return <FoodItem data={item} key={item.key} removeItem={this.removeItem} />
          })}
        </ul>

          <GroceryListItem />

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
