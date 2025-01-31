const mongoose = require("mongoose");


const bankSchema = mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    ifscCode :{
        type:String,
        minlength:[11,"IFSC code should be of minimum 11 digits."],
        require:[true, "IFSC code is required"],
        
    },
    branchName:{
        type:String,
        minlength:[6,"Branch name should be of minimum 6 character."],
        require:[true, "Branch name is required"],
        
    },
    bankName:{
        type:String,
        minlength:[3,"Bank name should be of minimum 3 character."],
        require:[true, "Bank name is required"]
    },
    accountNumber:{
        type:String,
        minlength:[10,"Account number should be of minimum 10 digits."],
        require:[true, "Account number is required"],
        unique:true
    },
    accountHolderName:{
        type:String,
        minlength:[3,"Account holder name should be of minimum 3 character."],
        require: [true, "Account holder name is required"]
    }
});

const BankAccount = mongoose.model("Bank",bankSchema);

module.exports = BankAccount;