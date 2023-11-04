import './main.scss';
import RouteSetup from '@routes/RouteSetup';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from './stores'
import api from '@services/apis'
import { useEffect } from 'react';
import { Receipt, User, userAction } from './stores/slices/user.slice';
import { categoryAction } from './stores/slices/category.slice';
import { Socket, io } from 'socket.io-client'
import { receiptAction } from './stores/slices/receipt.slice';
import { Modal } from 'antd';
import { guestCartActions } from './stores/slices/guestCart.slice';

function App() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.userStore);

  const receiptStore = useSelector((store: StoreType) => {
    return store.receiptStore
  })

  useEffect(() => {
    dispatch(guestCartActions.setCart(JSON.parse(localStorage.getItem("cart") || "[]")))
  }, [])

  useEffect(() => {
    api.userApi.authentication()
      .then(res => {
        console.log("res", res)
        if (res.status == 200) {
          dispatch(userAction.setData(res.data.data))
        }
        if (res.status == 213) {
          // localStorage.removeItem("token")
        }
        // console.log("res", res)
      })
      .catch(err => {
        console.log("err", err);
      })
  }, [])
  useEffect(() => {
    if (userStore) {

      if (!receiptStore.socket) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token: localStorage.getItem("token")
          }
        })
        dispatch(receiptAction.connectSocket(
          socket
        ))
      } else {
        receiptStore.socket.on("onCart", (cart: any) => {
          dispatch(receiptAction.setCart(cart))
        })

        receiptStore.socket.on("onReceipt", () => {

        })
      }
    }
  }, [userStore, receiptStore])


  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token");
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {
          if (data.status) {
            console.log(data.message)
          } else {
            console.log(data.message)
          }
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setData(null))
          console.log("đã out")
        })

        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setData(user))
          console.log("user", user);

        })

        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          dispatch(userAction.setReceipt(receipts))
        })

        socket.on("receiveCart", (cart: Receipt) => {
          dispatch(userAction.setCart(cart))
        })

        socket.on("cash-status", (status: boolean) => {
          if (status) {
            Modal.success({
              title: "Đã thanh toán thành công",
              content: "Cảm ơn bạn đã mua hàng",
              onOk: () => {
                console.log("đã vào!")
                window.location.href = "/receipt"
              }
            })
          }
        })

        socket.on("payQr", (url: string | null) => {
          dispatch(userAction.setCartPayQr(url))
          if (!url) {
            Modal.confirm({
              title: "Thanh toán thất bại",
              content: "Bạn có muốn thanh toán lại không?",
              onOk: () => {
                socket.emit("payZalo", {
                  receiptId: userStore.cart?.id,
                  userId: userStore.data?.id
                })
              },
              onCancel: () => {
                window.location.href = "/checkout"
              }
            })
          }
        })


        dispatch(userAction.setSocket(socket))
      }
    }
  }, [userStore.reLoad])

  useEffect(() => {
    console.log("userStore.cart", userStore.cart)
  }, [userStore.cart])

  useEffect(() => {
    console.log("userStore.receipt", userStore.receipts)
  }, [userStore.receipts])
  useEffect(() => {
    api.categoryApi.findMany()
      .then(res => {
        // console.log("res", res)
        if (res.status == 200) {
          dispatch(categoryAction.setCategoryData(res.data.data))
        } else {
        }
      })
      .catch(() => {
        
      })
  }, []);



  return (
    <>

      <RouteSetup />

    </>
  )
}

export default App
