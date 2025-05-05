const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const salesdata = [
    { id: 1, product: 'T-Shirt', price:1000, quantity: 2},
    { id: 2, product: 'Shirt', price: 500, quantity: 1},
    { id: 3, product: 'Shoes', price: 3000, quantity: 3},
    { id: 4, product: 'Pant', price: 1500, quantity: 2},
    { id: 5, product: 'Watch', price: 2200, quantity: 4}
];

//sales data
app.get('/sales', (req, res) => {
    res.json(salesdata);
});

//sales summary
app.get('/summary', (req, res) => {
    let totalOrders = salesdata.length;
    let totalRevenue = 0;

    //total revenue
    for(const sale of salesdata) {
        totalRevenue += sale.price * sale.quantity;
    }

    // stores products and their quantities
    let products = {};
    salesdata.forEach(sale => {
        if(products[sale.product]) {
            products[sale.product] += sale.quantity;
        }
        else {
            products[sale.product] = sale.quantity;
        }
    });

    // find the product with the maximum quantity sold
    let max_value = 0;
    let top_product = '';
    for(const product in products) {
        if(products[product] > max_value) {
            max_value = products[product];
            top_product = product;
        }
    }
    res.json({totalOrders, totalRevenue, top_product, max_value});

});

app.listen(3000);