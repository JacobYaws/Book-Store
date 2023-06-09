const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
// will need to put stripe here if we get to it

const resolvers = {
    Query: {
        // maybe switch products to title
        products: async (parent, { title }) => {
            const params = {};
      
            // if (category) {
            //   params.category = category;
            // }
      
            // if (title) {
            //   params.title = {
            //     $regex: title
            //   };
            // }

            return await Product.find();
                },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('products');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'products'
                });
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }
            throw new AuthenticationError('Not logged in!');
        },
        order: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products').execPopulate();

            for (let i=0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
            });


      // can add this part if we get to adding the stripe
        //     const price = await stripe.prices.create({
        //         product: product.id,
        //         unit_amount: products[i].price * 100,
        //         currency: 'usd',
        //       });
      
        //       line_items.push({
        //         price: price.id,
        //         quantity: 1
        //       });
        // }
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items,
        //     mode: 'payment',
        //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        //     cancel_url: `${url}/`
        //   });
        //   return { session: session.id };
    }
}
},
Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
        console.log(context);
        if (context.user) {
            const order = new Order({ products });
            await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

            return order;
        }
        throw new AuthenticationError('Not logged In');
    },
    updateUser: async (parent, args, context) => {
        if (context.user) {
            return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
        throw new AuthenticationError('Not logged in');
    },
    
    // we need to add this part if we want to implement the quantity
    // might have to change it depending on what the api pulls
    // updateProduct: async (parent, { _id, quantity }) => {
    //     const decrement = Math.abs(quantity) * -1;
    //     return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    // },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
    }
}
};

module.exports = resolvers;