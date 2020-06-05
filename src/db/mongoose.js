const mongoose = require('mongoose');

const MONGO_HOST = process.env.MONGO_HOST || "mongo"
const MONGO_PORT = process.env.MONGO_PORT || 27017

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/orders-api`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})