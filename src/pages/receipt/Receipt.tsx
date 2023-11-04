import { useEffect, useRef, useState } from 'react';
import './receipt.scss';
// import ReceiptDetail from './ReceiptDetail';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import moment from 'moment';
import axios from 'axios';

interface Receipt {
    id: string,
    status: string,
    total: number,
    createAt: Date,
    email: string,
    payMode: string
}

export default function Receipt() {

    const [emailInput, setEmailInput] = useState("");
    const [receipts, setReceipts] = useState([]);
    const [, setIsShowOTP] = useState(false);
    const [otp, setOtp] = useState("");
    console.log("otp", otp);

    const userStore = useSelector((store: StoreType) => store.userStore);


    function handleGetReceipt(email: string, otp: string) {
        console.log("da vao ")
        axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${email}&otp=${otp}`)
            .then(res => {
                console.log("res", res)
                setReceipts(res.data.data)
            })
            .catch(() => {
                alert("Lỗi!")
            })

    }
    console.log("email", otp);

    function handleGetOtp(email: string) {
        axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${email}`)
            .then(res => {
                if (res.status == 200) {
                    message.success("Please check your email");
                    setIsShowOTP(true)
                }
            })
        setShowPurchaseHistory(false);

    }

    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const button = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        inputs.current[0]?.focus();
        button.current?.setAttribute('disabled', 'disabled');
    }, []);
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        const pastedValue = event.clipboardData?.getData('text') || (window as any).clipboardData?.getData('text');
        const otpLength = inputs.current.length;

        for (let i = 0; i < otpLength; i++) {
            if (i < pastedValue.length) {
                inputs.current[i]!.value = pastedValue[i];
                inputs.current[i]!.removeAttribute('disabled');
                inputs.current[i]!.focus();
            } else {
                inputs.current[i]!.value = '';
                inputs.current[i]!.focus();
            }
        }
        setOtp(pastedValue)
    };
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index1: number) => {
        const currentInput = inputs.current[index1];
        const nextInput = inputs.current[index1 + 1];
        const prevInput = inputs.current[index1 - 1];

        if (currentInput!.value.length > 1) {
            currentInput!.value = '';
            return;
        }

        if (nextInput && nextInput.hasAttribute('disabled') && currentInput!.value !== '') {
            nextInput.removeAttribute('disabled');
            nextInput.focus();
        }

        if (e.key === 'Backspace') {
            inputs.current.forEach((input, index2) => {
                if (index1 <= index2 && prevInput) {
                    input!.setAttribute('disabled', 'true');
                    input!.value = '';
                    prevInput!.focus();
                }
            });
        }

        button.current?.classList.remove('active');
        button.current?.setAttribute('disabled', 'disabled');

        const inputsNo = inputs.current.length;
        if (!inputs.current[inputsNo - 1]!.disabled && inputs.current[inputsNo - 1]!.value !== '') {
            button.current?.classList.add('active');
            button.current?.removeAttribute('disabled');
        }
    };

    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
    };

    const [showPurchaseHistory, setShowPurchaseHistory] = useState(true);
    console.log("showPurchaseHistory", showPurchaseHistory);

    return (
        <div >
            <div className="d-flex">
                <section className="invoice-list-page">
                    <div className="invoice-list-page__header">
                        <div className="container">
                            <div className="d-flex flex-row align-items-center">
                                <div className="col">
                                    <h2>Invoices</h2>
                                    <p className="detail">
                                        There are <span>{receipts.length}</span> total invoices
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    {
                        userStore.data ? <div className="invoice-list-page__content">
                            <div className="container">
                                {userStore.receipts?.map((receipt: any, index: number) => (
                                    <div className="invoice-item">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="col">
                                                <span className="id">
                                                    #<span>{index + 1}</span>
                                                </span>
                                            </div>
                                            <div className="col text-truncate" color='#454545'>
                                                <span className="date" >{moment(new Date(Number((receipt as Receipt).createAt.toLocaleString()))).format('DD/MM LT')}</span>

                                            </div>
                                            <div className="col">
                                                <span className="company">{(receipt as Receipt).payMode}</span>
                                            </div>
                                            <div className="col text-end">
                                                <span className="amount">$ {(receipt as Receipt).total}</span>
                                            </div>
                                            <div className="col-3 text-center">
                                                <span className="status status--pending">{(receipt as Receipt).status}</span>
                                            </div>
                                            <div className="col-1 text-end">
                                                <button className="btn btn-arrow">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-chevron-right"
                                                    >
                                                        <polyline points="9 18 15 12 9 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> :

                            <div className="invoice-list-page__content">
                                {showPurchaseHistory && (
                                    <div className='otp__container'>
                                        <input value={emailInput} onChange={(e) => {
                                            setEmailInput(e.target.value)
                                        }} type="text" placeholder='your email' style={{ border: "1px solid black", padding: "7px" }} />
                                        <button onClick={() => handleGetOtp(emailInput)}>Get OTP</button>
                                    </div>
                                )}
                                {!showPurchaseHistory &&
                                    <div>
                                        <div>
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: '500px' }}>
                                                    <div className="card bg-white mb-5 mt-5 border-0" style={{ boxShadow: '0 12px 15px rgba(0, 0, 0, 0.02)' }}>
                                                        <div className="card-body p-5 text-center">
                                                            <h4>Verify</h4>
                                                            <p>Your code was sent to you via email</p>

                                                            <div className="otp-field mb-4">
                                                                {inputValues.map((_, index) => (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        onPaste={handlePaste}
                                                                        onChange={(e) => handleInputChange(e, index)}
                                                                        onKeyUp={(e) => handleKeyUp(e, index)}
                                                                        ref={(el) => (inputs.current[index] = el)}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <button className="btn btn-primary mb-3" onClick={() => handleGetReceipt(emailInput, otp)}>
                                                                Verify
                                                            </button>

                                                            <p className="resend text-muted mb-0">
                                                                Didn't receive code? <a href="">Request again</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div>}

                                <div className="container">
                                    {receipts?.map((receipt: any, index: number) => (
                                        <div className="invoice-item">
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="col">
                                                    <span className="id">
                                                        #<span>{index + 1}</span>
                                                    </span>
                                                </div>
                                                <div className="col text-truncate" color='#454545'>
                                                    <span className="date" >{moment(new Date(Number((receipt as Receipt).createAt.toLocaleString()))).format('DD/MM LT')}</span>

                                                </div>
                                                <div className="col">
                                                    <span className="company">{(receipt as Receipt).payMode}</span>
                                                </div>
                                                <div className="col text-end">
                                                    <span className="amount">$ {(receipt as Receipt).total}</span>
                                                </div>
                                                <div className="col-3 text-center">
                                                    <span className="status status--pending">{(receipt as Receipt).status}</span>
                                                </div>
                                                <div className="col-1 text-end">
                                                    <button className="btn btn-arrow">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    }
                </section>
            </div>

        </div>


    )
}