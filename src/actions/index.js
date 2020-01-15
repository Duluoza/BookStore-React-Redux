const booksRequested = () => {
    return {
        type: "FETCH_BOOKS_REQUEST"
    }
};

const booksLoaded = (newBooks) => {
  return {
      type: 'FETCH_BOOKS_SUCCESS',
      payload: newBooks
  }
};

const booksError = (error) => {
    return {
        type: "FETCH_BOOKS_FAILURE",
        payload: error
    }
};

export const bookAddedToCart = (bookId) => {
    return {
        type: "BOOK_ADDED_TO_CART",
        payload: bookId
    }
};

export const bookDeleteToCart = (bookId) => {
    return {
        type: "BOOK_DELETE_TO_CART",
        payload: bookId
    }
};

export const allBooksDeleteToCart = (bookId) => {
    return {
        type: "ALL_BOOKS_DELETE_TO_CART",
        payload: bookId
    }
};

// const fetchBooksOld = (bookstoreService, dispatch) => () => { // старый вариант получения книг, а ниже через танк
//     dispatch(booksRequested());
//     bookstoreService.getBooks()
//         .then((data) => dispatch(booksLoaded(data)))
//         .catch((err) => dispatch(booksError(err)));
// };

const fetchBooks = (bookstoreService) => () => (dispatch) => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
};


export {
    // booksLoaded, booksRequested, booksError
    fetchBooks
}