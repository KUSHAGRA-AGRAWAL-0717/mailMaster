import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addEmail, getEmails, addDomain, getDomains } from "../controllers/Email_domain_controller.js";

const router = express.Router();

// Route to add a new email and password
router.route("/add-email").post(isAuthenticated, addEmail);

// Route to get all emails for the logged-in user
router.route("/emails").get(isAuthenticated, getEmails);

// Route to add a new domain
router.route("/add-domain").post(isAuthenticated, addDomain);

// Route to get all domains for the logged-in user
router.route("/domains").get(isAuthenticated, getDomains);

// Use export default instead of module.exports
export default router;
