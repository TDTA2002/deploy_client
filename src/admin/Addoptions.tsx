import { productAction } from '@/stores/slices/product.slice'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Addoptions() {
    const { id } = useParams();
    function dispatch(_arg0: any) {
        throw new Error('Function not implemented.')
    }
    return (
        <div>
            <button onClick={() => {
                let newOption = {
                    productId: id,
                    price: Number(window.prompt("Nhập giá option")),
                    title: window.prompt("Nhập title option")
                }
                axios.post("http://localhost:3000/api/v1/product-options", newOption)
                    .then(res => {
                        dispatch(productAction.insertOptionProduct(res.data.data))
                    })
            }}>Thêm Mới</button>
        </div>
    )
}
