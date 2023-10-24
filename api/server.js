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
// // const router = jsonServer.router('db.json')
// const router = jsonServer.router(path.join(__dirname, 'db.json'))

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

// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//     if (req.method === 'POST') {
//         req.body.createdAt = Date.now()
//     }
//     // Continue to JSON Server router
//     next()
// })

// // Export the Server API
// module.exports = server


// api/server.js

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom routes for CRUD operations
server.post('/products', (req, res, next) => {
    // Assuming req.body contains the new product object
    const newProduct = req.body;
    newPorduct.id = Math.florr(Math.random()*1000)
    // Add the new product to the database
    router.db.get('products').push(newProduct).write();
    res.json(newProduct);
});

server.get('/products', (req, res, next) => {
    // Retrieve all products from the database
    const products = router.db.get('products').value();
    res.json(products);
});

server.put('/products/:id', (req, res, next) => {
    // Assuming req.body contains the updated product object
    const updatedProduct = req.body;
    // Update the product with the specified ID in the database
    router.db.get('products').find({ id: req.params.id }).assign(updatedProduct).write();
    res.json(updatedProduct);
});

server.patch('/products/:id', (req, res, next) => {
    // Assuming req.body contains the specific fields to update
    const updatedFields = req.body;
    // Update specific attributes of the product with the specified ID in the database
    router.db.get('products').find({ id: req.params.id }).assign(updatedFields).write();
    res.json(router.db.get('products').find({ id: req.params.id }).value());
});

server.delete('/products/:id', (req, res, next) => {
    // Delete the product with the specified ID from the database
    router.db.get('products').remove({ id: req.params.id }).write();
    res.sendStatus(200);
});

// Use the custom routes along with the JSON Server router
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

