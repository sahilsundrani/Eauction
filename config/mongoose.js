import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/eauction_development',{useNewUrlParser: true});

const db = mongoose.connection;

mongoose.set('strictQuery', true);

db.on('error',console.error.bind(console,'Error connecting to mongodb'));
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

export default db;

