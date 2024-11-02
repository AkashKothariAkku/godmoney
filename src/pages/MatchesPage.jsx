import { useEffect, useRef, useState } from 'react';
import '../assets/css/matchespage.css'; // Import CSS file
import { Header } from '../components/Header';
import { ProgressBar, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import WatchIcon from './WatchIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MatchesPage = () => {
  // State for current active tab
  const [activeTab, setActiveTab] = useState('live');

  // Sample matches data
  const [matches, setMatches] = useState({
    upcoming: [
      { id: 1, name: 'Team A vs Team B', date: 'Sep 20, 2024' },
      { id: 2, name: 'Team C vs Team D', date: 'Sep 22, 2024' },
    ],
    live: [
      { id: 1, winnerAmount: 100, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 40 },
    { id: 2, winnerAmount: 200, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 60 },
    { id: 3, winnerAmount: 300, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 80 },
    ],
    completed: [
      { id: 1, name: 'Team I vs Team J', date: 'Sep 10, 2024', result: 'Team J won' },
      { id: 2, name: 'Team K vs Team L', date: 'Sep 12, 2024', result: 'Team K won' },
    ]
  });

  // Function to handle tab change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  const getContestList = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/get-user-contest`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response.data.data);
      setMatches(prev => {
        return {...prev, live: response.data.data}
      })
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  }
  useEffect(()=>{
    getContestList()
  },[])
  const [amountError, setAmountError] = useState("");
  const handleAddAmount = () => {
    if(!sentence){
      setSentenceError(<p className='text-danger'>This field is required</p>) 
      return     
    }
    if(+amountToAdd < 1 || +amountToAdd > +selectedItemId?.maxAmount){
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

  return (
    <div className="wrapper">

<ToastContainer />
      <div className="home-container">
        {/* Header */}
        <Header />

        {/* Tab Navigation */}
        <div className="tabs">
          {/* <button
            className={activeTab === 'upcoming' ? 'active-tab' : ''}
            onClick={() => handleTabClick('upcoming')}
          >
            Upcoming
          </button> */}
          <button
            className={activeTab === 'live' ? 'active-tab' : ''}
            onClick={() => handleTabClick('live')}
          >
            Live
          </button>
          {/* <button
            className={activeTab === 'completed' ? 'active-tab' : ''}
            onClick={() => handleTabClick('completed')}
          >
            Completed
          </button> */}
        </div>

        {/* Matches List */}
        <div className="matches-list">
          {activeTab === 'upcoming' &&
            matches.upcoming.map((match) => (
              <div key={match.id} className="match-item">
                <div className="match-info">
                  <h3>{match.name}</h3>
                  <p>{match.date}</p>
                </div>
              </div>
            ))}

          {activeTab === 'live' &&
            matches.live.map((item) => (
              <div className="match-item live-match" key={item.id}>
              <div className="match-info">
                <p>Winner Amount: {item?.contestDetails?.winnerAmount}₹</p>
                <ProgressBar 
                now={Math.round((item?.contestDetails?.totalAmount / (item?.contestDetails?.winnerAmount + item?.contestDetails?.winnerAmount/4)) * 100)} 
                label={`${Math.round((item?.contestDetails?.totalAmount / (item?.contestDetails?.winnerAmount + item?.contestDetails?.winnerAmount/4)) * 100)}% `} variant='success' />
              </div>  
              <Button className="add-amount-btn" onClick={() => handleShowPopup(item?.contestDetails)}>Add Amount</Button>
            </div>
            ))}

          {activeTab === 'completed' &&
            matches.completed.map((match) => (
              <div key={match.id} className="match-item">
                <div className="match-info">
                  <h3>{match.name}</h3>
                  <p>{match.date}</p>
                  <p>{match.result}</p>
                </div>
              </div>
            ))}
        </div>
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
                  }}}>+</Button>
              </InputGroup>
              {amountError}
              <div className='mt-4 mb-4'>
                <div style={{display: "flex", gap: "8px"}}>
                <h4>Write the below sentence</h4>
                <WatchIcon value={value}/>
                </div>
              {selectedItemId?.sentence}
             
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
};

export default MatchesPage;
