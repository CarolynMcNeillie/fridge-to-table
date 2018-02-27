import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import FoodCategories from './foodCategories';
import FoodItem from './foodItem';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import AddToInventory from './addToInventory';
import AddToGroceryList from './addToGroceryList';
import GroceryListItem from './groceryListItem';
import Modal from './modal'

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
        path: 'Hero',
        foodItem: '',
        foodCategory: 'Fruits',
        purchasedDate: today,
        eatBy: '',
        filterBy: 'All',
        inventory: [],
        groceryItem: '',
        groceryCategory: 'Fruits',
        groceryList: [],
        isOpen: false,
        activeItem: '',
        activeItemName: '',
        activeCategory: '',

      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.addItem = this.addItem.bind(this);
      this.addGroceryItem = this.addGroceryItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.removeGroceryItem = this.removeGroceryItem.bind(this);
      this.addGroceryItem = this.addGroceryItem.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.showSidebar = this.showSidebar.bind(this);
      this.setInventory = this.setInventory.bind(this);
      this.setGroceries = this.setGroceries.bind(this);
    }

  toggleModal(key, itemName, itemCategory) {
    this.setState({
      isOpen: !this.state.isOpen,
      activeItem: key,
      activeItemName: itemName,
      activeCategory: itemCategory
    });
  }

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("open");
  }

  showGroceryModel(key) {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  setInventory() {
    this.setState({
      path: 'Inventory'
    });
  }

  setGroceries() {
    this.setState({
      path: 'Groceries'
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  //The date picker doesn't send an event so it has a special handler
  handleDateChange(date) {
    this.setState({ 
      eatBy: date
    })
  }

  //Add item to the Inventory

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
      foodCategory: 'Fruits',
      purchasedDate: 'Today',
      eatBy: ''
    });

    this.showSidebar(e);
  }
    
  //Add item to the grocery list
  addGroceryItem(e) {
    e.preventDefault();

    const groceryListItem = {
      groceryItem: this.state.groceryItem,
      groceryCategory: this.state.groceryCategory,
    };

    const dbRef = firebase.database().ref('Drumgolds/groceryList');
    dbRef.push(groceryListItem);

    this.setState({
      groceryItem: '',
      groceryCategory: 'Fruits',
    });

    this.showSidebar(e);
  }

  //Remove item from the Inventory
  removeItem(key) {
    const dbRef = firebase.database().ref(`Drumgolds/inventory/${key}`);
    dbRef.remove();

  }

  //Remove item from the grocery list
  removeGroceryItem(key) {
    const dbRef = firebase.database().ref(`Drumgolds/groceryList/${key}`);
    dbRef.remove();

    

  }
  
  componentDidMount() {
    const dbRef = firebase.database().ref('Drumgolds/inventory');
    const dbGroceryRef = firebase.database().ref('Drumgolds/groceryList')

    //Updating Inventory list
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

      this.setState({
        inventory: itemsArray,
      })

    })

    //Updating grocery list
    dbGroceryRef.on('value', (firebaseData) => {
      const itemsArray = [];
      const itemsData = firebaseData.val();

      for (let itemKey in itemsData) {
        itemsData[itemKey].key = itemKey;
        itemsArray.push(itemsData[itemKey]);
      }

      this.setState({
        groceryList: itemsArray,
      })

    })

  }

  render() {

    return (

      <div className="App">

        {this.state.path === 'Hero' ?
          <header className="heroSplash">
            <h1>Fridge<br /> <span>to</span> Table</h1>
            <button onClick={this.setInventory}>Enter</button>
          </header>
          : null}

        <header className="navBar">
          <button onClick={this.showSidebar}>
          <i className="fas fa-bars"></i>
          </button>
          <h2>Fridge to Table</h2>
          <p> </p>
        </header>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal} removeItem={this.removeItem} activeItem={this.state.activeItem} activeItemName={this.state.activeItemName} activeCategory={this.state.activeCategory} >
        </Modal>

        <aside className="sidebar" ref={ref => this.sidebar = ref}>
          <div className="wrapper">
            <button onClick={this.showSidebar}>×</button>

            {this.state.path === 'Inventory' ? 
              <section className="AddToInventory">
                <AddToInventory data={this.state} handleChange={this.handleChange} handleDateChange={this.handleDateChange} addItem={this.addItem} />
              </section>
            : null}

            {this.state.path === 'Groceries' ? 
              <section className="AddToGroceryList">
                <AddToGroceryList data={this.state} handleChange={this.handleChange} addGroceryItem={this.addGroceryItem} />
              </section>
            : null}


          </div>
        </aside>

        {this.state.path === 'Inventory' ?
        
            <div>

              <h1 className="inventory">Inventory</h1>

              <form className="filterBy">
                <h3>Filter By</h3>
                <select name="filterBy" onChange={this.handleChange}>
                <option value="All" key='filter-All' >All</option>
                
                {FoodCategories.map((category, i) => {
                    return <option value={category} key={`filter-${i}`} >{category}</option>
                })}

                </select>
                </form>

              <ul>
                {this.state.inventory.map((item) => {
                  return <FoodItem data={item} filterBy={this.state.filterBy} key={item.key} removeItem={this.removeItem} toggleModal={this.toggleModal} />
                })}
              </ul>
            </div>

        : null}

        {this.state.path === 'Groceries' ?
            <div>
            <h1 className="inventory">Grocery List</h1>
              <ul className="groceryList">
                {this.state.groceryList.map((item) => {
                  return <GroceryListItem data={item} key={item.key} removeGroceryItem={this.removeGroceryItem} />
                })}
              </ul>
            </div>

        : null }

        <footer>
          {/* inventory */}
          <button onClick={this.setInventory}><i className="fas fa-utensils" ></i><span> Kitchen Inventory</span></button>
          
          {/* grocery list */}
          <button onClick={this.setGroceries} ><i className="fas fa-shopping-bag" ></i><span> Grocery List</span></button>
          
          {/* recipes */}
          <button><i className="fas fa-book"></i><span> Recipes</span></button>
        </footer>


      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
