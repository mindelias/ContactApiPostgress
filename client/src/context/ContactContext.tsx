import { createContext } from "react";

import { Istate } from './ContactReducer';

interface Icontact {
    state: Istate,
    addContact: any,
    deleteContact: any,
    SetCurrent:any,
    clearCurrent:any
    
     
}

const ContactContext = createContext({} as Icontact);

export default ContactContext;
