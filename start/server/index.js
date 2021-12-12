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
    id: ID!
    title:String
    image:String
    slug: String
    rating: Float
    price: String
    description: [String]
    stock: Int
    onSale: Boolean
}

type Animal{
    id: ID!
    title:String
    image:String
    slug: String
    rating: Float
    price: String
    description: [String]
    stock: Int
    onSale: Boolean
}

type Query{
    books: [Book]
    mainCards:[MainCard]
    animals:[Animals]
    animal(image:String): Animal
   
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
        animals: ()=>animals,
        animal: (parent, args, ctx)=>{
            let animal = animals.find((animal)=>{
                return animal.image===args.image
            })
        return animal
    }
    },
};
const server = new ApolloServer({typeDefs, resolvers});

//listen launches a web server
server.listen().then(({url})=>{
    console.log(`🔥 🚀 Server running at ${url}`);
})