const Router = require('express');
const router = new Router();
const itemAttributeController = require('../controllers/itemAttributeController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, itemAttributeController.addItemAttribute);
router.get('/getAllByItemId/:itemId', itemAttributeController.getAllItemAttributeByItemId);
router.delete('/delete/:id', authenticateToken, itemAttributeController.deleteItemAttributeById);
// router.put('/update/:id', authenticateToken, itemAttributeController.updateAttributeById);

module.exports = router; 