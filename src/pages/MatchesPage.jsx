import { useState } from 'react';
import '../assets/css/matchespage.css'; // Import CSS file
import { Header } from '../components/Header';

const MatchesPage = () => {
  // State for current active tab
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample matches data
  const matches = {
    upcoming: [
      { id: 1, name: 'Team A vs Team B', date: 'Sep 20, 2024' },
      { id: 2, name: 'Team C vs Team D', date: 'Sep 22, 2024' },
    ],
    live: [
      { id: 1, name: 'Team E vs Team F', date: 'Live Now' },
      { id: 2, name: 'Team G vs Team H', date: 'Live Now' },
    ],
    completed: [
      { id: 1, name: 'Team I vs Team J', date: 'Sep 10, 2024', result: 'Team J won' },
      { id: 2, name: 'Team K vs Team L', date: 'Sep 12, 2024', result: 'Team K won' },
    ]
  };

  // Function to handle tab change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle Add Amount button click for live matches
  const handleAddAmount = (match) => {
    alert(`Add Amount for match: ${match.name}`);
  };

  return (
    <div className="wrapper">
      <div className="home-container">
        {/* Header */}
        <Header />

        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={activeTab === 'upcoming' ? 'active-tab' : ''}
            onClick={() => handleTabClick('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={activeTab === 'live' ? 'active-tab' : ''}
            onClick={() => handleTabClick('live')}
          >
            Live
          </button>
          <button
            className={activeTab === 'completed' ? 'active-tab' : ''}
            onClick={() => handleTabClick('completed')}
          >
            Completed
          </button>
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
            matches.live.map((match) => (
              <div key={match.id} className="match-item live-match">
                <div className="match-info">
                  <h3>{match.name}</h3>
                  <p>{match.date}</p>
                </div>
                <button className="add-amount-btn" onClick={() => handleAddAmount(match)}>
                  Add Amount
                </button>
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
    </div>
  );
};

export default MatchesPage;
