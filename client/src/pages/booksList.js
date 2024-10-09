import '../App.css'

import { useState } from "react"

export default function BooksList() {
    const [bookSelected, setBookSelected] = useState("")
    const [bookName, setBookName] = useState('Ningun libro seleccionado')
    const [bookAuthor, setBookAuthor] = useState('Ningun libro seleccionado')
    const [bookGender, setBookGender] = useState('Ningun libro seleccionado')
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
                                height={'500px'}
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
                        <div className="rounded shadow-sm p-2">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function BookCard() {
    return (
        <>

        </>
    )
}