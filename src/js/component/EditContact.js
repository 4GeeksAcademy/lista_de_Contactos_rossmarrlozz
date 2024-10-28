import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const contactData = store.contactList.find(contact => contact.id === parseInt(id));
                if (contactData) {
                    setContact(contactData);
                } else {
                    const fetchedContact = await actions.getContactById(id);
                    setContact(fetchedContact);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id, actions, store.contactList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.editContact(id, contact);
            navigate("/Contact"); 
        } catch (err) {
            setError(err);
        }
    };

    if (loading) return <Spinner animation="border" />; 
    if (error) return <Alert variant="danger">Error: {error.message}</Alert>; 

    return (
        <Container>
            <h1 className="text-center mt-4">Edit Contact</h1> 
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="Nombre"
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="Email"
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Teléfono:</Form.Label>
                    <Form.Control
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="Teléfono"
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Dirección:</Form.Label>
                    <Form.Control
                        type="text"
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        placeholder="Dirección"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">Guardar Cambios</Button> 
            </Form>
        </Container>
    );
};

export default EditContact;
