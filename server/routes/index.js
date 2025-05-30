const Router = require('express');
const router = new Router();
/* routers */
const userRouter = require('./userRouter');
const mainKategoryRouter = require('./mainKategoryRouter');
const kategoryRouter = require('./kategoryRouter');
const podKategoryRouter = require('./podKategoryRouter');
const attributeRouter = require('./attributeRouter');
const attributeValueRouter = require('./attributeValueRouter');
const sliderRouter = require('./sliderRouter');
const itemRouter = require('./itemRouter');
const itemImageRouter = require('./itemImageRouter');
const itemAttributeRouter = require('./itemAttributeRouter');
const qwestionRouter = require('./qwestionRouter');
const reviewRouter = require('./reviewRouter');
const orderRouter = require('./orderRoutes');

router.use('/order', orderRouter);
router.use('/user', userRouter)
router.use('/mainKategoryRouter', mainKategoryRouter);
router.use('/kategoryRouter', kategoryRouter);
router.use('/podKategoryRouter', podKategoryRouter);
router.use('/attributeRouter', attributeRouter);
router.use('/attributeValueRouter', attributeValueRouter);
router.use('/sliderRouter', sliderRouter);
router.use('/itemRouter', itemRouter);
router.use('/itemImageRouter', itemImageRouter);
router.use('/itemAttributeRouter', itemAttributeRouter);
router.use('/qwestionRouter', qwestionRouter);
router.use('/reviewRouter', reviewRouter);


module.exports = router;