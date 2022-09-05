

import SearchContact from "./SearchContact";


import {CurrentLine,text} from '../helpers/colors'

const Navbar = ()=>{


    return (
        <nav
            className="navbar navbar-dark navbar-expand-sm shadow-lg"
            style={{backgroundColor:text}}
        >
            <div className="container">
                <div className="row w-100"
                     style={{color:CurrentLine}}
                >
                    <div className="col mt-1">
                        <i className="fas fa-id-badge"

                        />
                        وب اپلیکیشن مدیریت{"  "}
                        <span >مخاطبین</span>
                    </div>
                    <div className="col">
                       <SearchContact

                       />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export  default  Navbar