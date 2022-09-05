import {CurrentLine,text} from '../helpers/colors'
import {useContext} from "react";
import {ContentContaxt} from "../context/contactContext";



const SearchContact =()=>{
    const { contactSearch}= useContext(ContentContaxt)
return(
    <>
     <form className="d-flex"
           role="search"
     >
         <input className="form-control  me-2 search-box"
                type="search"
                onChange={event =>{
                    event.preventDefault()
                    contactSearch(event.target.value)}}
                placeholder="جستو جو"
                aria-label="Search"
                style={{color:text}}
         />
         <button className="btn btn-sm btn-outline"
                 type="submit"
                 style={{color:CurrentLine}}
         >
             <i className="fas fa-search "></i>
         </button>
     </form>
    </>
)
}
export  default SearchContact