import { useEffect, useRef, useState } from 'react';
import '../assets/css/walletaddmoney.css'; // Import the CSS file
import { Header } from '../components/Header'; // Assuming you have a Header component
import QRCode from 'react-qr-code';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WalletAddMoney = () => {
  const navigate = useNavigate()
  const [utrNumber, setUtrNumber] = useState(null);
  const [amount, setAmount] = useState(200);
  const [generateQR, setGenerateQR] = useState(false);
  const [fieldError, setFieldError] = useState();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [upiDetails, setUpiDetails] = useState({
    vpa: "q076102650@ybl",
    name: "Umesh Sharma",
    amount: parseFloat(amount) + .00, 
    currency: "INR" 
  });
  
  const [upiUrl, setUpiUrl] = useState(`upi://pay?pa=${upiDetails.vpa}&pn=${upiDetails.name}&am=${upiDetails.amount}&cu=${upiDetails.currency}`);
  // Handle file upload for screenshot
  const handleUTRChange = (e) => {
    setFieldError()
    setUtrNumber(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setFieldError()
    setAmount(e.target.value);
    setGenerateQR(false)
    setUpiDetails({
      vpa: "q076102650@ybl",
      name: "Umesh Sharma",
      amount: parseFloat(e.target.value) + .00, 
      currency: "INR" 
    })
  };

  useEffect(()=>{
    setUpiUrl(`upi://pay?pa=${upiDetails.vpa}&pn=${upiDetails.name}&am=${upiDetails.amount}&cu=${upiDetails.currency}`)
  },[upiDetails])
  useEffect(()=>{
    setFieldError()
    setGenerateQR(false)
    setUpiDetails({
      vpa: "q076102650@ybl",
      name: "Umesh Sharma",
      amount: parseFloat(amount) + .00, 
      currency: "INR" 
    }) 
  },[amount])

  // Handle form submission
  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/add-amount`, {utrNumber, amount}, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(function (response) {
        console.log(response);
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  };
  const amounts = [500, 1000, 2500, 5000];
  const qrRef = useRef();
  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      // Create a link to download the QR code
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgString);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="home-container wallet-container">
        {/* Header Section */}
        <Header />
        <h2>Add Money to Wallet</h2>

        <form className="upload-screenshot-form" onSubmit={handleSubmit}>
          <h4>Enter Amount</h4>
          <input 
            type="number" 
            onChange={handleChangeAmount} 
            min={200}
            value={amount}
            required 
          />
          {fieldError?.amount}
        </form>
        {/* QR Code and UPI ID Section */}
        <div className="payment-info">
        <ButtonGroup>
      {amounts.map((amount, index) => (
        <Button
          key={index}
          variant={selectedAmount === amount ? "dark" : "outline-secondary"}
          onClick={() => {
            setAmount(amount)
            setSelectedAmount(amount)}}
        >
          {amount}
        </Button>
      ))}
    </ButtonGroup>
        <button style={{backgroundColor: "#03b529", marginBottom: "20px", marginTop:"30px", color: "#ffffff"}} onClick={()=>{
          if(!amount || amount < 200){
             setFieldError({amount: <p className='text-danger'> A minimum amount of 200 is required to be added to the wallet.</p>})
          }else{
            setGenerateQR(true)
          }
        }}>Generate QR Code</button>

          {generateQR && <div className="qr-code-section">
            <h3>Scan the QR Code</h3>
            <div ref={qrRef}>
            <QRCode value={upiUrl} size={200} />
            </div>
            <button className='mt-3 text-white' onClick={downloadQRCode}>Download QR Code</button>
          </div>}
        </div>

        {/* Form to Upload Screenshot */}
        <h4>Confirm Transaction</h4>
        <h6 style={{fontSize: "12px", color: "grey"}}>Review the payment details and complete transaction</h6>
        <hr />
        <form className="upload-screenshot-form">
          <h4>Enter UTR Number</h4>
          <input 
            type="number" 
            onChange={handleUTRChange}
            className='mb-3'
          />
          {fieldError?.utrNumber}
          <button onClick={(e)=>{
            e.preventDefault()
             if(!utrNumber || utrNumber.length < 12 || utrNumber.length > 12){
              setFieldError({utrNumber: <p className='text-danger'> UTR number length must be 12 digits.</p>})
           }else{
            handleSubmit()
           }
          }}>Submit for Verification</button>
        </form>
        <div className="instructions">
        <h4>How to pay with a QR code?</h4>
        <ul>
          <li>Screenshot or download the QR code.</li>
          <li>Open your UPI application, such as PhonePE, GooglePay, BHIM, etc., and select Send Money or simply scan the QR code.</li>
          <li>Review payment details and complete the transaction.</li>
          <li>Back in GodMoney, enter the UTR number and press Deposit.</li>
        </ul>
      </div>
      </div>
    
    </div>
  );
};

export default WalletAddMoney;
