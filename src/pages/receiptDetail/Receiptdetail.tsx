import { useEffect, useState } from 'react';
import './receipdetail.scss';
// import ReceiptDetail from './ReceiptDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { Receipt, ReceiptDetail } from '@/stores/slices/user.slice';



export default function ReceiptDetail1() {
    const { id } = useParams();
    const userStore = useSelector((store: StoreType) => store.userStore);

    const [receipt, setReceipt] = useState<Receipt | null>(null)

    useEffect(() => {
        if (userStore.receipts) {
            const foundReceipt = userStore.receipts.find((receipt) => receipt.id === id);
            if (foundReceipt) {
                setReceipt(foundReceipt);
            }
        }
    }, [id, userStore.receipts])


    console.log("receipt", receipt)


    return (
        <div >

            <div className="d-flex">
                <section className="invoice-list-page">
                    <div className="invoice-list-page__header">
                        <div className="container">
                            <div className="d-flex flex-row align-items-center">
                                <div className="col">
                                    <h2>Invoices Detail</h2>
                                    <p className="detail">
                                        There are <span>{receipt?.detail.length}</span> total invoices
                                    </p>
                                    <p className="detail">
                                        Total Price $<span>{receipt?.total}</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="invoice-list-page__content">
                        <div className="container">
                            {receipt?.detail.map((product: ReceiptDetail, index: number) => (
                                <div className="invoice-item">
                                    <div className="d-flex flex-row align-items-center">
                                        <div className="col">
                                            <span className="id">
                                                #<span>{index + 1}</span>
                                            </span>
                                        </div>
                                        <div className="col text-truncate" color='#454545'>
                                            <span className="date" ><img src={product.option.pictures[0].icon} alt="noImage" /></span>

                                        </div>
                                        <div className="col">
                                            <span className="company">{product.option.product.name}</span>
                                        </div>
                                        <div className="col text-end">
                                            <span className="amount">{product.quantity}</span>
                                        </div>
                                        <div className="col text-end">
                                            <span className="amount">${product.option.price}</span>
                                        </div>
                                        <div className="col-1 text-end">
                                            <button className="btn btn-arrow">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-chevron-right"
                                                >
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

        </div>


    )
}