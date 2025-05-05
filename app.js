const app = require('express')();

app.get('/', (req, res) => {
    res.json({
        message: 'Docker is easy 🐋'
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
})