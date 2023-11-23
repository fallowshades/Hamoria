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
