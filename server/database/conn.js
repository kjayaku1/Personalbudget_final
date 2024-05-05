const mongoose = require('mongoose');

async function databaseConnection () {
    const userNameMongodb = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

    const mongoUrl = "mongodb://127.0.0.1:27017/";
    // const mongoUrl = `mongodb+srv://${userNameMongodb}:${password}@cluster0.icoqamg.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUrl, { dbName: "PersonalBudget"});
}

module.exports = databaseConnection;