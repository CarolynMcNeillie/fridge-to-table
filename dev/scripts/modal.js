import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

  constructor() {
    super();

    this.addToGroceries = this.addToGroceries.bind(this);
    }; 

  addToGroceries(ifAdd) {

    if(ifAdd === true) {

      const groceryListItem = {
        groceryItem: this.props.activeItemName,
        groceryCategory: this.props.activeCategory,
      }

      const dbRef = firebase.database().ref('Drumgolds/groceryList');
      dbRef.push(groceryListItem);
    }

    this.props.removeItem(this.props.activeItem);
    this.props.onClose()
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
  
    return (
      <div className="backdrop">
        <div className="modal">

          <h2>Add this item to your grocery list?</h2>
      
          <div className="buttons">
            <button onClick={() => { this.addToGroceries(true) }} className="modal-btn yes">
              Yes
            </button>
            <button onClick={() => { this.addToGroceries(false) }} className="modal-btn">
                  No
            </button>
            <button onClick={this.props.onClose} className="modal-btn cancel">
              Cancel
            </button>
          </div>

          </div>
        </div>
    );
  }
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };

export default Modal;