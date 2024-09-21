import { useState } from 'react';
import { ProgressBar, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import "../assets/css/homepage.css";
import { Header } from '../components/Header';

function HomePage() {
  const [listItems, setListItems] = useState([
    { id: 1, winnerAmount: 100, progress: 40 },
    { id: 2, winnerAmount: 200, progress: 60 },
    { id: 3, winnerAmount: 300, progress: 80 },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState(0);

  const handleShowPopup = (id) => {
    setSelectedItemId(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setAmountToAdd(0);
  };

  const handleAddAmount = () => {
    setListItems(listItems.map(item =>
      item.id === selectedItemId
        ? { ...item, winnerAmount: item.winnerAmount + amountToAdd }
        : item
    ));
    handleClosePopup();
  };

  return (
    <div className="home-container">
      {/* Header */}
      <Header />

      {/* List Section */}
      <div className="list-section">
        <h2>All Matches</h2>
        {listItems.map((item) => (
          <div className="list-item" key={item.id}>
            <div className="list-info">
              <p>Winner Amount: ${item.winnerAmount}</p>
              <ProgressBar now={item.progress} label={`${item.progress}%`} variant='success' />
            </div>
            <Button className="add-amount-btn" onClick={() => handleShowPopup(item.id)}>Add Amount</Button>
          </div>
        ))}
      </div>

      {/* Popup */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Add Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicAmount">
              <Form.Label>Amount to Add</Form.Label>
              <InputGroup>
                <Button variant="outline-secondary" onClick={() => setAmountToAdd(amountToAdd - 1)}>-</Button>
                <FormControl
                  type="number"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(Number(e.target.value))}
                />
                <Button variant="outline-secondary" onClick={() => setAmountToAdd(amountToAdd + 1)}>+</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>Close</Button>
          <Button variant="primary" onClick={handleAddAmount}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
