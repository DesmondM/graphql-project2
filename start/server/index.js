const {ApolloServer, gql } = require('apollo-server');
const {mainCards, animals} = require('./db')

const typeDefs = gql `
type Book{
    title: String
    author: String
}
type MainCard{
    title:String
    image:String
}
type Animals{
    title:String
    image:String
}
type Query{
    books: [Book]
    mainCards:[MainCard]
    animals:[Animals]
}
`;

const books = [
    {title: 'The Crow',
    author : 'De Blazo'
    },
     {title: 'The Nariti',
    author : 'Can Da Baryi'
    }
];

//#endregion

const resolvers = {
    Query: {
        books: ()=>books,
        mainCards: ()=>mainCards,
        animals: ()=>animals
    },
};
const server = new ApolloServer({typeDefs, resolvers});

//listen launches a web server
server.listen().then(({url})=>{
    console.log(`🔥 🚀 Server running at ${url}`);
})