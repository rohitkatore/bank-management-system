const BankAccount = require("../models/bank.model");

const allBanks = async (req, res) => {
  try {
    const allBankAccounts = await BankAccount.find().populate(
      "user",
      "username email"
    );
    
    if (!allBankAccounts || allBankAccounts.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No bank accounts found." 
      });
    }

    return res.status(200).json({ 
      success: true, 
      allBankAccounts,
      count: allBankAccounts.length
    });

  } catch (err) {
    console.error('Error fetching all banks:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: err.message 
    });
  }
};

const searchBanks = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: "Search query is required" 
      });
    }

    const results = await BankAccount.find({
      $or: [
        { bankName: { $regex: query, $options: "i" } },
        { accountHolderName: { $regex: query, $options: "i" } },
        { branchName: { $regex: query, $options: "i" } },
        { ifscCode: { $regex: query, $options: "i" } }
      ],
    }).populate("user", "username email");

    return res.status(200).json({ 
      success: true, 
      results,
      count: results.length
    });

  } catch (err) {
    console.error('Error searching banks:', err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: err.message 
    });
  }
};

module.exports = { allBanks, searchBanks };
