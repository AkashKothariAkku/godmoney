import '../assets/css/winnerspage.css'; // Import the CSS file
import { Header } from '../components/Header';

const WinnersPage = () => {
  // Array of winners
  const winners = [
    {
      id: 1,
      name: 'John Doe',
      amount: 5000,
      image: 'https://via.placeholder.com/50',
      listName: 'Dream League',
    },
    {
      id: 2,
      name: 'Jane Smith',
      amount: 3000,
      image: 'https://via.placeholder.com/50',
      listName: 'Premier Contest',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      amount: 10000,
      image: 'https://via.placeholder.com/50',
      listName: 'Super Cup',
    },
  ];

  return (
    <div className="wrapper">
      <div className="home-container">
        
        {/* Header Section */}
        <Header />

        {/* Winners List Section */}
        <div className="winners-list">
          <h2>Winners</h2>
          {winners.map((winner) => (
            <div className="winner-item" key={winner.id}>
              <div className="winner-info">
                <img src={winner.image} alt={winner.name} className="winner-image" />
                <div className="winner-details">
                  <h3>{winner.name}</h3>
                  <p>Amount Won: ${winner.amount}</p>
                  <p>List: {winner.listName}</p>
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
