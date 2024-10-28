import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

const Contact = () => {
    const { store, actions } = useContext(Context);
    const { contactList, loading, error } = store;

    useEffect(() => {
        actions.getData(); 
    }, []); 

    if (loading) {
        return <div>Cargando contactos...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    if (!Array.isArray(contactList)) {
        return <div>Error: contactList no es un array.</div>;
    }

    const handleDelete = async (contactId) => {
        console.log("Intentando eliminar contacto con ID:", contactId); 
        actions.addidDelete(contactId); 
        await actions.removeContact(); 
    };

    return (
        <div>
            {contactList.length === 0 ? (
                <p>No hay contactos disponibles.</p>
            ) : (
                contactList.map(contact => (
                    <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        onDelete={() => handleDelete(contact.id)} 
                    />
                ))
            )}
        </div>
    );
};

export default Contact;
