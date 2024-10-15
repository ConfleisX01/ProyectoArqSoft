import '../App.css'

import axios from 'axios'

import { useEffect, useState } from "react"

export default function BooksList() {
    const [bookSelected, setBookSelected] = useState("")
    const [bookName, setBookName] = useState('Ningun libro seleccionado')
    const [bookAuthor, setBookAuthor] = useState('Ningun libro seleccionado')
    const [bookGender, setBookGender] = useState('Ningun libro seleccionado')

    const [booksData, setBooksData] = useState([])

    useEffect(() => {
        getBooksList()
    }, [])

    const loadBook = (index) => {
        const book = booksData[index]

        console.log(book.book_route)
        setBookSelected(book.book_route)
        setBookName(book.book_name)
        setBookAuthor(book.author)
        setBookGender(book.gender)
    }

    const getBooksList = () => {
        axios.get('http://localhost:3001/books/list')
            .then(function (response) {
                setBooksData(response.data)
            })
            .catch(function (error) {
                console.log('Error al obtener los libros')
            })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col-md-8">
                        <div className="rounded shadow-sm p-2">
                            <iframe
                                id="iframe"
                                title="bookVisualizer"
                                width={'100%'}
                                height={'800px'}
                                src={bookSelected}
                            >
                            </iframe>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex">
                        <div className="container-fluid rounded shadow-sm p-2">
                            <div className='container-fluid p-0'>
                                <span className='bg-iceberg rounded p-1 px-3 fw-bold'>Nombre del libro</span>
                                <p className='text-muted'>{bookName}</p>
                            </div>
                            <div className='container-fluid p-0'>
                                <span className='bg-coral rounded p-1 px-3 fw-bold'>Autor</span>
                                <p className='text-muted'>{bookAuthor}</p>
                            </div>
                            <div className='container-fluid p-0'>
                                <span className='bg-eastern rounded p-1 px-3 fw-bold'>Genero</span>
                                <p className='text-muted'>{bookGender}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="rounded shadow-sm p-2 row gy-4">
                            {
                                booksData.map((book, index) => {
                                    if (book.book_status) {
                                        return (
                                            <BookCard key={index}
                                                bookName={book.book_name}
                                                bookAuthor={book.author}
                                                onClick={() => loadBook(index)}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function BookCard(props) {
    return (
        <>
            <div className='col-md-2'>
                <div className='border p-2 overflow-hidden shadow-sm rounded d-flex flex-column pointer' style={{ height: '11rem', width: '10rem' }} onClick={props.onClick}>
                    <div className='flex-grow-1'>
                        <p className='m-0 fw-bold'>{props.bookName}</p>
                    </div>
                    <div className='text-end'>
                        <small className='m-0'>{props.bookAuthor}</small>
                    </div>
                </div>
            </div>
        </>
    )
}