import Offcanvas from 'react-bootstrap/Offcanvas';
import "./scss/search.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '@/services/apis';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';

type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
    name: string;
    placement: OffcanvasPlacement | undefined; // Use the defined union type
}

interface Product {
    options: any;
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    pictures: {
        id: string;
        icon: string;
    }[]
}

function OffCanvasExample({ placement }: OffCanvasExampleProps) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const categoryStore = useSelector((store: StoreType) => store.categoryStore);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    // const [searchValue, setSearchValue] = useState('');

    function handleDeleteInputField() {
        (document.querySelector(".seacrh__top__input__field") as HTMLInputElement).value = "";
        setSearchData([]);
    }

    // const categoryStore = useSelector((store: StoreType) => store.categoryStore);

    let timeOut: any;
    function search(e: any) {
        setLoading(true);
        // console.log("search", e.target.value);
        clearTimeout(timeOut);
        if (e.target.value == "") {
            setSearchData([])
            setLoading(false)
            return;
        };
        timeOut = setTimeout(async () => {
            setSearchStatus(true)
            try {
                if (searchStatus) {
                    return
                }
                let result = await apis.productApi.search(e.target.value);
                if (result.status == 200) {
                    setTimeout(() => {
                        setSearchStatus(false);
                        // console.log("res", result.data.data);
                        setSearchData(result.data.data);
                        setLoading(false);

                    }, 1500)

                } else {
                    setSearchStatus(false);
                    setLoading(false)
                }
            } catch (err) {
                console.log("loi call api search");
            }
        }, 600)
    }

    return (
        <>
            <div onClick={handleShow} style={{display:"flex", alignItems:"center"}} >
                <span className="material-symbols-outlined">
                    search
                </span>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement={placement} className='search__container'>
                <Offcanvas.Header className='seacrh__top'>
                    <div className='seacrh__top__logo__image'>
                        {/* <img src={nikeLogo} alt="nikeLogo" /> */}
                    </div>
                    <div className='seacrh__container'>
                        <input className='seacrh__input' type="text" placeholder='Search' onChange={(e: any) => {
                            // setSearchValue(e.target.value)
                            search(e)
                        }} />
                        <span className="material-symbols-outlined" onClick={() => handleDeleteInputField()}>
                            {/* close */}
                        </span>
                    </div>
                    <button onClick={() => handleClose()} className='cancel__button'></button>
                    {/* <Offcanvas.Title className='search__top'>
                        <div className='search_input'>
                            <i style={{ padding: "0 15px 0 0" }} className="fa-solid fa-magnifying-glass"></i>
                            <input className='inputSearch' type="text" placeholder='what do you need ?' onChange={(e) => search(e)} />
                            <input className='inputSearch' type="text" placeholder='what do you need ?' />
                        </div> </Offcanvas.Title> */}
                </Offcanvas.Header>
                <Offcanvas.Body className='search_content'>
                    <div className='search_categories'>
                        <h5>Popular Search Terms</h5>
                        {categoryStore.data?.map((category: any, _index: number) => <p key={Math.random() * Date.now()} onClick={() => {
                            navigate(`/collections/${category.id}`)
                            handleClose()
                        }}>{category.title}</p>)}
                    </div>
                    <div className='search__results'>
                        {loading ? <div className="d-flex justify-content-center loading-wrapper">
                            <div className="spinner-border" role="status" style={{ color: "white" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : searchData?.map((product, _index) => (
                            <div className='search__results__product' key={Math.random() * Date.now()}>
                                <img src={product.options[0].pictures[0].icon} alt="" onClick={() => {
                                    navigate(`/product/${product.id}`)
                                    handleClose()
                                }} />
                                <h5 className='search__results__product__name'>{product.name}</h5>
                                <p>${product.options[0].price}</p>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function Search() {
    return (
        <>
            <OffCanvasExample placement="top" name="top" />
        </>
    );
}

export default Search;