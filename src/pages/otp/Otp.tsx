import React, { useEffect, useRef, useState } from 'react';
import './otp.scss'

const OtpVerification = () => {
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
        setOtpff(pastedValue)
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
    const [, setOtpff] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
    };



    return (
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

                            <button className="btn btn-primary mb-3" ref={button} disabled>
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




    );
};

export default OtpVerification;
// import React from 'react'

// export default function otp() {
//   return (
//     <div>otp</div>
//   )
// }
