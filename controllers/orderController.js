import { StatusCodes } from 'http-status-codes'
import Order from '../models/ordersModel.js'
import 'express-async-errors'
import { checkPermissions } from '../utils/checkPermissions.js'

import { NotFoundError } from '../errors/customErrors.js'
import Sign from '../models/signModel.js'

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue'
  return { client_secret, amount }
}

export const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  let orderItems = []
  let subtotal = 0

  for (const item of cartItems) {
    const dbProduct = await Sign.findOne({ _id: item.sign })
    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.sign}`)
    }
    const { title, price, image, _id } = dbProduct

    const singleOrderItem = {
      amount: item.amount,
      title,
      price,
      image,
      sign: _id,
    }
    // add item to order
    orderItems = [...orderItems, singleOrderItem]
    // calculate subtotal
    subtotal += item.amount * price
  }

  // calculate total
  const total = tax + shippingFee + subtotal
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  })

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  })

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
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
