import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

import axios from 'axios'

export default function BookEdit() {
    const [alertText, setAlertText] = useState('Rellena el formulario sin dejar campos vacios')
    const [alertType, setAlertType] = useState('info')

    const [bookName, setBookName] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookGender, setBookGender] = useState('')
    const [bookStatus, setBookStatus] = useState(true)
    const [book, setBook] = useState('')

    const [booksData, setBooksData] = useState([])

    const createBook = () => {
        const data = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            bookGender: bookGender,
            bookStatus: bookStatus,
            bookRoute: book
        }

        axios.post('http://localhost:3001/books/create', [data])
            .then(function (response) {
                if (response.status == '200') {
                    setAlertText('El libro se creo con exito')
                    setAlertType('success')
                }
            })
            .catch(function (error) {

            })
    }

    return (
        <>
            <div className="container-fluid row">
                <div className='col-md-6'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre del libro</th>
                                <th>Autor</th>
                                <th>Genero</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='align-middle'>
                                <th>Caperuzita roja</th>
                                <th>Confleis</th>
                                <th>Accion</th>
                                <th>Activo</th>
                                <th><Button variant='outline-danger'>Eliminar</Button></th>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='col-md-6'>
                    <div className='p-2 rounded shadow-sm border'>
                        <Form>
                            <Form.Group>
                                <Form.Label>Ingresa el nombre del libro</Form.Label>
                                <Form.Control
                                    value={bookName} />
                                <Form.Label>Ingresa el autor del libro</Form.Label>
                                <Form.Control
                                    value={bookAuthor} />
                                <Form.Label>Ingresa el genero del libro</Form.Label>
                                <Form.Control
                                    value={bookGender} />
                                <Form.Label>Selecciona el estatus del libro</Form.Label>
                                <Form.Select value={bookStatus}>
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </Form.Select>
                                <Form.Label>Sube el pdf</Form.Label>
                                <Form.Control type='file'
                                    onChange={(event) => {
                                        const file = event.target.files[0]
                                        const reader = new FileReader

                                        reader.onload = () => {
                                            setBook(reader.result)
                                        }

                                        reader.readAsDataURL(file)

                                    }} />
                                <Form.Control className='my-2' hidden={false} value={book} />
                                <div className='my-4 text-center'>
                                    <Button variant='outline-dark' className='w-100'>Subir Libro</Button>
                                </div>
                                <div>
                                    <Alert variant={alertType}>{alertText}</Alert>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}