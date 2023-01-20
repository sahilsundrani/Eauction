import express from 'express';
import users from '../routes/users.js';
const router = express.Router();

console.log('Router is working');

router.get('/', (req, res) => {
    return res.status(200).json({message: "Server Working"});
});
router.use('/users', users);
export default router;