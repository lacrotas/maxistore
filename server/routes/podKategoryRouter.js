const Router = require('express');
const router = new Router();
const podKategoryController = require('../controllers/podKategoryController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, podKategoryController.addPodKategory);
router.get('/getAll', podKategoryController.getAllPodKategory);
router.get('/getpodCategory/:id', podKategoryController.getPodKategoryById);
router.get('/getAllByKategoryId/:kategoryId', podKategoryController.getAllPodKategoryByKategoryId);
router.delete('/delete/:id', authenticateToken, podKategoryController.deletePodKategoryById);
router.put('/update/:id', authenticateToken, podKategoryController.updatePodKategoryById);

module.exports = router;