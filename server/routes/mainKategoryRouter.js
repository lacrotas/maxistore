const Router = require('express');
const router = new Router();
const MainKategoryController = require('../controllers/mainKategoryController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, MainKategoryController.addMainKategory);
router.get('/getAll', MainKategoryController.getAllMainKategory);
router.get('/getMainKategoryById/:id', MainKategoryController.getMainKategoryById);
router.delete('/delete/:id', authenticateToken, MainKategoryController.deleteMainKategoryById);
router.put('/update/:id', authenticateToken, MainKategoryController.updateMainKategoryById);
module.exports = router;