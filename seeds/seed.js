const db = require('../server/config/connection');
const { User, Product, Order } = require('../server/models');


db.once('open', async () => {
    // await Product.deleteMany();
    const products = await Product.insertMany([
        {
            title: 'insert' ,
            author: 'insert',
            firstSentence: 'insert',
            image: 'insert',
            price: 10,
            quantity: 10,
            year: 2010
        }, 
        // {
        //     name: 'insert' ,
        //     author: 'insert',
        //     firstSentence: 'insert',
        //     image: 'insert',
        //     price: 'insert',
        //     quantity: 'insert',
        //     year: 'insert'
        // }, 
        // {
        //     name: 'insert' ,
        //     author: 'insert',
        //     firstSentence: 'insert',
        //     image: 'insert',
        //     price: 'insert',
        //     quantity: 'insert',
        //     year: 'insert'
        // }
    ])
});
console.log('products seeded');

// await User.deleteMany();

// await User.create({
//     firstName: 'Erin',
//     lastName: 'Beery',
//     email: 'erinbeery@gmail.com',
//     password: 'asdf;lkj',
//     orders: [
//       {
//         products: [products[0]._id, products[0]._id, products[1]._id]
//       }
//     ]
// })





// await User.create({
//     firstName: 'Helen',
//     lastName: 'Hosse',
//     email: 'helenhosse@gmail.com',
//     password: 'asdf;lkj'
// });


// function getbooks() {
//     document.getElementById("output").innerHTML="";
//     fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
//     .then(a => a.json())
//     .then(response =>{
//         for(var i=0; i<10; i++){
//             document.getElementById("output").innerHTML+=
//             "<h2>"+response.docs[i].title+"</h2>"
//                 +response.docs[i].author_name[0]+response.docs[i].first_publish_year+
//                 response.docs[i].first_sentence[0]
//                 "<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-L.jpg'><br>";
//         }
    
//     });
// }