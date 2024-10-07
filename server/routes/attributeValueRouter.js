const Router = require('express');
const router = new Router();
const kategoryController = require('../controllers/attributeValueController');
const {authenticateToken} = require('../middleware/authMiddleware');

router.get('/getAll', kategoryController.getAllAttributeValue);
router.get('/getAllAttributeValueByAttributeId/:id', kategoryController.getAllAttributeValueByAttributeId);
router.get('/getAttributeValueById/:id', kategoryController.getAttributeValueById);
router.post('/add', authenticateToken, kategoryController.addAttributeValue);
router.delete('/delete/:id', authenticateToken, kategoryController.deleteAttributeValueById);
router.put('/update/:id', authenticateToken, kategoryController.updateAttributeValueById);

module.exports = router;