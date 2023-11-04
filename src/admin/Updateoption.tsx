import React, { useEffect, useState } from 'react';
import { Modal, Switch, message } from 'antd';
// import { useSelector } from 'react-redux';
// import { StoreType } from '@/stores';
import apis from '@/services/apis';
import { useDispatch } from 'react-redux';
import { productAction } from '@/stores/slices/product.slice';

type UpdateProductProp = {
    option: any,

}



const UpdateOption: React.FC<UpdateProductProp> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setCategories] = useState([]);
    const dispatch = useDispatch()
    console.log("props", props.option);

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

    const onChange = (checked: boolean) => {
        setStatus(checked)
    };
    const [status, setStatus] = useState(props.option.status);

    const handleUpdate = async (eventForm: FormDataEvent) => {
        eventForm.preventDefault();
        let updateInfor = {
            title: (eventForm.target as any).title.value,
            status: status,
            price: (eventForm.target as any).price.value,
        };
        let formData = new FormData();
        formData.append("product", JSON.stringify(updateInfor));


        try {
            const res = await apis.productApi.updateoption(props.option.id, formData);

            console.log("res", res.data.serRes.data);

            if (res.status === 200) {
                dispatch(productAction.updateOption({ updatedOption: res.data.serRes.data }));
                message.success("Cập nhật sản phẩm thành công");
            } else {
                Modal.error({
                    content: res.data.message
                });
            }
        } catch (err) {
            console.log("err", err);

            // Xử lý lỗi ở đây nếu cần
        }
    }

    return (
        <>
            <button className="status update" onClick={showModal}>
                Update
            </button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={(e) => {
                    handleUpdate(e as any)
                }}>

                    <Switch checked={status} onChange={onChange} />
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
                        <label htmlFor="">Name</label><br /><input type="text" defaultValue={props.option.title} name='title' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Category</label><br />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Price</label><br /><input type="text" defaultValue={props.option.price} name='price' />
                    </div>
                    <button type='submit' style={{ background: "blue" }} >
                        Complete
                    </button>
                </form>

            </Modal >

        </>




    );
};

export default UpdateOption;