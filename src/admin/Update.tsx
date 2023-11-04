import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
// import { useSelector } from 'react-redux';
// import { StoreType } from '@/stores';
import apis from '@/services/apis';
import { useDispatch } from 'react-redux';
import { productAction } from '@/stores/slices/product.slice';

type UpdateProductProp = {
    product: any,

}

interface Category {
    id: string;
    title: string;
    avatar: string;
}


const Update: React.FC<UpdateProductProp> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        apis.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    // alert(res.data.message)
                } else {
                    setCategories(res.data.data)
                }
            })
    }, [])

    const handleUpdate = async (eventForm: FormDataEvent) => {
        eventForm.preventDefault();
        let updateInfor = {
            categoryId: (eventForm.target as any).categoryId.value,
            name: (eventForm.target as any).name.value,
            des: (eventForm.target as any).des.value,
        };
        let formData = new FormData();
        formData.append("product", JSON.stringify(updateInfor));

        console.log("formData", updateInfor);

        try {
            const res = await apis.productApi.update(props.product.id, formData);

            console.log("res", res.status);

            if (res.status === 200) {
                dispatch(productAction.updateProduct({ updatedProduct: res.data.data }));
                message.success("Cập nhật sản phẩm thành công");
            } else {
                Modal.error({
                    content: res.data.message
                });
            }
        } catch (err) {
            // Xử lý lỗi ở đây nếu cần
        }
    }
    // const handleUpdate = (e: React.FormEvent, productId: number) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("product", JSON.stringify({
    //         categoryId: (e.target as any).categoriesId.value,
    //         name: (e.target as any).name.value,
    //         des: (e.target as any).des.value,
    //     }));

    //     // Gọi API update với productId được chuyền vào
    //     apis.productApi.update(productId, formData)
    //         .then(res => {
    //             dispatch(productAction.updateProduct(res.data.data))
    //         })
    // }

    return (
        <>
            <button className="status update" onClick={showModal}>
                Update
            </button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={(e) => {
                    handleUpdate(e as any)
                }}>
                    {/* <div className='product-image'>
                        <img style={{ width: "100px" }} src={props.product.avatar} alt="Product Avatar" ref={imgPreviewRef} />
                        <input
                            name="avatar"
                            onChange={(event) => {
                                if (imgPreviewRef.current) {
                                    if (event.target.files && event.target.files.length > 0) {
                                        const blobUrl = URL.createObjectURL(event.target.files[0]);
                                        imgPreviewRef.current.src = blobUrl;
                                    } else {
                                        console.log('Chưa chọn hình!');
                                    }
                                }
                            }}

                            type="file"
                        />
                    </div> */}
                    <div className='form-group'>
                        <label htmlFor="">Name</label><br /><input type="text" defaultValue={props.product.name} name='name' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Category</label><br />
                        <select name='categoryId' defaultValue={props.product.categoryId}>
                            {
                                categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Description</label><br />
                        <textarea name="des" defaultValue={props.product.des}></textarea>
                    </div>
                    <button type='submit' style={{ background: "blue" }} >
                        Complete
                    </button>
                </form>

            </Modal >

        </>




    );
};

export default Update;