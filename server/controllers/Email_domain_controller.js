import { Email, Domain } from "../models/Email_domain_model.js";

// Add a new email and password
export const addEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = req.user.userId; // Access userId correctly

    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newEmail = new Email({ userId, email, password });
    await newEmail.save();
    res.status(201).json({ message: 'Email added successfully', email: newEmail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all additional emails for the logged-in user
export const getEmails = async (req, res) => {
  try {
    const userId = req.user.userId; // Access userId correctly
    const emails = await Email.find({ userId });
    res.status(200).json({ emails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new domain
export const addDomain = async (req, res) => {
  try {
    const { domainName } = req.body;
    const userId = req.user.userId; // Access userId correctly

    const existingDomain = await Domain.findOne({ domainName });
    if (existingDomain) {
      return res.status(400).json({ message: 'Domain already exists' });
    }

    const newDomain = new Domain({ userId, domainName });
    await newDomain.save();
    res.status(201).json({ message: 'Domain added successfully', domain: newDomain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all domains for the logged-in user
export const getDomains = async (req, res) => {
  try {
    const userId = req.user.userId; // Access userId correctly
    const domains = await Domain.find({ userId });
    res.status(200).json({ domains });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
