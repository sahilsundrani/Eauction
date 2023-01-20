import express from 'express';
const app = express();
const port = 8000;
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import passportJWT from './config/passport-jwt.js';
import db from './config/mongoose.js';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({ secret: 'SECRET' }))
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.listen(port,function(err){
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`Server is up and listening on port: ${port}`);
});