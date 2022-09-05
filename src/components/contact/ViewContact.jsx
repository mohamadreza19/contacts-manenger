import {useState,useEffect, useContext} from "react";
import {useParams,Link} from "react-router-dom";
import {getContact} from "../../services/contactService";
import {BackGround, CurrentLine, text} from "../../helpers/colors";
import Spinner from "../Spinner";

import {ContentContaxt} from "../../context/contactContext";
import {useImmer} from "use-immer";

const ViewContact=()=>{
    const {id} =useParams()

    const { contacts,loading , setLoading} =useContext(ContentContaxt)
    const [contactView,setContactView] = useImmer({})


    useEffect(()=>{
        const getData= async ()=>{



            try{
                setLoading(true)

                setContactView(draft => {
                    const   [data] = contacts.filter(
                        c=>c._id === id
                    )
                    return  data

                })
                setLoading(false)
            }
            catch (e) {
                console.log(e)
                setLoading(false)
            }
        }

        getData()
    },[])

    return(
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: BackGround }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: BackGround }} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contactView).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{ borderRadius: "1em", backgroundColor: CurrentLine }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={contactView.photo}
                                            alt=""
                                            className="img-fluid rounded"
                                            style={{ border: `1px solid ${Text}` }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی :{" "}
                                                <span className="fw-bold">{contactView.fullname}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شماره موبایل :{" "}
                                                <span className="fw-bold">{contactView.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                ایمیل : <span className="fw-bold">{contactView.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شغل : <span className="fw-bold">{contactView.job}</span>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to={"/"}
                                            className="btn"
                                            style={{ backgroundColor: text }}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}

export  default  ViewContact 