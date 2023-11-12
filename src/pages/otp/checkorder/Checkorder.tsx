import { Receipt } from '@/stores/slices/user.slice'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function PurchaseHistory() {
    const [email, setEmail] = useState('')
    const [receipts, setReceipts] = useState<Receipt[] | null>(null)
    useEffect(() => {
        console.log("receipts", receipts)
    }, [receipts])

    const handleClick = () => {
        if (email !== '') {
            /* Gửi yêu cầu OTP */
            console.log("Đã vào!");

            // Gửi yêu cầu kiểm tra email
            axios.get(`https://deployserver-production-76d9.up.railway.app/api/v1/guest/?email=${email}`)
                .then(_emailResponse => {
                    // Yêu cầu người dùng nhập OTP
                    let otp = window.prompt("Nhập OTP của bạn (kiểm tra email của bạn):");
                    if (otp !== '') {
                        // Gửi yêu cầu kiểm tra email và OTP
                        axios.get(`https://deployserver-production-76d9.up.railway.app/api/v1/guest/?email=${email}&otp=${otp}`)
                            .then(otpResponse => {
                                console.log("Kết quả từ server:", otpResponse);
                                setReceipts(otpResponse.data.data);
                            })
                            .catch(_err => {
                                alert("Lỗi!");
                            });
                    } else {
                        // Người dùng không nhập OTP
                        alert("Vui lòng nhập OTP.");
                    }
                })
                .catch(_err => {
                    alert("Lỗi khi kiểm tra email!");
                });
        } else {
            // Email không hợp lệ
            alert("Vui lòng nhập email.");
        }
    };

    return (
        <div>
            <h2>PurchaseHistory</h2>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} type="text" placeholder='your email' />
            <button onClick={() => handleClick()}>get receipt</button>
        </div >
    )
}
