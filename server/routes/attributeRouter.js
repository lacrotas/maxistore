const Router = require('express');
const router = new Router();
const attributeController = require('../controllers/attributeController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, attributeController.addAttribute);
router.get('/getAllByKategoryId/:kategoryId', attributeController.getAllAttributeByKategoryId);
router.get('/getAttributeById/:id', attributeController.getAttributeById);
router.get('/getAllByPodKategoryId/:podKategoryId', attributeController.getAllAttributeByPodKategoryId);
router.delete('/delete/:id', authenticateToken, attributeController.deleteAttributeById);
router.put('/update/:id', authenticateToken, attributeController.updateAttributeById);

module.exports = router; 