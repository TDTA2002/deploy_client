import './home.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbars/Navbar'
import Footer from './components/Footers/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, MenuProps, Modal } from 'antd';
import ToggleLanguage from '@/components/Dropdown';
import { userAction } from '@/stores/slices/user.slice';
export default function Home() {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const userStore = useSelector((store: StoreType) => store.userStore);

  const checkAdmin = () => {
    if (userStore.data?.role == "ADMIN") {
      setIsAdmin(!isAdmin)
    }
  }

  useEffect(() => {
    checkAdmin()
  }, [userStore])
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    Modal.confirm({
      content: t("confirmLogout"),
      onOk: () => {
        localStorage.removeItem("token");
        userStore.socket?.disconnect();
        dispatch(userAction.setCart(null))
        dispatch(userAction.setData(null))
        dispatch(userAction.setReceipt(null))
        dispatch(userAction.setSocket(null))
      },
    });
  };


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => navigate("/profile")}>
          Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (


        < >
          {isAdmin ? <a target="_blank" onClick={() => navigate("/admin")}>Admin</a> : <a target="_blank" rel="noopener noreferrer" onClick={() => navigate("/receipt")}>Receipt</a>
          }
        </>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => handleLogout()}>
          Log out
        </a>
      ),
    },
  ];

  return (
    <div className="root_page">
      <section className="before_nav">
        <div className="before_nav_content">

          <div >

          </div>
          <div className="feature">
            <span className="feature_item"><ToggleLanguage /></span>
            {/* <span className="feature_item">  {isAdmin ? <span onClick={() => navigate("/admin")}>Admin</span> : <span onClick={() => navigate("/check-order")}>Receipt</span>}</span> */}


            <>
              {userStore?.data?.userName ? (

                <Dropdown menu={{ items }} placement="bottom" arrow>
                  <span className="feature_item"  >{userStore.data.userName} </span>
                </Dropdown>

              ) : (
                <>
                  <span onClick={() => navigate("/login")} className="feature_item">
                    Login
                  </span>
                  <span onClick={() => navigate("/register")} className="feature_item">
                    Register
                  </span>
                </>


              )}
            </>
          </div>
        </div>

      </section >
      {/* Navbar */}
      < Navbar />

      {/* <Carousel /> */}
      {/* Body */}
      {/* <Test /> */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div >
  )
}
