import { useEffect, useState } from 'react';
import apis from '@/services/apis';

interface Category {
    id: string,
    title: String,
    updateAt: Date,
    count: number
}

export default function Productlist() {
    const [isLoading, setIsLoading] = useState(false);
    interface CategoryWithProductCount {
        id: string,
        title: String,
        updateAt: Date,
        count: number
    }

    const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);
    useEffect(() => {
        setIsLoading(true);
        apis.categoryApi.findMany()
            .then(res => {
                if (res.status === 200) {
                    const categoriesWithCount = res.data.data.map((category: any) => {
                        return {
                            ...category,
                            count: 0
                        };
                    });
                    setCategories(categoriesWithCount);
                    categoriesWithCount.forEach((category: { id: string; }) => {
                        apis.productApi.findByCategory(category.id)
                            .then((res: { status: number; data: { data: string | any[]; }; }) => {
                                if (res.status === 200) {
                                    const productCount = res.data.data.length;
                                    setCategories(prevCategories => prevCategories.map(prevCategory => {
                                        if (prevCategory.id === category.id) {
                                            return {
                                                ...prevCategory,
                                                count: productCount
                                            };
                                        }
                                        return prevCategory;
                                    }));
                                }
                            })
                            .catch((_err: any) => {
                                // Xử lý lỗi nếu cần
                            });
                    });
                }
            })
            .catch(() => {
                // Xử lý lỗi nếu cần
            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
            });
    }, [])


    return (
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
                    <span className="text" data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal">Add New</span>
                </a>
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
                                <th>Category</th>
                                <th>#SKU</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : categories?.map((category, index) => (
                                <tr key={Math.random() * Date.now()} className='category'>
                                    <td>{index + 1}</td>
                                    <td className='name'>{(category as Category).title}</td>
                                    <td>{(category as Category).count}</td>
                                    <td>
                                        <span className="status pending">Pending</span>
                                    </td>
                                </tr>
                            ))}



                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}