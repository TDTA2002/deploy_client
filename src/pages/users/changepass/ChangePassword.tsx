import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './change.scss';
import { message } from 'antd';
import apis from '@/services/apis';

function ChangePassword() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        let data = {
            oldPassword: currentPassword,
            newPassword: newPassword
        }
        apis.userApi.changePassword(data)
            .then(res => {
                console.log("res", res)
                if (res.status == 200) {
                    setLoading(false);
                    message.success("Please check email");
                }
                if (res.status == 213) {
                    setLoading(false);
                    message.warning(res.data.message);
                }
            })
            .catch(err => {
                setLoading(false);
                for (let i in err.response.data.message) {
                    message.warning(err.response.data.message[i])
                }
            })
    }

    return (
        <div className='changePassword'>
            <button onClick={handleShow} className='changePassword__button'>
                Change password
            </button>

            <Modal show={show} onHide={handleClose}>
                <div className='changePassword__form'>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <input className='changePassword__form__input' type="text" onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Current password' />
                        </div>
                        <div>
                            <input className='changePassword__form__input' type="text" onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='changePassword__btn' onClick={(e) => handleChangePassword(e)}>
                            {loading ? <span className='loading-spinner'></span> : "Submit"}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}

export default ChangePassword;