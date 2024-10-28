import React, { useState, useContext } from "react"; 
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card, Row, Col } from "react-bootstrap";

const defaultImages = {
    1: "https://via.placeholder.com/150?text=Image1",
    2: "https://via.placeholder.com/150?text=Image2",
    3: "https://via.placeholder.com/150?text=Image3",
};

const AddContact = ({ editing = false, initialContactData = null }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const initialImage = initialContactData ? initialContactData.image : defaultImages[1]; // Establecer imagen predeterminada
    const [user, setUser] = useState(initialContactData || {
        name: "",
        email: "",
        agenda_slug: "agenda_Mariana",
        address: "",
        phone: "",
        image: initialImage
    });

    const [isContactAdded, setIsContactAdded] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;

        if (editing) {
            success = await actions.editContact(user.id, user);
        } else {
            success = await actions.addContact(user);
        }
        
        if (success) {
            setIsContactAdded(true);
            setTimeout(() => navigate("/contacts"), 3000);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageSelect = (image) => {
        setUser({ ...user, image });
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Add a new contact</h1>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Full Name"
                        name="name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        name="phone"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="address"
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Profile Image</Form.Label>
                    <Row>
                        {Object.entries(defaultImages).map(([key, value]) => (
                            <Col md={4} key={key} className="mb-3">
                                <Card 
                                    style={{ cursor: 'pointer', border: user.image === value ? '2px solid blue' : 'none' }}
                                    onClick={() => handleImageSelect(value)}
                                >
                                    <Card.Img variant="top" src={value} />
                                    <Card.Body>
                                        <Card.Title>Image {key}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Save
                </Button>
                <Link className="mt-3 d-block text-center" to="/">
                    or get back to contacts
                </Link>
            </Form>

            {isContactAdded && (
                <Alert variant="success" className="mt-3">
                    Contacto agregado exitosamente.
                </Alert>
            )}
        </Container>
    );
};

export default AddContact;
