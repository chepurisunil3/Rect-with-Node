const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDBURI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }
    catch (e) {
        console.log(e)
        process.exit(1);
    }
    
}
module.exports = connectToMongoDB;
