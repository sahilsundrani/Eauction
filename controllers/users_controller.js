import User from '../models/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { request } from 'express';


const createUser = (req,res) => { 
    if (req.body.password != req.body.confirm_password){
        return res.status(200).json({"message": "passwords don't match"});
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log('error in finding user in signing up',err);
            return res.status(200).json({message: err});
        }
        if (!user){
            User.create(req.body, (err,user) => {
                if (err) {
                    console.log('error in finding user in signing up',err);
                    return;
                }
                console.log(`user created succesfully.Welcome ${req.body.name}`)
                return res.status(200).json({message: "success"});
            });
        }else{
            return res.status(200).json({message: "user already exists"});
        }
    });
}





const signIn = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in.ejs',{
        title: 'E-Auctioner',
        statement:"Hoii"
    });
}

const returnToken = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: 'Invalid username/password'
            });
        } return res.status(200).json({
            token: jwt.sign(user.toJSON(), 'dMCIQxeJlG5OeIrunZobBxFsDMLsquJK', { expiresIn: '1000000' })
        });
    } catch(err) {
        return res.status(404).json({
            error: err
        });
    }
}

// const createSession = async (req, res) => {
//     console.log("Done")
//     try {
//         let user = await User.findOne({ username: req.body.username });
//         if (!user || user.password != req.body.password) {
//             return res.status(422).json({
//                 message: 'Invalid Username/Password'
//             });
//         }
        
//         return res.status(200).json({
//             message: 'Sign in Successful, here is your token please keep it safe!',
//             token: jwt.sign(user.toJSON(), 'dMCIQxeJlG5OeIrunZobBxFsDMLsquJK', { expiresIn: '1000000' })
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: 'Internal Server Error'
//         });
//     }
// }


const destroySession = (req, res) => {
    try {
        req.logout();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export { signIn, createUser, destroySession, returnToken };
