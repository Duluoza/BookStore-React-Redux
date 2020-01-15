export default class BookstoreService {

    data = [
        {
            id: 1,
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 32,
            coverImage: 'https://www.moscowbooks.ru/image/book/575/w600/i575271.jpg'
        },
        {
            id: 2,
            title: 'Release It!',
            author: 'Michael T. Nygard',
            price: 45,
            coverImage: 'https://author.today/content/2017/07/31/ff7da80f526ef4797aa4a65d510dc33f1.jpg'
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
                // reject('Something bad happened')
            }, 700)
        });
    };

};