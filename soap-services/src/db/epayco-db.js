const mongoose = require('mongoose');
const DATA_BASE_URL = `mongodb://127.0.0.1:27017/epayco`;

mongoose.connect(DATA_BASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, 
})