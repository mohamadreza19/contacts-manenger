import {createContext} from 'react'

export const ContentContaxt = createContext({
    loading:false,
    setLoading:()=>{},
    contacts:[],
    setContactQuery:()=>{},
    filteredContacts:[],
    updateContact:()=>{},
    createContact:()=>{},
    deleteContact:()=>{},
    contactSearch:()=>{},
    // errors:[]
})
