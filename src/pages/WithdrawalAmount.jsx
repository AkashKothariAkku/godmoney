import { useEffect, useState } from 'react';
import '../assets/css/walletaddmoney.css';
import { Header } from '../components/Header';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WithdrawalAmount = () => {
    const navigate = useNavigate()
    const [amount, setAmount] = useState(200);
    const [bankAccount, setBankAccount] = useState([]);
    const [fieldError, setFieldError] = useState();
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const handleChangeAmount = (e) => {
        setFieldError()
        setSelectedAmount()
        setAmount(e.target.value);
    };

    const getBankAccount = () => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/get-bank-account`, {
            withCredentials: true,
            headers: {
              Authorization: localStorage.getItem("token")
            }
        })
            .then(function (response) {
                console.log(response);
                setBankAccount(response?.data?.data)
                if(response?.data?.data?.length>0){
                setSelectedAccount(response?.data?.data[0]?._id)
                }
            })
            .catch(function (error) {
                console.log(error);
                toast(error?.response?.data?.message)
            });
    }

    useEffect(() => {
        setFieldError()
    }, [amount])

    useEffect(() => {
        getBankAccount()
    }, [])

    // Handle form submission
    const handleSubmit = () => {
        if(!amount || amount < 200){
            setFieldError(prev => {
                return {...prev, amount: <p className='text-danger'>Amount must be greater then or equal to 200 </p>}
            })
            return 
        }
        if(!selectedAccount){
            setFieldError(prev => {
                return {...prev, account: <p className='text-danger'>Please add or select one account </p>}
            })
            return
        }
        axios.post(`${import.meta.env.VITE_BASE_URL}/withdraw-request`, {amount, bankAccountId: selectedAccount}, {
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
    return (
        <div className="wrapper">
            <ToastContainer />
            <div className="home-container wallet-container">
                {/* Header Section */}
                <Header />
                <h2>Withdraw Amount</h2>

                <div className="upload-screenshot-form">
                    <h4>Enter Amount</h4>
                    <input
                        type="number"
                        onChange={handleChangeAmount}
                        min={200}
                        value={amount}
                        required
                    />
                    {fieldError?.amount}
                </div>
                {/* QR Code and UPI ID Section */}
                <div className="payment-info">
                    <ButtonGroup>
                        {amounts.map((amount, index) => (
                            <Button
                                key={index}
                                variant={selectedAmount === amount ? "dark" : "outline-secondary"}
                                onClick={() => {
                                    setAmount(amount)
                                    setSelectedAmount(amount)
                                }}
                            >
                                {amount}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>

                {/* Form to Upload Screenshot */}
                <h4>Confirm Bank Account</h4>
                <NavLink className="text-end" to={"/add-bank-account"}><p style={{ marginBottom: "20px", marginTop: "10px", textDecoration: "underline" }}>+Add Bank Account</p></NavLink>
                {bankAccount?.map((e) => (
                    <div className="winner-item" key={e.id} onClick={() => setSelectedAccount(e._id)}>
                        <div className="winner-info">
                            <input
                                type="radio"
                                name="selectedAccount"
                                value={selectedAccount}
                                checked={selectedAccount === e._id}
                                onClick={() => setSelectedAccount(e._id)}
                            />
                            <div className="winner-details">
                                <h3>{e.name}</h3>
                                <p>IFSC Code: {e.ifscCode}</p>
                                <p>Bank Name: {e.bankName}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {fieldError?.account}
                <Button onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }
                }>Submit</Button>
            </div>
        </div>
    );
};

export default WithdrawalAmount;
