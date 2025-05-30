const { Kategory } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');

class kategoryController {

    async addKategory(req, res, next) {
        try {
            const { name, mainKategoryId } = req.body
            let fileName;
            try {
                const { image } = req.files;
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName));
            } catch (e) {
                console.log(e);
            }
            const kategory = await Kategory.create({ name: name, mainKategoryId: mainKategoryId, image: fileName })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllKategory(req, res) {
        const kategory = await Kategory.findAll();
        return res.json(kategory);
    }
    async getAllKategoryByMainKategoryId(req, res) {
        const { mainKategoryId } = req.params
        const kategory = await Kategory.findAll(
            { where: { mainKategoryId } }
        );
        return res.json(kategory);
    }
    async getKategoryById(req, res) {
        const { id } = req.params
        const kategory = await Kategory.findOne(
            { where: { id } }
        )
        return res.json(kategory);
    }
    async deleteKategoryById(req, res) {
        const { id } = req.params
        const kategory = await Kategory.findOne(
            { where: { id } }
        )
        // if (kategory.image) {
        //     const imagePath = path.resolve(__dirname, '..', 'static', kategory.image);
        //     fs.unlink(imagePath, (err) => {
        //         if (err) {
        //             console.error(`Failed to delete image file: ${err.message}`);
        //         }
        //     });
        // }
        await kategory.destroy();
        return res.json('deleted');
    }
    async updateKategoryById(req, res) {
        const { id } = req.params;
        const { name, mainKategoryId } = req.body;
        let fileName;
        // change new image and delete old
        try {
            const { image } = req.files;
            const mainKategory = await Kategory.findOne(
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
            const [updatedRowsCount, updatedRows] = await Kategory.update(
                {
                    name: name,
                    mainKategoryId: mainKategoryId,
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
    // async deleteAllRelationInMainKategoryByMainKategoryId(req, res) {
    //     const { mainKategoryId } = req.params
    //     const kategory = await Kategory.findAll(
    //         { where: { mainKategoryId } }
    //     )
    //     // delete kategoty and podKategory and their images
    //     for (const item of kategory) {
    //         if (item.image) {
    //             const imagePath = path.resolve(__dirname, '..', 'static', item.image);
    //             fs.unlink(imagePath, (err) => {
    //                 if (err) {
    //                     console.error(`Failed to delete image file: ${err.message}`);
    //                 }
    //             });
    //         }
    //         const podkategory = await PodKategory.findAll(
    //             { where: { kategoryId: String(item.id) } }
    //         )
    //         for (const podItem of podkategory) {
    //             await podItem.destroy();
    //         }
    //         await item.destroy();
    //     }
    //     // delete items
    //     const items = await Item.findAll(
    //         { where: { mainKategoryId } }
    //     )
    //     for (const item of items) {
    //         if (item.image) {
    //             const imagePath = path.resolve(__dirname, '..', 'static', item.image);
    //             fs.unlink(imagePath, (err) => {
    //                 if (err) {
    //                     console.error(`Failed to delete image file: ${err.message}`);
    //                 }
    //             });
    //         }
    //         // delete itemAttribute
    //         const itemAttributeArr = await ItemAttribute.findAll(
    //             { where: { itemId: String(item.id) } }
    //         )
    //         for (const itemAtr of itemAttributeArr) {
    //             await itemAtr.destroy();
    //         }
    //         // delete itemImage
    //         const itemImageArr = await ItemImage.findAll(
    //             { where: { itemId: String(item.id) } }
    //         )
    //         for (const itemImage of itemImageArr) {
    //             if (item.image) {
    //                 const imagePath = path.resolve(__dirname, '..', 'static', item.image);
    //                 fs.unlink(imagePath, (err) => {
    //                     if (err) {
    //                         console.error(`Failed to delete image file: ${err.message}`);
    //                     }
    //                 });
    //             }
    //             await itemImage.destroy();
    //         }
    //         await item.destroy();
    //     }
    //     //delete attribute 
    //     return res.json('deleted');
    // }
}

module.exports = new kategoryController();