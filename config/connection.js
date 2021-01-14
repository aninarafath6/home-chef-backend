const mongoClient = require("mongodb").MongoClient;
const state = {
    db: null
}
module.exports.connect = (done) => {
    const url = 'mongodb+srv://anin:gdLUr6509fO4JFGY@home-chef.tczol.mongodb.net/home-chef?retryWrites=true&w=majority';
    const dbname = 'home-chef';
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done();

    })

}
module.exports.get = () => {
    return state.db
}