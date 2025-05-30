const { MainKategory } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class MainKategoryController {

    async addMainKategory(req, res, next) {
        try {
            const { name } = req.body
            let fileName;
            try {
                const { image } = req.files;
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
            } catch (e) {
                console.log(e);
            }
            const mainKategory = await MainKategory.create({ name, image: fileName })
            return res.json(mainKategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllMainKategory(req, res) {
        const mainKategory = await MainKategory.findAll();
        return res.json(mainKategory);
    }
    async getMainKategoryById(req, res) {
        const { id } = req.params
        const mainKategory = await MainKategory.findOne(
            { where: { id } }
        )
        return res.json(mainKategory);
    }
    async deleteMainKategoryById(req, res) {
        const { id } = req.params
        const mainKategory = await MainKategory.findOne(
            { where: { id } }
        )
        await mainKategory.destroy();
        return res.json('deleted');
    }
    async updateMainKategoryById(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        let fileName;
        // change new image and delete old
        try {
            const { image } = req.files;
            const mainKategory = await MainKategory.findOne(
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
            const [updatedRowsCount, updatedRows] = await MainKategory.update(
                {
                    name: name,
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

module.exports = new MainKategoryController();