const { Item } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class itemController {
    async addItem(req, res, next) {
        try {
            const { name, mainKategoryId, kategoryId, podKategoryId, price, isExist, isShowed, description } = req.body
            let fileName;
            try {
                const { image } = req.files;
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
            } catch (e) {
                console.log(e);
            }
            const kategory = await Item.create({
                name: name, mainKategoryId: mainKategoryId, kategoryId: kategoryId, podKategoryId: podKategoryId,
                image: fileName, price: price, isExist: isExist, isShowed: isShowed, description: description, rating: "0",
                reviewNumber: "0"
            })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllItems(req, res) {
        const kategory = await Item.findAll();
        return res.json(kategory);
    }
    async getItemById(req, res) {
        const { id } = req.params
        const kategory = await Item.findOne(
            { where: { id } }
        );
        return res.json(kategory);
    }
    async getAllItemsByMainKategoryId(req, res) {
        const { mainKategoryId } = req.params
        const kategory = await Item.findAll(
            { where: { mainKategoryId } }
        );
        return res.json(kategory);
    }
    async getAllItemsByKategoryId(req, res) {
        const { kategoryId } = req.params
        const kategory = await Item.findAll(
            { where: { kategoryId } }
        );
        return res.json(kategory);
    }
    async getAllItemsByPodKategoryId(req, res) {
        const { podKategoryId } = req.params
        const kategory = await Item.findAll(
            { where: { podKategoryId } }
        );
        return res.json(kategory);
    }

    async deleteItemById(req, res) {
        const { id } = req.params
        const mainKategory = await Item.findOne(
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
        await mainKategory.destroy();
        return res.json('deleted');
    }
    // async updateItemById(req, res) {
    //     const { id } = req.params;
    //     const { name, price, isExist, isShowed, description } = req.body;
    //     let fileName;

    //     // Создаем объект для обновления данных
    //     let updateData = {};

    //     // Устанавливаем только те поля, которые переданы
    //     if (name) updateData.name = name;
    //     if (price) updateData.price = price;
    //     if (isExist !== undefined) updateData.isExist = isExist;
    //     if (isShowed !== undefined) updateData.isShowed = isShowed;
    //     if (description) updateData.description = description;

    //     // change new image and delete old
    //     try {
    //         const { image } = req.files || {}; // Проверяем, есть ли файл в запросе
    //         const mainKategory = await PodKategory.findOne({ where: { id } });

    //         if (mainKategory.image && image) {
    //             const imagePath = path.resolve(__dirname, '..', 'static', mainKategory.image);
    //             fs.unlink(imagePath, (err) => {
    //                 if (err) {
    //                     console.error(`Failed to delete image file: ${err.message}`);
    //                 }
    //             });
    //             fileName = uuid.v4() + ".jpg";
    //             image.mv(path.resolve(__dirname, '..', 'static', fileName));
    //             updateData.image = fileName; // Если новое изображение, добавляем его в данные для обновления
    //         }
    //     } catch (error) {
    //         if (req.body.image) {
    //             updateData.image = req.body.image; // Если изображение передано как строка, сохраняем его
    //         }
    //     }

    //     try {
    //         const [updatedRowsCount, updatedRows] = await Item.update(
    //             updateData, // Передаем только заполненные поля
    //             {
    //                 returning: true,
    //                 where: { id }
    //             }
    //         );

    //         if (updatedRowsCount > 0) {
    //             // Данные успешно обновлены, возвращаем обновленные данные
    //             res.status(200).json({ message: 'Данные успешно обновлены', updatedRows });
    //         } else {
    //             // Запись с указанным id не найдена
    //             res.status(404).json({ message: 'Запись не найдена' });
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при обновлении данных:', error);
    //         res.status(500).json({ message: 'Ошибка сервера' });
    //     }
    // }

    async updateItemById(req, res) {
        const { id } = req.params;
        const { name, price, isExist, isShowed, description } = req.body
        let fileName;
        // change new image and delete old
        try {
            const { image } = req.files;
            const mainKategory = await Item.findOne(
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
            const [updatedRowsCount, updatedRows] = await Item.update(
                {
                    name: name,
                    price: price,
                    isExist: isExist,
                    isShowed: isShowed,
                    description: description,
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

module.exports = new itemController();