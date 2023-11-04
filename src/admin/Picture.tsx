import React, { useEffect, useState } from 'react'
import { Picture as PictureType } from '../interfaces/product.interface'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '@/stores'
import { productAction } from '@/stores/slices/product.slice'
import { Button, Modal } from 'antd';
import apis from '@/services/apis'

export default function Picture({ optionId, productId }: { optionId: string | null, productId: any }) {
    const dispatch = useDispatch()
    const productStore = useSelector((store: StoreType) => {
        return store.productStore
    })
    const [pictures, setPictures] = useState<PictureType[]>([])

    useEffect(() => {
        if (productStore.data) {
            for (let i in productStore.data) {
                if (productStore.data[i].id == productId) {
                    for (let j in productStore.data[i].options) {
                        if (productStore.data[i].options[j].id == optionId) {
                            setPictures(productStore.data[i].options[j].pictures)
                        }
                    }
                }
            }
        }
    }, [optionId, productStore.data])


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
            <Button type="primary" onClick={showModal}>
                Add Picture
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files?.length != 0) {
                            let formData = new FormData();
                            for (let file of e.target.files!) {
                                formData.append("pictures", file)
                            }
                            apis.productApi.picture(optionId, formData)
                                .then(res => {
                                    dispatch(productAction.insertPictureOptionProduct({
                                        productId,
                                        optionId,
                                        pictures: res.data.data
                                    }))
                                })
                        }
                    }} type="file" multiple placeholder='Thêm Ảnh' />
                </div>
                <ul>
                    {
                        pictures?.map((picture, index: number) => (
                            <li key={picture.id}>
                                STT: {index + 1} <img src={picture.icon} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                            </li>
                        ))
                    }
                </ul>
            </Modal>
        </>
    )
}
