const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const TestCase = require('../controllers/TestCase');
const auth = require('../middleware/auth');
const {createContact} = require('../controllers/Contact');
const rateLimit = require("express-rate-limit");

const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    error: "Too many contact request, please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

router.use('/auth', authController);


router.get('/repos', auth , TestCase.listRepos); 
router.get('/repos/files', auth, TestCase.getRepoFiles); 
router.post('/generate/summary',  TestCase.generateSummary);
router.post('/generate/test',  TestCase.generateTestCase);
router.post('/create-pr', TestCase.createPR);
router.post('/contact', contactFormLimiter, createContact);

module.exports = router;
