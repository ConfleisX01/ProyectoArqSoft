import '../App.css'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

import { Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import axios from 'axios'

export default function SingInCard() {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [alertText, setAlertText] = useState('Asegurate de llenar todos los campos')

    const [isShowingAlert, setIsShowingAlert] = useState(true)

    const createAccount = () => {
        const data = {
            userName: userName,
            userPassword: userPassword
        }

        axios.post('http://localhost:3001/createAccount', data)
            .then(function (response) {
                setIsShowingAlert(true)
                console.log(response.data)
                setAlertText('La cuenta se creo con exito')
            })
            .catch(function (error) {
                setAlertText('Error al comunicarse con el servidor')
            })
    }

    return (
        <>
            <div className='vh-100 d-flex align-items-center justify-content-center position-relative'>
                <div className='position-absolute top-0 end-0 p-4'>
                    <Toast onClose={() => setIsShowingAlert(false)} show={isShowingAlert} animation={true} delay={3000} autohide={true}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Biblioteca Digital</strong>
                            <small>Ahora</small>
                        </Toast.Header>
                        <Toast.Body>{alertText}</Toast.Body>
                    </Toast>
                </div>
                <div className='rounded p-4 w-25 border shadow-sm'>
                    <div className='text-center'>
                        <h4 className='fw-bold m-0'>Biblioteca Digital <AcademicCapIcon style={{ 'height': '32px' }} /></h4>
                        <p className='m-0 text-muted'>Sing In</p>
                    </div>
                    <div>
                        <Form>
                            <Form.Group>
                                <Form.Label className='mt-4'>Nombre de usuario</Form.Label>
                                <Form.Control type='text' placeholder='Ingresa tu usuario' value={userName} onChange={(e) => setUserName(e.target.value)} />
                                <Form.Label className='mt-4'>Contraseña</Form.Label>
                                <Form.Control type='password' placeholder='Ingresa tu clave' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                                <div className='my-4 text-center'>
                                    <Button variant='outline-dark'
                                        onClick={createAccount}>Crear Cuenta</Button>
                                </div>
                                <div className='text-center'>
                                    <Link to={'/'}>¿Ya tienes cuenta?, Entonces inicia sesión</Link>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}