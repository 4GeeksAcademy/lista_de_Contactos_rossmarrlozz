import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal"; 
import {Container, Card, Button, Row, Col } from "react-bootstrap";

const ContactCard = ({ contact, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    if (!contact) {
        return null;
    }

    return (
        <Container>
                    <Card className="mb-3 shadow-sm">
            <Row className="g-0">
       
                <Col md={4}>
                    <Card.Img 
                        variant="top" 
                        src={contact.image || "https://via.placeholder.com/150"} 
                        alt={`${contact.name}'s profile`} 
                        style={{ width: "150px", height: "150px", objectFit: "cover" }} 
                    />
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{contact.name}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {contact.email}
                            <br />
                            <strong>Phone:</strong> {contact.phone}
                        </Card.Text>
                        <Link to={`/edit-contact/${contact.id}`}>
                            <Button variant="outline-primary" className="me-2">Edit</Button>
                        </Link>                
                        <Button variant="outline-danger" onClick={() => setShowModal(true)}>Delete</Button>
                    </Card.Body>
                </Col>
            </Row>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    onDelete(); 
                    setShowModal(false);
                }}
            />
        </Card>

        </Container>
    );
};

export default ContactCard;
