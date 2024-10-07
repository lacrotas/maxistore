const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', reviewController.addReview);
router.get('/getAll', reviewController.getAllReview);
router.get('/getAllById/:itemId', reviewController.getAllReviewByItemId);
router.get('/getAllByItemId/:itemId', reviewController.getAllReviewByItemIdAndIsShowed);
router.delete('/delete/:id', authenticateToken, reviewController.deleteReviewById);
router.delete('/deleteByItemId/:itemId', authenticateToken, reviewController.deleteReviewByItemId);
router.put('/update/:id', authenticateToken, reviewController.updatePodKategoryById);

module.exports = router; 