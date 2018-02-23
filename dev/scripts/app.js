import React from 'react';
import ReactDOM from 'react-dom';
import FoodItem from './foodItem';

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


class App extends React.Component {
    constructor() {

      super();
      this.state = {
        foodItem: '',
        foodCategory: 'fruit',
        purchasedDate: 'Today',
        eatBy: '',
        inventory: [{
          foodItem: 'Apples',
          foodCategory: 'Fruit',
          purchasedDate: 'Today',
          eatBy: '1 week',
          },
          {
            foodItem: 'Pears',
            foodCategory: 'Fruit',
            purchasedDate: 'Today',
            eatBy: '2 weeks',
          },
          {
            foodItem: 'Salmon',
            foodCategory: 'Fruit',
            purchasedDate: 'Today',
            eatBy: '3 days',
          },
        ]
      };

      this.handleChange = this.handleChange.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      // this.toggleEaten = this.toggleEaten.bind(this);
      // this.toggleRotten = this.toggleRotten.bind(this);

    }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  componentDidMount() {
  }

  addItem(e) {
    e.preventDefault();
    const inventoryState = Array.from(this.state.inventory);
    inventoryState.push(this.state);
    this.setState({
      inventory: inventoryState,
      foodItem: '',
      foodCategory: 'fruit',
      purchasedDate: 'Today',
      eatBy: ''
    });
  }

  removeItem(index) {
    const inventoryState = Array.from(this.state.inventory);
    inventoryState.splice(index, 1);
    this.setState({
      inventory: inventoryState
    });
  };

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
            <option value="milk">Milk</option>
            <option value="frozen">Frozen</option>
            <option value="canned">Canned</option>
            <option value="grain">Grain</option>
            <option value="pantry">Pantry</option>
            <option value="other">Other</option>
          </select> 

          <label htmlFor="purchasedDate">Date Purchased</label>
          <input type="text" value={this.state.purchasedDate}name="purchasedDate" onChange={this.handleChange} />

          <label htmlFor="eatBy">Eat by</label>
          <input type="text" value={this.state.eatBy} name="eatBy" onChange={this.handleChange} />

          <input type="submit" value="Add" />
        </form>
          
        <h2>Inventory</h2> 
        <ul>
          {this.state.inventory.map((item, i) => {
            return <FoodItem data={item} key={`item-${i}`} remove={this.removeItem} itemIndex={i} />
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
