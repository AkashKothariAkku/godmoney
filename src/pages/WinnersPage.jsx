import { useEffect, useState } from 'react';
import '../assets/css/winnerspage.css'; // Import the CSS file
import { Header } from '../components/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WinnersPage = () => {

  const [contestData, setContestData] = useState([]);

  const getWinnerData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/winner-list`)
      .then(function (response) {
        let data = [];
        let count = 0
        response?.data?.data?.map(e => {
          data.push({...e, id: ++count})
        })
        setContestData(data)
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  }
  useEffect(() => {
    getWinnerData()
  }, [])

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="home-container">
        
        {/* Header Section */}
        <Header />

        {/* Winners List Section */}
        <div className="winners-list">
          <h2>Winners</h2>
          {contestData.map((winner) => (
            <div className="winner-item" key={winner.id}>
              <div className="winner-info">
                <div className="winner-details">
                  <h3>{winner.name}</h3>
                  <p>Amount Won: <b style={{fontSize: "16px"}}>{winner.winnerAmount}₹</b></p>
                  <p>Winner Name: <b style={{fontSize: "16px"}}>{winner?.users?.name}</b></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;
