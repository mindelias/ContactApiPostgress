import React from 'react'
import ContactState from '../context/ContactState'

function ViewContacts() {
    return (
        <div>
            <h1> Get ALL Contacts</h1>
            <ContactState greeting = 'aminat'/>
        </div>
    )
}

export default ViewContacts
