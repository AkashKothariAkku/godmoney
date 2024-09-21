import { useState } from 'react';
import '../assets/css/walletaddmoney.css'; // Import the CSS file
import { Header } from '../components/Header'; // Assuming you have a Header component

const WalletAddMoney = () => {
  const [screenshot, setScreenshot] = useState(null);

  // Handle file upload for screenshot
  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (screenshot) {
      // Logic to handle submission
      alert('Screenshot submitted successfully. We will verify and add the amount.');
      console.log(screenshot);
    } else {
      alert('Please upload a screenshot to verify the transaction.');
    }
  };

  return (
    <div className="wrapper">
      <div className="home-container">
        {/* Header Section */}
        <Header />

        <h2>Add Money to Wallet</h2>

        {/* QR Code and UPI ID Section */}
        <div className="payment-info">
          <div className="qr-code-section">
            <h3>Scan the QR Code</h3>
            <img src='images/qrcode.png' alt="QR Code" className="qr-code m-3" />
          </div>

          <div className="upi-id-section">
            <h3>Or Use Our UPI ID</h3>
            <p>UPI ID: <strong>yourupi@bank</strong></p>
          </div>
        </div>

        {/* Form to Upload Screenshot */}
        <form className="upload-screenshot-form" onSubmit={handleSubmit}>
          <h4>Upload Payment Screenshot</h4>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleScreenshotChange} 
            required 
          />
          
          <button type="submit">Submit for Verification</button>
        </form>
      </div>
    </div>
  );
};

export default WalletAddMoney;
