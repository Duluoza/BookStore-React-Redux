import updateShoppingCart from "./shopping-cart";
import updateBookList from "./book-list";

// const initialState = {  // 1 варинт общего стейта
//         books: [],
//         loading: true,
//         error: null,
//         cartItems: [],
//         orderTotal: 0
// };

// const initialState = {  // 2 варинт стейта, разбитый на 2 части, чтобы разделить редьюсер на 2 функции
//     bookList: {          // в итоге мы вынесли инитиал стейт в функции , там где state === undefined и
//         books: [],       // в таком случае нам не нужен инитиал стейт
//         loading: true,
//         error: null,
//     },
//     shoppingCart: {
//         cartItems: [],
//         orderTotal: 0
//     }
// };

const reducer = (state, action) => {

    return {
        bookList: updateBookList(state, action), // эти функции находились в одном файле, но мы их вынесли в отдельные
        shoppingCart: updateShoppingCart(state, action)
    };
};

// const reducer = (state = initialState, action) => {  // этот вариант, когда стейт был общим
//
//     switch (action.type) {
//         case 'FETCH_BOOKS_REQUEST' :
//             return {
//                 ...state,
//                 books: [],
//                 loading: true,
//                 error: null
//             };
//         case 'FETCH_BOOKS_SUCCESS' :
//             return {
//                 ...state,
//                 books: action.payload,
//                 loading: false,
//                 error: null
//             };
//         case 'FETCH_BOOKS_FAILURE' :
//             return {
//                 ...state,
//                 books: [],
//                 loading: false,
//                 error: action.payload
//             };
//         case 'BOOK_ADDED_TO_CART' :
//             return updateOrder(state, action.payload, 1);
//
//         case 'BOOK_DELETE_TO_CART' :
//             return updateOrder(state, action.payload, -1);
//
//         case 'ALL_BOOKS_DELETE_TO_CART' :
//             const item = state.cartItems.find(({id}) => id === action.payload);
//             return updateOrder(state, action.payload, -item.count);
//
//         default:
//             return state;
//
//     }
// };

export default reducer;