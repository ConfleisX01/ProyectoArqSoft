import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';

import { EyeSlashIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/solid';

import axios from 'axios'

export default function BookEdit() {
    const [alertText, setAlertText] = useState('Rellena el formulario sin dejar campos vacios')
    const [alertType, setAlertType] = useState('info')

    const [bookId, setBookId] = useState()
    const [bookName, setBookName] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookGender, setBookGender] = useState('')
    const [bookStatus, setBookStatus] = useState(true)
    const [book, setBook] = useState('')

    const [isUpdating, setIsUpdating] = useState(false)

    const [booksData, setBooksData] = useState([])

    const getBooksList = () => {
        axios.get('http://localhost:3001/books/list')
            .then(function (response) {
                if (response.data.length > 0) {
                    setBooksData(response.data)
                }
            })
            .catch(function (error) {
                setAlertText('Error al obtener los libros')
                setAlertType('danger')
            })
    }

    useEffect(() => {
        getBooksList()
    }, [])

    const loadBookInformation = (index) => {
        setBookId(booksData[index].id_book)
        setIsUpdating(true)
        setBookName(booksData[index].book_name)
        setBookAuthor(booksData[index].author)
        setBookGender(booksData[index].gender)
        setBookStatus(booksData[index].book_status ? true : false)
        setBook(booksData[index].book_route)
    }

    const cleanForm = () => {
        setBookId()
        setBookName('')
        setBookAuthor('')
        setBookGender('')
        setBookStatus(true)
        setBook('')
    }

    const createBook = () => {
        const data = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            bookGender: bookGender,
            bookStatus: bookStatus,
            bookRoute: book
        }

        axios.post('http://localhost:3001/books/create', data)
            .then(function (response) {
                if (response.status == '200') {
                    setAlertText('El libro se creo con exito')
                    setAlertType('success')
                    getBooksList()
                    cleanForm()
                }
            })
            .catch(function (error) {
                setAlertText('No se pudo comunicar con el servidor')
                setAlertType('danger')
            })
    }

    const updateBook = () => {
        const data = {
            bookId: bookId,
            bookName: bookName,
            bookAuthor: bookAuthor,
            bookGender: bookGender,
            bookStatus: bookStatus,
            bookRoute: book
        }

        axios.post('http://localhost:3001/books/update', data)
            .then(function (response) {
                if (response.status == '200') {
                    setIsUpdating(false)
                    setAlertText('El libro se modifico con exito')
                    setAlertType('success')
                    getBooksList()
                    cleanForm()
                }
            })
            .catch(function (error) {
                setAlertText('No se pudo comunicar con el servidor')
                setAlertType('danger')
            })
    }

    const updateBookStatus = (bookId, bookStatus) => {
        const data = {
            bookId: bookId,
            bookStatus: bookStatus
        }

        axios.post('http://localhost:3001/books/updateStatus', data)
            .then(function (response) {
                if (response.status == '200') {
                    setAlertText('El estatus se modifico con exito')
                    setAlertType('success')
                    getBooksList()
                }
            })
            .catch(function (error) {
                setAlertText('No se pudo comunicar con el servidor')
                setAlertType('danger')
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
                            {
                                booksData.map((book, index) => {
                                    const textType = book.book_status == 1 ? null : 'text-muted'
                                    return (
                                        <tr className='align-middle' key={index}>
                                            <th className={textType}>{book.book_name}</th>
                                            <th className={textType}>{book.author}</th>
                                            <th className={textType}>{book.gender}</th>
                                            <th className={textType}>{book.book_status ? 'Activo' : 'Inactivo'}</th>
                                            <th>
                                                {
                                                    book.book_status ?
                                                        <Button className='btn-sm mx-1' variant='outline-danger'
                                                            onClick={() => updateBookStatus(book.id_book, false)}><EyeSlashIcon style={{ 'height': '16px' }} /></Button>
                                                        :
                                                        <Button className='btn-sm mx-1' variant='outline-success'
                                                            onClick={() => updateBookStatus(book.id_book, true)}><EyeIcon style={{ 'height': '16px' }} /></Button>
                                                }
                                                <Button className='btn-sm mx-1' variant='outline-warning'
                                                    onClick={() => loadBookInformation(index)}><PencilIcon style={{ 'height': '16px' }} /></Button>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className='col-md-6'>
                    <div className='p-2 rounded shadow-sm border'>
                        <Form>
                            <Form.Group>
                                <Form.Label>Ingresa el nombre del libro</Form.Label>
                                <Form.Control
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)} />
                                <Form.Label>Ingresa el autor del libro</Form.Label>
                                <Form.Control
                                    value={bookAuthor}
                                    onChange={(e) => setBookAuthor(e.target.value)} />
                                <Form.Label>Ingresa el genero del libro</Form.Label>
                                <Form.Control
                                    value={bookGender}
                                    onChange={(e) => setBookGender(e.target.value)} />
                                <Form.Label>Selecciona el estatus del libro</Form.Label>
                                <Form.Select value={bookStatus}
                                    onChange={(e) => setBookStatus(e.target.value === 'true')}>
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
                                <Form.Control className='my-2 text-muted' hidden={false} readOnly={true} value={book} />
                                <div className='my-4 text-center'>
                                    {
                                        isUpdating ?
                                            <Button variant='outline-warning' className='w-100'
                                                onClick={updateBook}>Actualizar Libro</Button>
                                            :
                                            <Button variant='outline-dark' className='w-100'
                                                onClick={createBook}>Subir Libro</Button>

                                    }
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