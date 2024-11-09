import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import "../assets/css/homepage.css";
import { Header } from '../components/Header';
import axios from 'axios';
import WatchIcon from './WatchIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function HomePage() {
  const [listItems, setListItems] = useState([
    { id: 1, winnerAmount: 100, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 40 },
    { id: 2, winnerAmount: 200, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 60 },
    { id: 3, winnerAmount: 300, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 80 },
  ]);

  const [value, setValue] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); 
  const runTime = () => {
    if (!intervalRef.current) {
      const interval = setInterval(() => {
        setValue(new Date());
        setSeconds(prev => prev + 1)
      }, 1000);
      intervalRef.current = interval; 
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState(1);
  const [sentence, setSentence] = useState("");
  const [sentenceError, setSentenceError] = useState("");
  const [amountError, setAmountError] = useState("");

  const handleShowPopup = (item) => {
    setSelectedItemId(item);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    if (intervalRef.current) {
      console.log("Clearing interval", intervalRef.current);
      clearInterval(intervalRef.current); 
      intervalRef.current = null; 
    }
    setSeconds(0)
    setSentenceError("")
    setAmountError("")
    setSentence("")
    setShowPopup(false);
    setAmountToAdd(1);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    };
  }, []);

  const handleAddAmount = () => {
    if(!sentence){
      setSentenceError(<p className='text-danger'>This field is required</p>) 
      return     
    }
    if(amountToAdd < 1 || amountToAdd > selectedItemId?.maxAmount){
      setAmountError(<p className='text-danger'>Amount must be greater then 0 and smaller then {selectedItemId?.maxAmount + 1} </p>) 
      return
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/add-contest-amount`, {contestId: selectedItemId?._id, amount: amountToAdd, sentence: sentence, time: seconds}, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response);
      setSentence("")
      handleClosePopup();
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  };

  const getContestList = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/get-contest`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response);
      setListItems(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  }
  useEffect(()=>{
    getContestList()
  },[])
  return (
    <div className="home-container">
      {/* Header */}
      <ToastContainer />
      <Header />

      {/* List Section */}
      <div className="list-section">
        <h2>All Matches</h2>
        {listItems.map((item) => (
          <div className="list-item" key={item.id}>
            <div className="list-info">
              <p>Winner Amount: {item.winnerAmount}₹</p>
              {/* <ProgressBar 
              now={Math.round((item?.totalAmount / (item.winnerAmount + item?.winnerAmount/4)) * 100)} 
              label={`${Math.round((item?.totalAmount / (item.winnerAmount + item?.winnerAmount/4)) * 100)}% `} variant='success' /> */}
            </div>  
            <Button className="add-amount-btn" onClick={() => handleShowPopup(item)}>Add Amount</Button>
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
                <Button variant="outline-secondary" onClick={() => {
                  if(amountToAdd > 1){
                  setAmountToAdd(amountToAdd - 1)
                  setAmountError("")
                  }
                  }}>-</Button>
                <FormControl
                  type="number"
                  value={amountToAdd}
                  min={1}
                  max={selectedItemId?.maxAmount}
                  onChange={(e) => {
                  setAmountError("")
                    setAmountToAdd(Number(e.target.value))}}
                />
                <Button variant="outline-secondary" onClick={() => {
                  if(amountToAdd < selectedItemId?.maxAmount){
                  setAmountToAdd(amountToAdd + 1)
                  setAmountError("")
                  }
                }}>+</Button>
              </InputGroup>
              {amountError}
              <div className='mt-4 mb-4'>
                <div style={{display: "flex", gap: "8px"}}>
                <h4>Write the below sentence</h4>
                <WatchIcon value={value}/>
                </div>
              <span  onCopy={(e) => {
          e.preventDefault();
          return false;
        }}>{selectedItemId?.sentence}</span>
             
              </div>
              <FormControl
                  type="text"
                  value={sentence}
                  onChange={(e) => {
                    runTime()
                    setSentenceError("")
                    setSentence(e.target.value)}}
                />
                {sentenceError}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddAmount}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
