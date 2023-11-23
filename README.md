# Order v0.4.6

##

### Order schema

#### linear equation / ratio

ordersModel.js

```js
const OrderSchema = mongoose.Schema({
  tax: {
    type: Number,
    required: true,
  },

  shippingFee: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
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
  name: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: Number, required: true},
  amount: {type:Number, required: true},

  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'sign',
    required: true,
  }
})

  const OrderSchema = mongoose.Schema({
  ...

    status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled']
    default: 'pending'
  },
  cartItems:[singleCartItemSchema],

  ...
})

```

### Order structure

#### CRUD for who

```js
import { StatusCodes } from 'http-status-codes'
import Orders from '../models/ordersModel.js'
import 'express-async-errors'
import { checkPermissions } from '../utils/checkPermissions.js'

export const createOrder = async (req, res) => {
  res.send('create order')
}

export const getAllOrders = async (req, res) => {
  res.send('get all orders')
}

export const getSingleOrder = async (req, res) => {
  res.send('get single order')
}

export const getCurrentUserOrders = async (req, res) => {
  res.send('createCurrentUserOrders')
}

export const updateOrder = async (req, res) => {
  res.send('update order')
}
```

#### privilaged order routes

orderRouter.js

```js
import { Router } from 'express'

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js'

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} from '../controllers/orderController.js'

const router = Router()

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions('user'), getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router.route('/:id').get(getSingleOrder).patch(updateOrder)
export default router
```

App.js

```js
import orderRouter from './routes/orderRouter'
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
}
```

```json
{
  "tax": 499,
  "shippingFee": 799,
  "items": [
    {
      "name": "accent chair",
      "price": 2599,
      "image": "/uploads/example.jpeg",
      "amount": 14,
      "sign": "6553667dd025a6b567cdc7cb"
    }
  ]
}
```

validationOrdersMiddleware.js

```js
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateOrdersInput = withValidationErrors([
  body('items').isArray({ min: 1 }).withMessage('cartItems is required'),
  body('tax').notEmpty().withMessage('tax is required'),
  body('shippingFee').notEmpty().withMessage('shippingFee is required'),
])
```

#### accumulate subtotals

ordersController.js

```js
const createOrder = async (req, res) => {

...
import { NotFoundError } from '../errors/customErrors.js'
import Sign from '../models/signModel.js'

export const createOrder = async (req, res) => {

let orderItems = []
let subtotal = 0

 for (const item of cartItems) {
    const dbProduct = await Sign.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.product}`)
    }
    const { name, price, image, _id } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }
    // add item to order
    orderItems = [...orderItems, singleOrderItem]
    // calculate subtotal
    subtotal += item.amount * price
  }
}
```

#### fake stripe payment

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
