const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, itemController.addItem);
router.get('/getAll', itemController.getAllItems);
router.get('/getAllByKategoryId/:kategoryId', itemController.getAllItemsByKategoryId);
router.get('/getItemById/:id', itemController.getItemById);
router.get('/getAllByPodKategoryId/:podKategoryId', itemController.getAllItemsByPodKategoryId);
router.delete('/delete/:id', authenticateToken, itemController.deleteItemById);
// router.put('/update/:id', authenticateToken, itemController.updateUser);

module.exports = router;