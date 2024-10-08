import '../App.css'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function LoginCard() {
const login = () => {
    window.location = '/index'
}

    return (
        <>
            <div className='vh-100 d-flex align-items-center justify-content-center'>
                <div className='rounded p-4 w-50 border shadow-sm'>
                    <div className='text-center'>
                        <h4 className='fw-bold m-0'>Biblioteca Digital <AcademicCapIcon style={{'height':'32px'}} /></h4>
                        <p className='m-0 text-muted'>Login</p>
                    </div>
                    <div>
                        <Form>
                            <Form.Group>
                                <Form.Label className='mt-4'>Nombre de usuario</Form.Label>
                                <Form.Control type='text' placeholder='Ingresa tu usuario' />
                                <Form.Label className='mt-4'>Contraseña</Form.Label>
                                <Form.Control type='password' placeholder='Ingresa tu clave' />
                                <div className='mt-4 text-center'>
                                    <Button variant='outline-dark'
                                    onClick={login}>Iniciar Sesión</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}