import {Routes,Route,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

import { useImmer } from 'use-immer'

import {createContact, getAllContacts,deleteContact} from './services/contactService'

import  {ToastContainer, toast} from 'react-toastify'

import AddContact from "./components/contact/AddContact";
import ViewContact from "./components/contact/ViewContact";
import EditContact from "./components/contact/EditContact";
import Contacts from "./components/contact/Contacts";
import Navbar from "./components/Navbar"

import { confirmAlert } from 'react-confirm-alert';
import {box, CurrentLine, text} from "./helpers/colors";

import {contactSchema} from "./validations/contactValidation"

import{ContentContaxt} from "./context/contactContext";

import _ from 'lodash'

const App =()=>{
    const [contacts, setContacts] = useImmer([])
    const [loading, setLoading] = useImmer(false)
    const [filteredContacts, setFiltredContacts]= useImmer([])


    const navigate =useNavigate();
    useEffect(()=> {
        const fetchData = async () => {

            try {
                setLoading(true);
                const {data: contactsData, status} = await getAllContacts();

                if(status===200){
                    console.log(contactsData)
                    setContacts(contactsData.contacts);
                    setFiltredContacts(contactsData.contacts)
                }
                setLoading(false);

            } catch (e) {
                console.log(e)
                setLoading(false)
            }

        }
        fetchData()
    },[])

    const createContactForm = async (value)=>{
        setLoading(draft => !draft )

        try{
            await contactSchema.validate(value,{abortEarly: false})

            const {status, data} = await createContact(value)


            if (status ===201) {

                setFiltredContacts(draft => {draft.push(data.contact)})

                setContacts(draft => {
                    draft.push(data.contact)
                })
                toast.success('جیگر کابر ساخته شد')
                setLoading((loading)=> !loading )
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)

            setLoading(false)
        }
    }


    const removeContact =async (contactId) =>{

        const contactsBackUp = [...contacts]
        try{
            setLoading(draft => !draft )
            const {status} = await deleteContact(contactId)

            if (status === 200){

                setContacts(draft =>
                     draft.filter((c)=> c._id !== contactId)
                )
                setLoading(draft => !draft )
            }else {
                setContacts(contactsBackUp)
            }


        }catch (e) {
            console.log(e)
            setLoading(false)
        }
    }



    const confrimDelete= (contactId, contactFullname) =>{

        confirmAlert({
            customUI : ({ onClose }) => {
                return (
                    <div dir="rtl" style={{
                        backgroundColor:CurrentLine,
                        border:`1px solid ${box}`,
                        borderRadius:"1rem"
                    }}
                         className="p-4"
                    >

                        <p style={{color:CurrentLine}}>
                            <h1 style={{color:text}}>پاک کردن مخاطب</h1>
                            مطمعنی که میخوای رو پاک کنی؟{contactFullname}
                        </p>
                        <button
                            onClick={()=>{
                            removeContact(contactId);
                            onClose();
                        }}
                                className="btn mx-2"
                                style={{backgroundColor:box}}
                        >
                            مطمعن هستم
                        </button>
                        <button onClick={onClose}
                                className="btn"
                                style={{background:CurrentLine}}
                        >
                            انصراف
                        </button>

                    </div>
                )
            }
        })
    }


    const contactSearch = _.debounce(query =>{

    if (!query) return setFiltredContacts([...contacts])

            setFiltredContacts(
                draft => contacts.filter(contact => contact.fullname.toLocaleLowerCase().includes(query))
            )


    },1000)

    return(
        <ContentContaxt.Provider value={{
            loading,
            setLoading,
            contacts,
            setContacts,
            filteredContacts,
            deleteContact:confrimDelete,
            updateContact:()=>{},
            createContact:createContactForm,
            contactSearch,
            toast
        }}>
            <div>
                <ToastContainer rtl={true}
                                position='top-right'
                                theme="colored"
                />
                <Navbar/>
                <Routes>

                    <Route path ="/" element={
                        <Contacts

                        />}

                    />
                    <Route path ="/contacts/add" element=
                        {<AddContact/>
                        }
                    />
                    <Route path="/contact/:id" element={<ViewContact/>}/>
                    <Route path="/contact-edit/:id" element={<EditContact/>}/>
                    <Route path="*" element={<h1>404</h1>}/>
                </Routes>
            </div>
        </ContentContaxt.Provider>




    )
}



export default App