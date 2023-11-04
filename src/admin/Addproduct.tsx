import React, { useState } from 'react';
import Input from 'antd/es/input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import apis from '@services/apis';
import { productAction } from '@/stores/slices/product.slice';

export default function Product() {
    const [loading] = useState(false)
    const dispatch = useDispatch()

    const categoryStore = useSelector((store: StoreType) => {
        return store.categoryStore
    })


    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product", JSON.stringify({
            categoryId: (e.target as any).categoriesId.value,
            name: (e.target as any).name.value,
            des: (e.target as any).des.value,
        }));

        apis.productApi.create(formData)
            .then(res => {
                dispatch(productAction.insertProduct(res.data.data))
            })
    }


    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={(e: React.FormEvent) => {
                        handleCreate(e)
                    }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1>Thêm Sản Phẩm</h1>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className='detailproduct'>
                                    <div>
                                        <div>
                                            Danh mục <br />
                                            <select name='categoriesId'>
                                                {categoryStore.data?.map((category: any) =>
                                                    <option key={category.id} value={category.id}>
                                                        {category.title}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <div>
                                            Tên <br />
                                            <Input name='name' type="text" placeholder='Tên' />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Mô tả <br />
                                            <Input name='des' type="text" placeholder='Mô tả' />
                                        </div>
                                        {/* <div>
                                            Giá <br />
                                            <Input name='price' type="text" placeholder='Giá' />
                                        </div> */}
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Đóng</button>
                                <button type='submit' className="btn btn-primary" data-mdb-dismiss="modal">
                                    {loading ? <span className='loading-spinner'></span> : "Lưu"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
