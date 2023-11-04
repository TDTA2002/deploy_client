import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./scss/cart.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {  Popconfirm } from 'antd';
import { StoreType } from '@/stores';
import { guestCartActions } from '@/stores/slices/guestCart.slice';

const text = 'Are you sure to delete this item?';
const description = 'Delete item';

// Define a union type for the allowed placement values
type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
    name: string;
    placement: OffcanvasPlacement | undefined; // Use the defined union type
}



function OffCanvasExample({  placement }: OffCanvasExampleProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })

    const cart = userStore.cart?.detail;
    const guest = guestCartStore.cart
    console.log("guest", guest);


    const subTotal = cart?.reduce((total: number, item: any) => {
        return total += item.quantity * item.option.price
    }, 0)
    const subTotalGu = guest?.reduce((total: number, item: any) => {
        return total += item.quantity * item.price
    }, 0)

    const handleChangeQuantity = (optionId: number, quantity: number) => {
        const cart = userStore.cart?.detail;
        if (cart) {
            if (userStore.socket) {
                userStore.socket.emit("addToCart", {
                    receiptId: userStore.cart?.id,
                    optionId,
                    quantity
                })
            }
        }
    }

    const hadleDeleteItemFromCart = (optionId: number) => {
        if (userStore.socket) {
            userStore.socket.emit("deleteItemFromCart", {
                receiptId: userStore.cart?.id,
                optionId,
            })
        }
    }


    const handleDeleteProduct = (optionId: string) => {
        console.log("đã vào ", optionId);

        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        console.log("cart", cart);

        let findResult = cart.find((itemFind: any) => itemFind.optionId === optionId)
        if (findResult) {
            cart = cart.filter((itemFind: any) => itemFind.optionId !== optionId)
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch(guestCartActions.setCart(cart))
        }
    }
    console.log("hadleDeleteItemFromCart", userStore.socket);

    return (
        <>
            <button onClick={handleShow} className='cart__button'>
                <span className="material-symbols-outlined" style={{ color: "white" }}>
                    shopping_bag
                </span>

                {
                    userStore.socket ? <span className='cart__quantity' style={{ color: "white" }}>{userStore.cart?.detail.reduce((value, cur) => {
                        return value += cur.quantity
                    }, 0)}</span>
                        : <span className='cart__quantity' style={{ color: "white" }}>{guestCartStore.cart?.reduce((value, cur) => {
                            return value + cur.quantity
                        }, 0)}</span>
                }
            </button>
            <Offcanvas show={show} onHide={handleClose} placement={placement}>
                <Offcanvas.Header className='cart-header'>
                    <Offcanvas.Title>{t("yourCart")} [{cart?.length}]</Offcanvas.Title>
                    {/* Close button */}
                    <Button variant="outline-secondary" onClick={handleClose} className='close-button'>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className='cart-body'>
                    <div className='cart-products'>
                        {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                            cart?.length || guest?.length > 0 ?
                                <>  {
                                    userStore.socket ? cart?.map((product: any) => <div className='cart-product' key={Math.random() * Date.now()}>
                                        <div className='cart-product-img'>
                                            <img src={product.option.pictures[0].icon} alt="" />
                                        </div>
                                        <div className='cart-product-infor'>
                                            <h5 className='cart-product-name'>{product.option.product.name}</h5>
                                            <p className='cart-product-price'>${product.option.price}</p>
                                            <p className='cart-product-quantity-title'>QUANTITY</p>
                                            <div className='cart-product-quantity'>
                                                <button>
                                                    <span className="material-symbols-outlined" onClick={(e) => {
                                                        const quantityElement = e.currentTarget.parentNode?.parentNode?.querySelector(".quantity-number");
                                                        if (Number(quantityElement?.innerHTML) > 1) {
                                                            handleChangeQuantity(product.optionId, Number(quantityElement?.innerHTML) - 1)
                                                        }
                                                    }}>
                                                        remove
                                                    </span>
                                                </button>
                                                <span className='quantity-number'>{product.quantity}</span>
                                                <button>
                                                    <span className="material-symbols-outlined" onClick={(e) => {
                                                        const quantityElement = e.currentTarget.parentNode?.parentNode?.querySelector(".quantity-number");
                                                        handleChangeQuantity(product.optionId, Number(quantityElement?.innerHTML) + 1)
                                                    }}>
                                                        add
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='delete-button'>
                                            <Popconfirm
                                                placement="bottomRight"
                                                title={text}
                                                description={description}
                                                onConfirm={() => {
                                                    hadleDeleteItemFromCart(product.optionId)
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button><span className="material-symbols-outlined">
                                                    close
                                                </span></button>
                                            </Popconfirm>
                                        </div>
                                    </div>)
                                        :
                                        guest?.map((product: any) => <div className='cart-product' key={Math.random() * Date.now()}>
                                            <div className='cart-product-img'>
                                                <img src={product.pictures.icon} alt="" />
                                            </div>
                                            <div className='cart-product-infor'>
                                                <h5 className='cart-product-name'>{product.product.name}</h5>
                                                <p className='cart-product-price'>${product.price}</p>
                                                <p className='cart-product-quantity-title'>QUANTITY</p>
                                                <div className='cart-product-quantity'>
                                                    <button>
                                                        <span className="material-symbols-outlined" onClick={(e) => {
                                                            const quantityElement = e.currentTarget.parentNode?.parentNode?.querySelector(".quantity-number");
                                                            if (Number(quantityElement?.innerHTML) > 1) {
                                                                let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                                                                let findResult = cart.find((itemResult: any) => itemResult.optionId === product.optionId)
                                                                if (findResult) {
                                                                    findResult.quantity = Number(quantityElement?.innerHTML) - 1
                                                                    localStorage.setItem("cart", JSON.stringify(cart))
                                                                    dispatch(guestCartActions.setCart(cart))
                                                                }
                                                            }
                                                        }}>
                                                            remove
                                                        </span>
                                                    </button>
                                                    <span className='quantity-number'>{product.quantity}</span>
                                                    <button>
                                                        <span className="material-symbols-outlined" onClick={(e) => {
                                                            const quantityElement = e.currentTarget.parentNode?.parentNode?.querySelector(".quantity-number");
                                                            let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                                                            let findResult = cart.find((itemResult: any) => itemResult.optionId === product.optionId)
                                                            if (findResult) {
                                                                findResult.quantity = Number(quantityElement?.innerHTML) + 1
                                                                localStorage.setItem("cart", JSON.stringify(cart))
                                                                dispatch(guestCartActions.setCart(cart))
                                                            }
                                                        }}>
                                                            add
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='delete-button'>
                                                <Popconfirm
                                                    placement="bottomRight"
                                                    title={text}
                                                    description={description}
                                                    onConfirm={() => {
                                                        handleDeleteProduct(product.optionId)
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button><span className="material-symbols-outlined">
                                                        close
                                                    </span></button>
                                                </Popconfirm>
                                            </div>
                                        </div>)
                                }
                                </>
                                : <div className='cart-empty-text'>Your Shopping cart is empty</div>
                        }
                    </div>
                    <div className='cart-footer'>
                        <p className='cart-total'>
                            <span className='cart-total-lable'>Subtotal</span>
                            <span className='cart-total-value'>$
                                {
                                    userStore.socket ? subTotal : subTotalGu
                                }
                            </span>
                        </p>
                        <button className='checkoutButton' onClick={() => navigate("/checkout")}>Checkout</button>
                        {/* <button className='checkoutButton' onClick={() => handleOrder()}>Checkout</button> */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function Cart() {
    return (
        <>
            <OffCanvasExample placement="end" name="end" />
        </>
    );
}

export default Cart;