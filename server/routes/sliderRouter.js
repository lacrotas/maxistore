const Router = require('express');
const router = new Router();
const sliderController = require('../controllers/sliderController');
const { authenticateToken } = require('../middleware/authMiddleware');

// router.post('/add', authenticateToken, sliderController.addAttribute);
// router.get('/getAll', sliderController.getAllAttribute);
// router.delete('/delete/:id', authenticateToken, sliderController.deleteAttributeById);
// router.put('/update/:id', authenticateToken, sliderController.updateAttributeById);
router.post('/add', sliderController.addSlider);
router.get('/getAll', sliderController.getAllSlider);
router.get('/getById/:id', sliderController.getSliderById);
router.delete('/delete/:id', sliderController.deleteSliderById);
router.put('/update/:id', sliderController.updateSliderById);

module.exports = router; 