import {Link,} from "react-router-dom";
import {useContext} from "react";

import Spinner from "../Spinner";
import {BackGround, CurrentLine, text} from "../../helpers/colors";

import {ContentContaxt} from "../../context/contactContext";

import { Formik, Form, Field, ErrorMessage } from 'formik'
import {contactSchema} from '../../validations/contactValidation'

const AddContact=({})=>{

    const {loading, createContact} =
        useContext(ContentContaxt)


    return(
        <>
            {
                loading?(<Spinner/>)
                    :(
                        <>
                            <section className="p-3">
                                <img
                                    src={require("../../assets/man-taking-note.png")}
                                    height="400px"
                                    style={{
                                        position:"absolute",
                                        zIndex:"-1",
                                        top:"130px",
                                        left:"130px",
                                        opacity:"50%"
                                    }}
                                />
                            </section>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p
                                            className="h4 fw-bold text-center"
                                            style={{ color: CurrentLine}}
                                        >
                                            ساخت مخاطب جدید
                                        </p>
                                    </div>
                                </div>
                                <hr style={{ backgroundColor: text }} />
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <Formik initialValues={{
                                            fullname:'',
                                            photo:'',
                                            email:'',
                                            job:'',
                                        }}
                                            validationSchema= {contactSchema}
                                            onSubmit={values => {
                                                createContact(values)
                                                console.log(values)

                                            }}

                                            >

                                                    <Form >
                                                        <div className="mb-2">
                                                            <Field

                                                                name="fullname"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="نام و نام خانوادگی"

                                                            />
                                                            <ErrorMessage name="fullname" render={(msg) => (
                                                                <div className="text-danger">{msg}</div>
                                                            )}
                                                             />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Field
                                                                name="photo"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="آدرس تصویر"
                                                            />
                                                            <ErrorMessage name="photo" render={(msg) => (
                                                                <div className="text-danger">{msg}</div>
                                                            )}
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Field
                                                                name="mobile"
                                                                type="number"
                                                                className="form-control"

                                                                placeholder="شماره موبایل"
                                                            />
                                                            <ErrorMessage name="mobile" render={(msg) => (
                                                                <div className="text-danger">{msg}</div>
                                                            )}
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Field
                                                                type="email"
                                                                name="email"
                                                                className="form-control"

                                                                placeholder="آدرس ایمیل"
                                                            />
                                                            <ErrorMessage name="email" render={(msg) => (
                                                                <div className="text-danger">{msg}</div>
                                                            )}
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Field
                                                                type="text"
                                                                name="job"
                                                                className="form-control"

                                                                placeholder="شغل"
                                                            />
                                                            <ErrorMessage name="job" render={(msg) => (
                                                                <div className="text-danger">{msg}</div>
                                                            )}
                                                            />
                                                        </div>

                                                        <div className="mx-2 d-flex justify-content-between">
                                                            <input
                                                                type="submit"
                                                                className="btn"
                                                                style={{ backgroundColor: BackGround }}
                                                                value="ساخت مخاطب"
                                                            />

                                                            <Link
                                                                to={"/"}
                                                                className="btn mx-2"
                                                                style={{ backgroundColor: CurrentLine}}
                                                            >
                                                                انصراف
                                                            </Link>
                                                        </div>
                                                    </Form>

                                        </Formik>

                                    </div>
                                </div>
                            </div>
                        </>
                    )

            }
        </>
    )
}

export  default  AddContact