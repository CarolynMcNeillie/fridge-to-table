import React from 'react';
import ReactDOM from 'react-dom';

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
      foodCategory: '',
      purchasedDate: '',
      eatBy: '',
      Inventory: []
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
        {/* <form onSubmit={this.addFoodItem}> */}

          <label htmlFor="foodItem">Food Item</label>
          <input type="text" value={this.state.foodItem} id="foodItem" onChange={this.handleChange} />

          <label htmlFor="foodCategory">Category</label>
          <select name="foodCategory" onChange={this.handleChange}>
            <option value="freshFruit">Fruit</option>
            <option value="freshVegetable">Vegetable</option>
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
          <input type="text" defaultValue="Today" id="purchasedDate" onChange={this.handleChange} />

          <label htmlFor="eatBy">Eat by</label>
          <input type="text" value={this.state.eatBy} id="eatBy" onChange={this.handleChange} />

          <input type="submit" value="Add" />
        </form>
          
        {/* <ul>
          {this.state.todos.map((todo) => {
            return (
              <Todo data={todo} key={todo.key} toggleCompleted={this.toggleCompleted} />
            )
          })}
        </ul> */}

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
