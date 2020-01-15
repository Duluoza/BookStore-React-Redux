import React, {Component} from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import BookListItem from "../book-list-item";
import withBookstoreService from "../hoc/with-bookstore-service";
import Spinner from "../spinner";
import {
    // booksLoaded, booksRequested, booksError
    fetchBooks, bookAddedToCart
} from '../../actions'
import ErrorIndicator from "../error-indicator";

import './book-list.css'

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className='book-list'>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error, onAddedToCart} = this.props;

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart}/>

    }
}

// const mapStateToProps = (state) => {     // ниже запись с деструктурированным кодом
//     return {
//         books: state.books
//     }
// };

const mapStateToProps = ({bookList: { books, loading, error }}) => {
    return { books, loading, error }
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {  // 7. вариант, через танки и байнд екшион криейторс,
    return bindActionCreators({                         // ownProps деструктурировал сразу в аргументах
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch)
};

// const mapDispatchToProps = (dispatch, ownProps) => {  // 6. вариант, когда функцию выносим в екшенс и импортим её сюда
//     const { bookstoreService } = ownProps;              // улучшить - деструктурировать сразу в передаче ownProps
//     return {
//         // fetchBooksOld: fetchBooks(bookstoreService, dispatch), // старый вариант без танка
//         fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
//         onAddedToCart: (id) => dispatch(bookAddedToCart(id)) // передает в стор нужное значение
//     }
// };

// const mapDispatchToProps = (dispatch, ownProps) => {  // 5 вариант. Забираем всю логику из ComponentDidMount
//     const { bookstoreService } = ownProps;                // mapDispatchToProps возвращаем функциональный вид
//     return{                                          // передаем в него ownProps и из них достаем bookstoreService
//         fetchBooks: () => {                         // в return передаем функцию куда и вставляем всю логику, обернув
//             dispatch(booksRequested());             // екшен криетеры в диспатч
//             bookstoreService.getBooks()
//                 .then((data) => dispatch(booksLoaded(data)))
//                 .catch((err) => dispatch(booksError(err)));
//         }
//     };
// };

// const mapDispatchToProps = {
//     booksLoaded,
//     booksRequested, booksError // 4. вариант - просто передать екшион креаторс

    // return bindActionCreators ({  // 3. вариант через байнд акшион креаторс
    //     booksLoaded
    // }, dispatch);

    // return {
    //     booksLoaded: (newBooks) => {         2. варинт
    //         dispatch(booksLoaded(newBooks));
    //
    //         // dispatch({                   1. вариант - диспат где прописываем сами action, а выше вариант
    //         //     type: 'BOOKS_LOADED',    с импортом екшион креатора, который сразу передаем в диспатч
    //         //     payload: newBooks
    //         // });
    //     }
    // }
// };

export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookListContainer));

