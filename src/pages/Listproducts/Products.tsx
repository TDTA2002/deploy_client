import { useEffect, useState } from 'react'
import './products.scss'
import about from '@/images/Controller-About-1.svg'
import left from '@/images/controller-produt-left.svg'
import right from '@/images/controller-produt-right.svg'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreType } from '@/stores'
import apis from '@/services/apis'


interface ProductOption {
    id: number;
    price: number;
    pictures: Array<{
        id: string;
        optionId: string;
        icon: string;
    }>;
}

interface Product {
    id: string;
    name: string;
    des: string;
    categoryId: string;
    options: ProductOption[];
}



// interface CartItem {
//     productId: string,
//     quantity: number
// }
// interface CategoryWithProductCount {
//     id: string,
//     title: String,
//     updateAt: Date,
//     count: number
// }


export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    // const [category, setCategory] = useState<Category[]>([]);
    const [, setIsLoading] = useState(false);
    const [maxItemPage] = useState(6);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);

    const [, setHoveredProductID] = useState<string | null>(null);


    useEffect(() => {
        setIsLoading(true);
        apis.productApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data);

                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        console.log("đã vào");
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                        console.log("number", Number(i) + 1);

                    }
                    console.log(" res.data.data", res.data.data);

                    console.log("res.data.maxPage", maxPageArr);

                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
                // setProductVisible(false);
            });
    }, [])

    function changePage(pageItemObj: any) {
        apis.productApi.findMany(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(pageItemObj.skip)
                    setProducts(res.data.data)
                }
            })
    }
    const categoryStore = useSelector((store: StoreType) => {
        return store.categoryStore
    })

    const { categoryId } = useParams<{ categoryId: string }>();
    let filteredProducts = products;
    if (categoryId) {
        filteredProducts = products.filter(product => product.categoryId === categoryId);
    }
    function handleChangeImage(url: string, productID: string) {
        console.log("đã vào", productID);

        const mainImage = document.querySelector(`.main__product__image__${productID}`) as HTMLImageElement;
        console.log("đã vào", mainImage);

        if (mainImage) {
            mainImage.src = url;

            setHoveredProductID(productID);
            console.log("đã vào", productID);

        }
    }
    return (
        <>
            <section className="section borda grid">
                <div>&nbsp;</div>
                <div>&nbsp;</div>

                <div className="control-2">
                    <div className="img-borda">
                        <img
                            className="img-produts-mobile"
                            src={about}
                            alt=""
                        />
                        <div className="img-desktop">
                            <img
                                className="control-produt-left"
                                src={left}
                                alt="controler do playstation cortado ao meio com apenas o lado esquerdo aparecendo "
                            />
                            <img
                                className="control-produt-right"
                                src={right}
                                alt="controler do playstation cortado ao meio com apenas o lado direito aparecendo"
                            />
                        </div>
                    </div>
                    <div className="borda-control">
                        <div className="borda-1">
                            <h2 className="borda-title">PS5 Controller</h2>
                            <p className="borda-description">
                                Just get the code ond sit tight, you will witness its power and
                                performance in lead generations. s simple yet Powerful and productive
                                technology. Experience, then beleve.
                            </p>
                            <ul className="about-produts">
                                <li>Wrihe some feature here</li>
                                <li>Wrihe some feature here</li>
                                <li>Wrihe some feature here</li>
                            </ul>
                            <div className="btn-produts btn-borda">
                                <a href="../html/buy.html">Buy More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 blog-form">
                            {/* a */}
                            <h2 className="blog-sidebar-title">
                                <b>Categories</b>
                            </h2>
                            <hr />
                            {categoryStore.data?.map((category: any) =>

                                <p className="blog-sidebar-list" onClick={() => navigate(`/products/${(category).id}`)}>
                                    {/* <Link to={`${category.id}`}> */}
                                    <span className="list-icon"> &gt; </span>{category.title}
                                    {/* </Link> */}
                                </p>
                            )}

                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <h2 className="blog-sidebar-title">
                                <b >Filter</b>
                            </h2>
                            <hr />
                                                      <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate(`/products`)}>
                                Clear Filter
                            </button>
                            {/* <PriceRangeSlider /> */}

                        </div>
                        {/*END  <div class="col-lg-3 blog-form">*/}
                        <div className="col-lg-9" style={{ paddingLeft: 30 }}>
                            <div className="row">
                                <div className="col">Showing all {filteredProducts.length} results</div>
                                <div className="col">
                                    <select className="form-control">
                                        <option value="">Default Sorting</option>
                                        <option value="popularity">Sorting by popularity</option>
                                        <option value="average">Sorting by average</option>
                                        <option value="latest">Sorting by latest</option>
                                        <option value="low">Sorting by low</option>
                                        <option value="high">Sorting by high</option>
                                    </select>
                                </div>
                            </div>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <div className="row">
                                <div className="contaiineer">
                                    {filteredProducts.map((product, index) => (
                                        <div className="card">
                                            <div className="imgBox">
                                                <img src={product.options[0]?.pictures[0]?.icon} alt="" className={`main__product__image__${product.id}`} />
                                            </div>
                                            <div className="contentBox">
                                                <h2>{product.name}</h2>
                                                <div key={index} className="size">
                                                    {/* {product?.options.map((item: any, index: number) => (
                                                        <img src={item.pictures[0]?.icon} alt="" style={{ width: "80px" }} onClick={() => handleChangeImage(item.pictures[0]?.icon, product.id)} />
                                                    ))} */}
                                                    <div className="color">
                                                        <h3>Cores:</h3>
                                                        {product?.options.map((item: any) => (
                                                            <span onClick={() => handleChangeImage(item.pictures[0]?.icon, product.id)} />
                                                        ))}
                                                        {/* <span />
                                                        <span />
                                                        <span /> */}
                                                    </div>
                                                </div>
                                                <Link to={"/product/detail/" + product.id} >
                                                    Comprar
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div className="card">
                                        <div className="imgBox">
                                            <img src={card} alt="" />
                                        </div>
                                        <div className="contentBox">
                                            <h2>Olympikus Evidence</h2>
                                            <div className="color">
                                                <h3>Cores:</h3>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                            <a href="">Comprar</a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="imgBox">
                                            <img src={card} alt="" />
                                        </div>
                                        <div className="contentBox">
                                            <h2>Olympikus Evidence</h2>
                                            <div className="color">
                                                <h3>Cores:</h3>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                            <a href="">Comprar</a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="imgBox">
                                            <img src={card} alt="" />
                                        </div>
                                        <div className="contentBox">
                                            <h2>Olympikus Evidence</h2>
                                            <div className="size">
                                                <h3>Tamanhos:</h3>
                                                <span>39</span>
                                                <span>40</span>
                                                <span>41</span>
                                                <span>42</span>
                                                <span>43</span>
                                            </div>
                                            <div className="color">
                                                <h3>Cores:</h3>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                            <a href="">Comprar</a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="imgBox">
                                            <img src={card} alt="" />
                                        </div>
                                        <div className="contentBox">
                                            <h2>Olympikus Evidence</h2>
                                            <div className="size">
                                                <h3>Tamanhos:</h3>
                                                <span>39</span>
                                                <span>40</span>
                                                <span>41</span>
                                                <span>42</span>
                                                <span>43</span>
                                            </div>
                                            <div className="color">
                                                <h3>Cores:</h3>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                            <a href="">Comprar</a>
                                        </div>
                                    </div> */}
                                </div>

                                <nav aria-label="Page navigation example page_box">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        {
                                            maxPage.map(item => {
                                                return (
                                                    <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" onClick={() => changePage(item)}>{item.number}</a></li>
                                                )
                                            })
                                        }
                                        <li className="page-item">
                                            <a className="page-link" href="" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                            {/* Sorting by <div class="row"> */}
                        </div>

                        {/*END  <div class="col-lg-9">*/}
                    </div>
                </div>
            </section>
        </>


    )
}
