import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdow from 'react-bootstrap/NavDropdown'

import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Outlet } from 'react-router-dom'

export default function BooksIndex() {
    return (
        <>
            <div>
                <NavigationBar />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

function NavigationBar() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/index">
                        <AcademicCapIcon style={{ 'height': '32px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/catalogo">Catalogo</Nav.Link>
                            <Nav.Link href="/administracion">Administracion de libros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}