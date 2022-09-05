import axios from "axios";


const serverUrl= 'https://api.futureforme.ir'

export  const  getAllContacts=()=>{
    const url = `${serverUrl}/contacts`
    return axios.get(url)
}
 //desc Get Contact with Contact ID
//@route GET http://localhost:5000/contacts/:contactId
export  const  getContact=(contactId)=>{
    const url = `${serverUrl}/contact/${contactId}`
    return axios.get(url)
}
//desc create Contact
//@route POST http://localhost:5000/contacts
export  const  createContact=(contact)=>{
    const url = `${serverUrl}/contacts`
    return axios.post(url,contact)
}
//desc Update  Contact
//@route PUT http://localhost:5000/contacts/contacts:Id
export  const  updateContact=(contact,contactId)=>{

    const url =`${serverUrl}/contact/${contactId}`
    return axios.put(url,contact)
}
//desc Delete  Contact
//@route DELETE http://localhost:5000/contacts/contacts:Id
export  const  deleteContact=(contactId)=>{
    const url =`${serverUrl}/contact/${contactId}`
    return axios.delete(url)
}

