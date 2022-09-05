import {BackGround,box,CurrentLine,text} from '../../helpers/colors'

import Contact from "./Contact";
import  Spinner from "../Spinner"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContentContaxt} from "../../context/contactContext";

const Contacts=()=>{
    const {  contacts , loading, deleteContact } = useContext(ContentContaxt)


    return(
        <>
            <section className="container">

                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link className="btn mx-2"
                                        style={{backgroundColor:CurrentLine
                                            ,color:text
                                        }}
                                      to="/contacts/add"
                                >
                                    ساخت مخاطب جدید
                                    <i className="fas fa-plus"></i>
                                </Link>
                            </p>
                        </div>
                    </div>

            </section>
            {
                loading ? <Spinner/> : (
                    <section className="container">
                        <div className="row">
                        {
                            contacts.length > 0
                                ?
                                contacts.map((c,index)=>
                                        <Contact
                                            key={index}
                                            contact={c}
                                            id={c._id}
                                            removeContact={()=>deleteContact(c._id,c.fullname)}
                                        />
                                )
                                : (
                                    <div className="text-center py-5 rounded"
                                         style={{backgroundColor:CurrentLine}}
                                    >
                                        <p className="h3 text-warning">مخاطبی یافت نشد ..</p>
                                        <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25"/>
                                    </div>
                                )
                        }
                        </div>

                    </section>
                )
            }

        </>
    )
}
export  default Contacts