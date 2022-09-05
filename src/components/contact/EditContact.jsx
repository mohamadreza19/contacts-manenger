import {useEffect, useContext} from "react";
import {useParams,Link,useNavigate} from "react-router-dom";
import {useImmer} from 'use-immer'
import { updateContact} from "../../services/contactService";

import { Formik, Form, Field, ErrorMessage } from 'formik'
import {contactSchema} from '../../validations/contactValidation'


import {ContentContaxt} from "../../context/contactContext";


import Spinner from "../Spinner";
import {BackGround, CurrentLine, text} from "../../helpers/colors";

const EditContact=()=>{
    const {id} =useParams()
    const {loading, setLoading, contacts, setContacts, toast}= useContext(ContentContaxt)
    const navigate =useNavigate()
    const [contact, setContact]= useImmer({})



    useEffect(()=>{
        const getData= async ()=>{

            try{
                setLoading(true)
                const [data] = contacts.filter(contact=>contact._id === id)


                setContact(data)
                setLoading(false)

            }catch (e) {
                setLoading(false)
                console.log(e)
            }
        }

        getData()
    },[])

    const EditContactForm = async ( values )=>{
        try{
            setLoading(true)
            const {status,data} = await updateContact(values,id)

            if ( status === 200) {

                setLoading(false)



                setContacts((draft) => {
                    const contactIndex = contacts.findIndex(
                        (c) =>  c._id === id.toString()
                    );
                    draft [contactIndex] = { ...data.updatedContact };
                });
                    toast.success('کاربر با موفقیت ویرایش شد')
                     navigate("/")
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: BackGround }}>
                             ویرایش
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: BackGround }} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{ borderRadius: "1em", backgroundColor: CurrentLine }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={contact.photo}
                                            alt=""
                                            className="img-fluid rounded"
                                            style={{ border: `1px solid ${Text}` }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <Formik initialValues={{
                                            fullname:contact.fullname,
                                            photo:contact.photo,
                                            email:contact.email,
                                            job:contact.job,
                                            mobile:contact.mobile,
                                        }}
                                                validationSchema= {contactSchema}
                                                onSubmit={values => {

                                                    EditContactForm(values)

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
                                                        // required={true}
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
                                                        // required={true}
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
                                                        // required={true}
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
                                                        value="ویرایش مخاطب"
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
                                <div className="row my-2 ">
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

export  default  EditContact