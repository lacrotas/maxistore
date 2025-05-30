const Router = require('express');
const router = new Router();
const kategoryController = require('../controllers/kategoryController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, kategoryController.addKategory);
router.get('/getAll', kategoryController.getAllKategory);
router.get('/getKategory/:id', kategoryController.getKategoryById);
router.get('/getAllKategory/:mainKategoryId', kategoryController.getAllKategoryByMainKategoryId);
router.delete('/delete/:id', authenticateToken, kategoryController.deleteKategoryById);
// router.delete('/deleteAllkategotyByMainKategoryId/:mainKategoryId', authenticateToken, kategoryController.deleteAllRelationInMainKategoryByMainKategoryId);
router.put('/update/:id', authenticateToken, kategoryController.updateKategoryById);

module.exports = router;