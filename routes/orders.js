var express = require('express');
var router = express.Router();
var orderService = require('../services/orderService')
var Order = require('../models/order').Order

  
/* GET all orders */
// http://localhost:3000/orders/ 
router.get('/', function(req, res, next) {
  orderService.getAllOrders().then((result) => {
        res.render('orders', { title: 'Orders', ordersArray: {data: result} })
  }) 
})

/* GET a new order - has an HTML form */
// http://localhost:3000/orders/new
router.get('/new', function(req, res, next) {
  res.render('newOrder', { title: 'Insert Orders' })
})

/* GET a delete order action with :id */
// http://localhost:3000/orders/delete/x
router.get('/delete/:id', function(req, res, next) {
  orderService.deleteOrder(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
      orderService.getAllOrders().then((result) => {
        res.render('orders', { title: 'Orders', ordersArray: {data: result} })
      })
    } else {
      res.render('newOrder')
    }
    console.log(result)
  })
})

/* POST an order */
router.post('/', function(req, res, next) {
  console.log(req.body);
  let Orderi = new Order(null,req.body.createdAt, req.body.updatedAt, req.body.customerId)
  // INSERT INTO db this Orderi
  orderService.insertOrder(Orderi).then((result) => {
    if(result.affectedRows == 1) {
      orderService.getAllOrders().then((result) => {
        res.render('orders', { title: 'Orders', ordersArray: {data: result} })
      })
    } else {
      res.render('newOrder')
    }
    console.log(result)
  })
})


/* POST update order */
// http://localhost:3000/orders/update
router.get('/update/:id', function(req, res, next) {
  res.render('editOrder', {title: 'Update Order'})
});



module.exports = router
