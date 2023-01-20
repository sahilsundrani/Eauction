import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        trim: true,
        unique: [true, "Mobile Number already available"],
        type: String,
        required: [true, "Mobile Number is required"],
        validate(value) {
        if (value.length !== 10) {
          throw new Error("Mobile Number is invalid!");
        }
      }
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }, 
    address : {
        type : String,
    }
},{
    timestamps : true
});

const User = mongoose.model('User',userSchema);
export default User;
