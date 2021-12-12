const {ApolloServer, gql } = require('apollo-server');
const {mainCards, animals, categories} = require('./db')

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
    category: Category
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
    category: Category
}
type Category{
    id: ID!
    title:String
    image:String
    category: String
    slug: String
    animals: [Animal]
}

type Query{
    books: [Book]
    mainCards:[MainCard]
    animals:[Animals]
    animal(image:String): Animal
    categories: [Category]
    category(slug:String!): Category
   
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
        category: ()=>category,
        animal: (parent, args, ctx)=>{
            let animal = animals.find((animal)=>{
                return animal.image===args.image
            })
        return animal
        },
        categories: ()=> categories,
        category: (parent, args, ctx)=>{
            let category = categories.find((category)=>{
                return category.slug===args.slug
            });
            return category
        }
    },
    Category:{
        animals:(parent,args,ctx)=>{
            console.log(parent)
        }
    }
};
const server = new ApolloServer({typeDefs, resolvers});

//listen launches a web server
server.listen().then(({url})=>{
    console.log(`🔥 🚀 Server running at ${url}`);
})