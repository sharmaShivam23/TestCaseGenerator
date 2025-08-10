const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const TestCase = require('../controllers/TestCase');
const auth = require('../middleware/auth');

// Auth routes
router.use('/auth', authController);

// Protected API routes
router.get('/repos', auth , TestCase.listRepos); // list user repos
router.get('/repos/files', auth, TestCase.getRepoFiles); // ?repo=owner/repo&path=src
router.post('/generate/summary',  TestCase.generateSummary);
router.post('/generate/test',  TestCase.generateTestCase);
router.post('/create-pr', TestCase.createPR);

module.exports = router;
