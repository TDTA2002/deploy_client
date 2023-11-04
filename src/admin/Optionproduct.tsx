import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { useParams } from 'react-router-dom';
import { Option } from '@/interfaces/product.interface'
import Picture from './Picture';
import apis from '@/services/apis';
import { productAction } from '@/stores/slices/product.slice';
import UpdateOption from './Updateoption';



const Optionproduct: React.FC = ({ }) => {

    const { id } = useParams();
    const dispatch = useDispatch()
    const [optionData, setOptionData] = useState<Option[]>([])

    const productStore = useSelector((store: StoreType) => {
        return store.productStore
    })
    const [newOption, setNewOption] = useState({
        productId: id,
        price: '',
        title: '',
    });
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setNewOption({
            ...newOption,
            [name]: value,
        });
    };

    const handleAddOption = () => {

        apis.productApi.option(newOption)
            .then((res) => {
                dispatch(productAction.insertOptionProduct(res.data.data));
            });
    };

    useEffect(() => {
        if (id && productStore.data) {
            for (let i in productStore.data) {
                if (productStore.data[i].id == id) {
                    setOptionData(productStore.data[i].options)
                }
            }
        }
    }, [id, productStore.data])

    console.log("optionData", optionData);



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Products</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li>
                                <i className="bx bx-chevron-right" />
                            </li>
                            <li>
                                <a className="active" href="#">
                                    Category
                                </a>
                            </li>
                        </ul>
                    </div>

                    <a href="#" className="btn-download">
                        <i className="bx bxs-cloud-download" />
                        <span className="text" onClick={showModal}>Add New</span>
                    </a>

                    <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
                        handleOk();
                        handleAddOption();
                    }}
                        onCancel={handleCancel}>
                        <div>
                            <input
                                type="text"
                                name="price"
                                placeholder="Nhập giá option"
                                value={newOption.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="Nhập title option"
                                value={newOption.title}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Modal>


                </div>
                {/* <Addcategory /> */}

                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Categories</h3>
                            <i className="bx bx-search" />
                            <i className="bx bx-filter" />
                        </div>
                        <table>
                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>title</th>
                                    <th>price</th>
                                    <th>status</th>
                                    <th>picture</th>
                                    <th>Handle</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    optionData?.map((option, index: number) => {
                                        return (
                                            <tr key={option.id} className='category'>
                                                <td >{index + 1}</td>
                                                <td>{option.title}</td>
                                                <td>{option.price}</td>

                                                <td>
                                                    {option.status ? <button className="status completed">completed</button> : <button className="status pending">pending</button>}

                                                </td>
                                                {/* <td className="status update">{option.status ? "Đang bán" : "Đang Ẩn"}</td> */}
                                                <td>

                                                    <Picture optionId={option.id} productId={id} />

                                                </td>
                                                <td>  <UpdateOption option={option} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>

                    </div>

                </div>
            </main >
            {/* {
                optionId && <Picture setOptionId={setOptionId} optionId={optionId} productId={id} />
            } */}

        </>
    );
};

export default Optionproduct;