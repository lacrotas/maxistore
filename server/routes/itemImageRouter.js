const Router = require('express');
const router = new Router();
const itemImageController = require('../controllers/itemImageController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, itemImageController.addItemImage);
router.get('/getAll/:itemId', itemImageController.getAllImageByItemId);
router.delete('/deleteItemImageById/:id', itemImageController.deleteItemImageById);
// router.put('/update/:id', authenticateToken, itemController.updateUser);

module.exports = router;