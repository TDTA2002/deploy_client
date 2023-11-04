import { useEffect, useState } from 'react';
import './productDetail.scss';
import { useParams } from 'react-router-dom';
import apis from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
// import ProductPopup from '../ProductPopup/ProductPopup';
import { FacebookProvider, Comments } from 'react-facebook';
import { ReceiptDetail } from '@/stores/slices/user.slice';
import { message } from 'antd';
import { guestCartActions } from '@/stores/slices/guestCart.slice';

interface Product {
    id: string,
    name: string,
    des: string,
    price: number,
    options: any[]
}

export default function ProductDetail() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedOption, setSelectedOption] = useState(0); // Added state for selected option
    const [, setIsOpenModal] = useState(false);
    const [, setProductData] = useState<Product | null>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            apis.productApi.findById(id)
                .then(res => {
                    if (res.status === 200) {
                        setProduct(res.data.data)
                    }
                })
        }
    }, [id])

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
    }

    function handleChangeImage(url: string) {
        const mainImage = document.querySelector('.main__product__image') as HTMLImageElement;
        if (mainImage) {
            mainImage.src = url;
        }
    }

    const handleAddToCart = () => {
        const cart = userStore.cart?.detail;
        if (cart && product && product.options && product.options[selectedOption]) {
            console.log("vào");

            const selectedProductOption = product.options[selectedOption];
            const foundItem = cart.find((item: ReceiptDetail) => item.optionId === selectedProductOption.id);

            if (foundItem) {
                const quantity = foundItem.quantity + 1;
                if (userStore.socket) {
                    userStore.socket.emit("addToCart", {
                        receiptId: userStore.cart?.id,
                        optionId: selectedProductOption.id,
                        quantity
                    });
                }

                setProductData(selectedProductOption);
                setIsOpenModal(true);
                message.success("Add To Cart Successfully");

                setTimeout(() => {
                    setIsOpenModal(false);
                }, 2000);
            } else {
                if (userStore.socket) {
                    userStore.socket.emit("addToCart", {
                        receiptId: userStore.cart?.id,
                        optionId: selectedProductOption.id,
                        quantity: 1,
                    });
                }
            }
        } else {
            const selectedProductOption = product?.options[selectedOption];
            console.log("selectedProductOption", selectedProductOption);

            let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
            console.log("cart", cart);

            let findResult = cart.find((item: ReceiptDetail) => item.optionId === selectedProductOption.id)
            console.log("findResult", findResult);

            if (findResult) {
                findResult.quantity += 1
                localStorage.setItem("cart", JSON.stringify(cart))
            } else {
                cart.push({
                    optionId: selectedProductOption.id,
                    pictures: selectedProductOption.pictures[selectedOption],
                    price: selectedProductOption.price,
                    product: {
                        name: product?.name,
                    },
                    quantity: 1,
                })
                localStorage.setItem("cart", JSON.stringify(cart))
            }
            dispatch(guestCartActions.setCart(cart))
        }
    }

    return (
        <>
            <div className='ProductDetail'>
                <div className='ProductDetail__image'>
                    <div className='ProductDetail__image__options'>
                        {product?.options[selectedOption].pictures.map((item: any, index: number) => (
                            <div key={index}>
                                <img src={item.icon} alt="" onClick={() => handleChangeImage(item.icon)} />
                            </div>
                        ))}
                    </div>
                    <div className='ProductDetail__image__main'>
                        <img src={product?.options[selectedOption].pictures[0].icon} alt="" className='main__product__image' />
                    </div>
                </div>
                <div className='ProductDetail__infor'>
                    <h5 >{product?.name}</h5>
                    <p>${product?.options[selectedOption].price}</p>
                    <div className='ProductDetail__infor__options'>
                        {product?.options.map((item: any, index: number) => (
                            <div key={index}>
                                <img src={item.pictures[0].icon} alt="" onClick={() => handleOptionClick(index)} />
                            </div>
                        ))}
                    </div>

                    <p>{product?.des}</p>

                    <button className='Add__btn' onClick={handleAddToCart}>Add to Cart</button>

                </div>


            </div>


            <div style={{ display: "flex", justifyContent: "center", position: "relative", right: "140px", marginBottom: "20px" }}>
                <div style={{ background: "white" }}>
                    <FacebookProvider appId="1522774828490758" >
                        <Comments href={`https://github.com/TDTA2002/${id}`} width="850" numPosts={5} />
                    </FacebookProvider>
                </div>
            </div>
        </>
    )
}

