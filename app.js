const app = require('express')();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/native-example';

app.get('/api/cars', (req, res) => {
    MongoClient.connect(url,{ useNewUrlParser: true } ,(err, db) => {
        if(err) {
            return res.status(500).send('An internal server error has occured');
        }

        db.collection('cars')
            .find()
            .then(cars => res.status(200).json(cars))
            .catch(error => res.status(500).send('An internal server error has occured'));
    });
});
app.listen(8080, ()=>{console.log('listening 8080')});

module.exports = app;