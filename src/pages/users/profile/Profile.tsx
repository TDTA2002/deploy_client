import { useEffect, useState } from 'react';
import './profile.scss';
import { StoreType } from '@/stores';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { User } from "@slices/user.slice";
// import ChangeAvatar from '../changeAvatar/ChangeAvatar';
import apis from '@/services/apis';
import ChangePassword from '../changepass/ChangePassword';

export default function ProfilePage() {
    const [loading, setLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const userStore = useSelector((store: StoreType) => store.userStore);

    function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        let data = {
            oldPassword: (e.target as any).oldPassword.value,
            newPassword: (e.target as any).newPassword.value
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

    function handleResendEmail() {
        setIsLoading(true);
        apis.userApi.resendemail()
            .then(res => {
                console.log("res", res);
                if (res.status == 200) {
                    console.log("res", res);
                    message.success(res.data);
                    setIsLoading(false);
                }
                if (res.status == 213) {
                    message.warning(res.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("err", err);
            })
    }

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         window.location.href = "/"
    //     }
    // }, [])

    return (
        <section style={{ backgroundColor: '#eee', }}>
            <MDBContainer className="py-5">
         

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <img
                                    src={userStore.data?.avatar}
                                    alt="avatar"
                                    className="avatar"
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <div className="d-flex justify-content-center mb-2">
                                    {/* <ChangeAvatar /> */}
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>User Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userStore.data?.userName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {userStore.data?.email}
                                            <br />
                                            <button className="sendAuthEmail__button" onClick={() => handleResendEmail()}>{isLoading ? <span className='loading-spinner'></span> : "Send authentication email"}</button>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Password</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">***** <ChangePassword /></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}