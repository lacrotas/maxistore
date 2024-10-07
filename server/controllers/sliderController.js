const { Slider } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class sliderController {
    async addSlider(req, res, next) {
        try {
            const { label, description, link } = req.body
            let fileName;
            try {
                const { image } = req.files;
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
            } catch (e) {
                console.log(e);
            }
            const kategory = await Slider.create({ label: label, description: description, link: link, image: fileName })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllSlider(req, res) {
        const attribute = await Slider.findAll();
        return res.json(attribute);
    }
    async getSliderById(req, res) {
        const { id } = req.params
        const attribute = await Slider.findOne(
            { where: { id } }
        );
        return res.json(attribute);
    }
    async deleteSliderById(req, res) {
        const { id } = req.params
        const kategory = await Slider.findOne(
            { where: { id } }
        )
        if (kategory.image) {
            const imagePath = path.resolve(__dirname, '..', 'static', kategory.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image file: ${err.message}`);
                }
            });
        }
        await kategory.destroy();
        return res.json('deleted');
    }
    async updateSliderById(req, res) {
        const { id } = req.params;
        const { label, description, link } = req.body;
        let fileName;
        // change new image and delete old
        try {
            const { image } = req.files;
            const mainKategory = await Slider.findOne(
                { where: { id } }
            )
            if (mainKategory.image) {
                const imagePath = path.resolve(__dirname, '..', 'static', mainKategory.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image file: ${err.message}`);
                    }
                });
            }
            fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
        } catch (error) {
            const { image } = req.body;
            if (image) {
                fileName = image;
            }
        }
        try {
            const [updatedRowsCount, updatedRows] = await Slider.update(
                {
                    label: label,
                    description: description,
                    link: link,
                    image: fileName,
                },
                {
                    returning: true,
                    where: { id }
                }
            );

            if (updatedRowsCount > 0) {
                // Данные успешно обновлены, возвращаем обновленные данные
                res.status(200).json({ message: 'Данные успешно обновлены', updatedRows });
            } else {
                // Запись с указанным id не найдена
                res.status(404).json({ message: 'Запись не найдена' });
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new sliderController();