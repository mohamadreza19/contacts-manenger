import {CurrentLine, text} from "../../helpers/colors";
import {useNavigate,NavLink} from 'react-router-dom'

const Contact =({ contact, id, removeContact})=>{

    const navigate =useNavigate()
    return(
        <div className="col-md-6" style={{fontSize:"13px"}}>
            <div style={{backgroundColor:CurrentLine}}
                 className="card my-2"
            >
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-sm-3 col-md-3">
                            <img src={contact.photo}
                                 style={{border:`1px solid ${CurrentLine}`}}
                                 className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-sm-8 col-md-8">
                            <ul className="list-group ">
                                <li className="list-group-item list-group-item-dark d-flex justify-content-between "
                                    style={{whiteSpace:"nowrap"}}
                                >
                                    <p> نام و ناو خانوادگی:{" "}</p>
                                    <span
                                        className="fw-bold"

                                    >
                                        {contact.fullname}
                                            </span>
                                </li>
                                <li className="list-group-item list-group-item-dark d-flex justify-content-between ">
                                    شماره موبایل:{" "}
                                    <span className="fw-bold">{contact.mobile}</span>

                                </li>
                                <li className="list-group-item list-group-item-dark d-flex justify-content-between">
                                    ادرس ایمیل:{" "}
                                    <span className="fw-bold">{contact.email}</span>

                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-md-1 d-flex flex-column align-items-center">
                            <NavLink className="btn btn-sm bg-primary" to={`/contact/${id}`}>
                                <i className="fa fa-eye"></i>
                            </NavLink>
                            <NavLink className="btn btn-sm bg-warning"
                                     style={{backgroundColor:text}}
                                     to={`/contact-edit/${id}`}
                            >
                                <i className="fas fa-edit"></i>
                            </NavLink>
                            <button onClick={removeContact} className="btn btn-sm bg-danger pe-2">
                                <i className="fa fa-trash fa"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export  default  Contact