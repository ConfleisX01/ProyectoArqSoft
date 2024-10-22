class BookPublic {
    constructor(
        idLibro,
        nombreLibro,
        autorLibro,
        generoLibro,
        estatusLibro,
        contenidoLibro
    ) {
        this.idLibro = idLibro
        this.nombreLibro = nombreLibro
        this.autorLibro = autorLibro
        this.generoLibro = generoLibro
        this.estatusLibro = estatusLibro
        this.contenidoLibro = contenidoLibro
    }
}

module.exports = {
    BookPublic
}