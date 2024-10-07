const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.get('/auth', authenticateToken, userController.check);

module.exports = router;