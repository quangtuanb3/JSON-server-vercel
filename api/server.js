// // See https://github.com/typicode/json-server#module
// const jsonServer = require('json-server')

// const server = jsonServer.create()

// // Uncomment to allow write operations

// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);


// // Comment out to allow write operations
// const router = jsonServer.router('db.json')

// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'db.json');
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom route for creating a new product
server.post('/products', (req, res) => {
    const newProduct = req.body;
    db.products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    res.json(newProduct);
});

// Custom route for updating a product
server.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const index = db.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
        db.products[index] = updatedProduct;
        fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Custom route for deleting a product
server.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const index = db.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
        db.products.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
        res.sendStatus(200);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

module.exports = server;
