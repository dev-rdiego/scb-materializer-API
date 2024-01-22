const Mongoose = require("mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "scb-db";

const dburi = process.env.DBURI ||
    `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async () => {
    try {
        await Mongoose.connect(dburi);
        console.log("Connected to DB!");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = {
    connect
}