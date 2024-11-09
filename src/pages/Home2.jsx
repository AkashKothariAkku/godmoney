import { useEffect, useRef, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import "../assets/css/homepage.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../components/Header2';
import { NavLink } from 'react-router-dom';
function Home2() {
  const [listItems, setListItems] = useState([
    { id: 1, winnerAmount: 100, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 40 },
    { id: 2, winnerAmount: 200, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 60 },
    { id: 3, winnerAmount: 300, maxAmount: 10, totalAmount:0, peopleCount:0, progress: 80 },
  ]);

  const intervalRef = useRef(null); 


  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    };
  }, []);

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
      <Header2 />

      {/* List Section */}
      <div className="list-section">
        <h2>All Matches</h2>
        {listItems.map((item) => (
          <div className="list-item" key={item.id}>
            <div className="list-info">
              <p>Winner Amount: {item.winnerAmount}₹</p>
              <ProgressBar 
              now={Math.round((item?.totalAmount / (item.winnerAmount + item?.winnerAmount/4)) * 100)} 
              label={`${Math.round((item?.totalAmount / (item.winnerAmount + item?.winnerAmount/4)) * 100)}% `} variant='success' />
            </div>  
            <NavLink to="/login" className="add-amount-btn">Add Amount</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home2;
