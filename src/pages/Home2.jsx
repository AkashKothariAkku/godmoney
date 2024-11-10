// import { ProgressBar } from 'react-bootstrap';
import "../assets/css/homepage.css";
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from '../components/Header2';
import { NavLink } from "react-router-dom";
function Home2() {
  const steps = [
    {
      number: 1,
      title: "Select A Contest",
      description: "Choose a contest that you want to play.",
      imgSrc: "images/contest.jpeg", // Replace with actual image URL
    },
    {
      number: 2,
      title: "Add Amount",
      description: "Use your skills to join contest.",
      imgSrc: "images/join.jpeg", // Replace with actual image URL
    },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <Header2 />

      {/* List Section */}
      <div className="list-section">
        <img src='images/dollars.jpeg' className="mt-0" width={"370px"}/>
      </div>
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 10px", color: "#0D6EFD" }}>
       It{"'"}s easy to start playing on<span style={{ color: "#03B529" }}> Godmoney</span>
      </h2>
      {steps.map((step) => (
        <div
          key={step.number}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#2ab933",
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              width: "50px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          >
            {step.number}
          </div>
          <div style={{ flexGrow: 1 }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "0" }}>
              {step.title}
            </h4>
            <p style={{ margin: "5px 0 0", color: "#666" }}>{step.description}</p>
          </div>
          <img
            src={step.imgSrc}
            alt={step.title}
            style={{ width: "150px", height: "150px", borderRadius: "8px",}}
          />
        </div>
      ))}
    </div>
    <div className="list-section">
        <img src='images/money.jpeg' className="mt-0" width={"370px"}/>
      </div>
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Title */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 10px", color: "#0D6EFD" }}>
        How to <span style={{ color: "#03B529" }}>Play</span>
      </h2>

      {/* Description */}
      <p style={{ color: "#555", fontSize: "1rem", lineHeight: "1.6", margin: "10px 0 20px" }}>
      Ready to challenge yourself and earn rewards? Check out this video to learn how to play on Godmoney and start earning now! Compete with others by typing accurately and quickly, complete more words in less time, and win big based on your typing speed and skill.
      </p>

      {/* Video Thumbnail */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "400px", borderRadius: "8px", overflow: "hidden" }}>
        <video
  src="images/playVideo.mp4" // Replace with the actual video URL
  poster="images/thumbnail.jpg" // Replace with the actual thumbnail image URL
  alt="How to Play"
  style={{ width: "100%", borderRadius: "8px" }}
  controls
  playsInline
  muted
></video>


          {/* Play Button Overlay */}
        </div>
      </div>
    </div>
    <NavLink to="/login"><div className="profile-section bg-dark text-center" style={{borderRadius: "20px"}}>
        <button className="text-white">Sign-in</button>
      </div></NavLink>
    </div>
  );
}

export default Home2;
