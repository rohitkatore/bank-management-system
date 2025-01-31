const { validationResult } = require("express-validator");
const BankAccount = require("../models/bank.model");


const addBank = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Invalid account details.",
        errors: errors.array(),
      });
  }
  try {
    const user = req.user;
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
      req.body;
    if (
      !ifscCode ||
      !branchName ||
      !bankName ||
      !accountNumber ||
      !accountHolderName
    ) {
     return  res
        .status(401)
        .json({ success: false, message: "All fields are required." });
    }

    const newBankAccount = new BankAccount({
        user: user._id,
        ifscCode,
        branchName,
        bankName,
        accountNumber,
        accountHolderName
    });
    const createdBankAccount = await newBankAccount.save();

    if(! createdBankAccount){
        return res.status(401).json({success:false,message:"Bank account not added."});
    }
    return res.status(201).json({success:true,message:"Bank added successfully."});
  } catch (err) {
    console.log(err);
    return res.status(401).json({success:false,message:"Internal server error."});
  }
};

const viewBank = async (req, res) => {
   const user = req.user;
    try{
        const BankAccounts = await BankAccount.find({user:user._id});
        if(!BankAccounts){
            return res.status(401).json({success:false,message:"No bank account found."});
        }
        return res.status(201).json({success:true,BankAccounts});
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false,message:"Internal server error."});
    }
};

const viewSingleBank = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
        const bankAccount = await BankAccount.findOne({ _id: id, user: user._id });
        if (!bankAccount) {
            return res.status(404).json({ success: false, message: "Bank account not found." });
        }
        return res.status(200).json({ success: true, bankAccount });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const editBank = async (req, res) => {
    const user = req.user;
    const {id} = req.params;
    const updatedBank = req.body;
    console.log(updatedBank);
    try{
        const bankAccount = await BankAccount.findOne({_id:id ,user:user._id});

        if(!bankAccount){
            return res.status(401).json({success:false,message:"bank accound not found."});
        }

        Object.assign(bankAccount,updatedBank);
        const newUpdatedBank = await bankAccount.save();
        if(!newUpdatedBank){
            return res.status(401).json({success:false,message:"Unable to update bank account."});
        }
        return res.status(201).json({success:true,message:"Bank account updated successfully."});
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false,message:"Internal server error."});
    }
};

const removeBank = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
    
        const bankAccount = await BankAccount.findOneAndDelete({ _id: id, user: user._id });
    
        if (!bankAccount) {
          return res.status(404).json({ message: 'Bank account not found' });
        }
    
        res.status(200).json({ message: 'Bank account deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

module.exports = { addBank, viewBank, viewSingleBank, editBank, removeBank };
