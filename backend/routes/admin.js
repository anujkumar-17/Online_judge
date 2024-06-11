const express = require('express');
const router = express.Router();
const {registerAdmin,loginAdmin,getAdminDashboard,} = require('../controllers/admin');
const authenticateAdmin = require('../middleware/authadmin');
// const authMiddleware = require('../middleware/user');

// router.post('/register', authMiddleware.authenticateAdmin, adminController.registerAdmin);
// router.post('/login', adminController.loginAdmin);
// router.get('/dashboard', authMiddleware.authenticateAdmin, adminController.getAdminDashboard);

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/dashboard', authenticateAdmin, getAdminDashboard);

module.exports = router;