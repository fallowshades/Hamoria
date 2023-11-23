# Order v0.4.6

##

### Order schema

#### linear equation / ratio

Orders.js

```js

const OrderSchema = mongoose.Schema({
  tax : {
    type: Number,
    required: true,
  }

  shippingFee: {
    type: Number,
    required: true,
  }
  subtotal: {
    type: Number,
    required: true
  }

  total: {
    type:Number,
    required: true
  }
})

```

#### identified package delivery

```js
const OrderSchema = mongoose.Schema({
  ...


  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    required: true,
  },



  clientSecret: {
    type: String,
    required: true,
  }

  paymentIntentId: {
    type: String,
  }

  })
```

#### sign considerate type (color etc.)

orders.js

```js

const SingleCartItemSchema = mongoose.Schema({
  name: {type: String, required: true}
  image: {type: String, required: true}
  price: {type: Number, required: true}
  amount: {type:Number, required: true}

  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  }
})

  const OrderSchema = mongoose.Schema({
  ...

    status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled']
    default: 'pending'
  }
  cartItems:[singleCartItemSchema],

  ...
})

```

### Order structure

#### CRUD for who

```js
const createOrder = async (req, res) => {
  res.send('create order')
}

const getAllOrder = async (req, res) => {
  res.send('get all orders')
}

const getSingleOrder = async (req, res) => {
  res.send('get single order')
}

const getCurrentUserOrders = async (req, res) => {
  res.send('createCurentUserOrders')
}

const updateOrder = async (req, res) => {
  res.send('update order')
}
```

#### privilaged order routes

orderRouter.js

```js
const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizedPermissions,
} = require('../controllers/orderController')

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../middleware/orderController')

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticatedUser, authorizedPermissions)
```

App.js

```js
const orderRouter = require('./routes/orderRoutes')
app.use('/api/v1/orders', orderRouter)
```

### update review

#### implication

test in postman

reviewRouter.

#### create order handle user input (linear equation & bad)

```js
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }

  if (!tax || !shhippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee')
  }
}
```

#### accumulate subtotals

ordersController.js

```js
const createOrder = async (req, res) => {

...

let orderItems = []
let subtotal = 0

for(const item of cartItems){
const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
}
    subtotal += item.amount * price;}
```

```js
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue'
  return { client_secret, amount }
}
```

```js
const createOrder = async (req, res) => {
  ...

// calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
}
```
