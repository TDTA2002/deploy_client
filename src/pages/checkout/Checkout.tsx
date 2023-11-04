import { useEffect, useState } from 'react';
import './checkout.scss';
import { StoreType } from '@/stores';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, QRCode } from 'antd';
import { useNavigate } from 'react-router-dom';
import { guestCartActions } from '@/stores/slices/guestCart.slice';
import apis from '@/services/apis';

// interface Product {
//   id: string;
//   name: string;
//   avatar: string;
//   price: number;
//   des: string;
//   categoryId: string;
//   productPictures: {
//     id: string;
//     icon: string;
//   }[]
// }


export default function Checkout() {
  // const [cart, setCart] = useState<CartItemDetail[]>([]);
  const [loading] = useState(false);
  const [isLogin] = useState(localStorage.getItem("token"));
  const userStore = useSelector((store: StoreType) => store.userStore);
  const guestCartStore = useSelector((store: StoreType) => store.guestCartStore);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let cart = userStore.cart?.detail
  let guest = guestCartStore.cart
  console.log("guest", guest);


  function handleCheckOut(e: React.FormEvent) {
    e.preventDefault();
    let payMode = (e.target as any).payMode.value;

    if (payMode == "CASH") {
      userStore.socket?.emit("payCash", {
        receiptId: userStore.cart?.id,
        userId: userStore.data?.id
      })
    }

    if (payMode == "ZALO") {
      userStore.socket?.emit("payZalo", {
        receiptId: userStore.cart?.id,
        userId: userStore.data?.id
      })
    }
  }
  const subTotal = cart?.reduce((total: number, item: any) => {
    return total += item.quantity * item.option.price
  }, 0)

  const subTotalGu = guest?.reduce((total: number, item: any) => {
    return total += item.quantity * item.price
  }, 0)

  function handleCheckOutGu(e: React.FormEvent) {
    e.preventDefault();

    /* guest */
    let guest = {
      name: (e.target as any).name.value,
      numberPhone: (e.target as any).numberPhone.value,
      email: (e.target as any).email.value
    }
    /* guest */
    let payMode = (e.target as any).payMode.value;

    if (userStore.socket) {
      if (payMode == "CASH") {
        userStore.socket?.emit("payCash", {
          receiptId: userStore.cart?.id,
          userId: userStore.data?.id
        })
      }

      if (payMode == "ZALO") {
        userStore.socket?.emit("payZalo", {
          receiptId: userStore.cart?.id,
          userId: userStore.data?.id
        })
      }
    } else {
      console.log("payMode", payMode)
      console.log("guest", guest)

      let carFormat = guestCartStore.cart?.map((item) => {
        return {
          optionId: item.optionId,
          quantity: item.quantity
        }
      })

      let body = {
        guest,
        receiptDetails: carFormat,
        payMode,
        total: subTotalGu
      }

      apis.guestCartApi.checktt(body)
        .then((res) => {
          if (res.status == 200) {
            Modal.success({
              title: "Thanh toán thành công, hóa đơn đã gửi đến email của bạn",
              content: "bạn có thể bấm ok để qua trang kiểm tra lịch sử mua hàng",
              onOk: () => {
                dispatch(guestCartActions.setCart([]))
                localStorage.setItem("cart", "[]")
                navigate("/receipt")
              }
            })
          } else {
            alert("Lỗi")
          }
        })
        .catch(() => {
          alert("Lỗi")
        })
    }
  }


  useEffect(() => {
    if (userStore.cartPayQr) {
      navigate("/qrcode")
    }
  }, [userStore.cartPayQr])

  return (
    <>
      <div>
        <div></div>
        <main role="main">
          <div className="container mt-4">

            <input type="hidden" name="kh_tendangnhap" defaultValue="dnpcuong" />
            <div className="py-5 text-center">
              <i className="fa fa-credit-card fa-4x" aria-hidden="true" />
              <h2>Check Out</h2>

            </div>
            <div className="row">

              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Cart</span>
                  <span className="badge badge-secondary badge-pill">{cart?.length}</span>
                </h4>

                {cart?.length || guest?.length > 0 ?
                  <>
                    {
                      userStore.socket ? cart?.map((product) => (
                        <div >
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                              <img src={product.option.pictures[0].icon} alt="" style={{ width: "50px" }} />
                              <div>
                                <h6 className="my-0">{product.option.name}</h6>
                                <small className="text-muted">${product.option.price} x {product.quantity}</small>
                              </div>
                            </div>
                            <span className="text-muted">${product.option.price * product.quantity}</span>
                          </li>
                        </div>
                      )) : guest?.map((product: any) => (
                        <div >
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                              <img src={product?.pictures.icon} alt="" style={{ width: "50px" }} />
                              <div>
                                <h6 className="my-0">{product.product.name}</h6>
                                <small className="text-muted">${product.price} x {product.quantity}</small>
                              </div>
                            </div>
                            <span className="text-muted">${product.price * product.quantity}</span>
                          </li>
                        </div>
                      ))}
                  </>
                  : <div>Your Order is empty</div>}
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>$Total</span>
                    <strong>$
                      {
                        userStore.socket ? subTotal : subTotalGu
                      }</strong>
                  </li>
                </ul>

              </div>
              <div className="col-md-8 order-md-1">
                <div className='main'>

                  {
                    isLogin ? <form action="" onSubmit={(e) => handleCheckOut(e)}>
                      <div className="form-group">
                        <input type="text" placeholder='Email' required className='email' name='email' />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder='Address' required className='address' />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder='Apartment, suite, etc. (optional)' required className='apartment' />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder='Phone (optional)' required className='phone' name='phone' />
                      </div>
                      <div className='payMode'>
                        <div className='cash'>
                          <input type="radio" name='payMode' value="CASH" /> <span>CASH</span>
                        </div>
                        <div className='zalo'>
                          <input type="radio" name='payMode' value="ZALO" /> <span>ZALO</span>
                        </div>
                      </div>

                      <button className='continue-button' type='submit'> {loading ? <span className='loading-spinner'></span> : "Continue to shipping"}
                      </button>
                    </form>
                      :
                      <form action="" onSubmit={(e) => handleCheckOutGu(e)}>
                        <div>
                          {/* <div>
                            name  <input type="text" name='name' />
                          </div>
                          <div>
                            numberPhone  <input type="text" name='numberPhone' />
                          </div>
                          <div>
                            email  <input type="text" name='email' />
                          </div> */}

                          <div className="form-group">
                            <input type="text" placeholder='Email' required className='email' name='email' />
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder='Name' required className='email' name='name' />
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder='Address' required className='address' />
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder='Apartment, suite, etc. (optional)' required className='apartment' />
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder='Phone (optional)' required className='phone' name='numberPhone' />
                          </div>
                        </div>
                        <div className='payMode'>
                          <div className='cash'>
                            <input type="radio" name='payMode' value="CASH" /> <span>CASH</span>
                          </div>
                          <div className='zalo'>
                            <input type="radio" name='payMode' value="ZALO" /> <span>ZALO</span>
                          </div>
                        </div>

                        <button className='continue-button'> {loading ? <span className='loading-spinner'></span> : "Continue to shipping"}
                        </button>
                      </form>
                  }
                  <div className='checkout-content'></div>
                </div>
                <hr className="mb-4" />

              </div>

            </div>
          </div>
          {/* End block content */}
        </main>
        {
          userStore.cartPayQr && <QRCode value={userStore.cartPayQr} icon='https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2022/7/9/photo1657324993775-1657324993859181735127.jpg' />
        }
      </div>
    </>

  )
}
