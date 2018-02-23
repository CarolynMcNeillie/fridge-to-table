import React from 'react';
import ReactDOM from 'react-dom';
import FoodItem from './foodItem';
import moment from 'moment';

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
    sameElse: 'MMMM DD, YYYY'
  }
});

class App extends React.Component {
    constructor() {

      super();
      
      const today = moment()

      this.state = {
        foodItem: '',
        foodCategory: 'fruit',
        purchasedDate: today,
        eatBy: '',
        inventory: [
        ]
      };

      this.handleChange = this.handleChange.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);


    }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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

      this.setState({
        inventory: itemsArray,
      })

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
    console.log(dbRef)
    dbRef.remove();

    }


  render() {
    return (
      <div>
        <h1>Fridge to Table</h1>
        <form onSubmit={this.addItem}>

          <label htmlFor="foodItem">Food Item</label>
          <input type="text" value={this.state.foodItem} name="foodItem" onChange={this.handleChange} />

          <label htmlFor="foodCategory">Category</label>
          <select name="foodCategory" value={this.state.foodCategory} onChange={this.handleChange}>
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

          <label htmlFor="purchasedDate">Date Purchased</label>
          <input type="text" value={moment(this.state.purchasedDate).calendar()} name="purchasedDate" onChange={this.handleChange} />

          <label htmlFor="eatBy">Eat by</label>
          <input type="text" value={this.state.eatBy} name="eatBy" onChange={this.handleChange} />

          <input type="submit" value="Add" />
        </form>
          
        <h2>Inventory</h2> 
        <ul>
          {this.state.inventory.map((item) => {
            return <FoodItem data={item} key={item.key} remove={this.removeItem} />
          })}
        </ul>

      </div>
    )
  }
}

// const FoodItem = (props) => {
//   return (
//     <li>
//       <button onClick={() => props.remove(props.itemIndex)}>×</button>
//       <span className="food">{props.data.foodItem}</span>
//       — Eat within {props.data.eatBy}
//     </li>
//   )
// }

ReactDOM.render(<App />, document.getElementById('app'));
