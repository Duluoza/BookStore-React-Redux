const updateCartItems = (cartItems, item, idx) => {

    if(item.count === 0) {   // удаление элемента из массива
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1),
        ];
    }

    if (idx === -1) {  // добавление нового элемента в конец массива
        return [
            ...cartItems,
            item
        ];

    }

    return [                            // обновляет массив
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1),
    ];
};

const updateCartItem = (book, item={}, quantity) => {
    // if (item) {          // 1 вариант, как можно вынести логику изменения итема
    //     return {
    //         ...item,
    //         count: item.count + 1,
    //         total: item.total + book.price
    //     };
    // } else {
    //     return {
    //         id: book.id,
    //         title: book.title,
    //         count: 1,
    //         total: book.price
    //     };
    // }

    const {id = book.id, count = 0, title = book.title, total = 0 } = item;
    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity*book.price
    }
};

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems }} = state;
    const book = books.find(({ id }) => id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);
    return {
        orderTotal: 0,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
};

const updateShoppingCart = (state, action) => {
    if(state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0
        }
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART' :
            return updateOrder(state, action.payload, 1);

        case 'BOOK_DELETE_TO_CART' :
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_DELETE_TO_CART' :
            const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        default :
            return state.shoppingCart
    }
};

export default updateShoppingCart;