const Router = require('express');
const router = new Router();
const qwestionController = require('../controllers/qwestionController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, qwestionController.addQwestion);
router.get('/getAll', qwestionController.getAllQwestion);
router.delete('/delete/:id', authenticateToken, qwestionController.deleteItemById);
// router.put('/update/:id', authenticateToken, attributeController.updateAttributeById);

module.exports = router; 