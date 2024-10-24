class BookPrivate {
    constructor(
        bookId,
        bookName,
        bookAuthor,
        bookGender,
        bookStatus,
        bookRoute
    ) {
        this.bookId = bookId
        this.bookName = bookName
        this.bookAuthor = bookAuthor
        this.bookGender = bookGender
        this.bookStatus = bookStatus
        this.bookRoute = bookRoute
    }
}

module.exports = {
    BookPrivate
}