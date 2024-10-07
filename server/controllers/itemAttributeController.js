const { ItemAttribute } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class itemAttributeController {
    async addItemAttribute(req, res, next) {
        try {
            const { itemId, attributeId, valueId } = req.body
            const attribute = await ItemAttribute.create({ itemId: itemId, attributeId: attributeId, valueId: valueId })
            return res.json(attribute);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllItemAttributeByItemId(req, res) {
        const { itemId } = req.params
        const attribute = await ItemAttribute.findAll(
            { where: { itemId } }
        );
        return res.json(attribute);
    }
    async deleteItemAttributeById(req, res) {
        const { id } = req.params
        const attribute = await ItemAttribute.findOne(
            { where: { id } }
        )
        await attribute.destroy();
        return res.json('deleted');
    }
    // async updateAttributeById(req, res) {
    //     const { id } = req.params;
    //     const { name, kategoryId, mainKategoryId } = req.body
    //     try {
    //         const [updatedRowsCount, updatedRows] = await ItemAttribute.update(
    //             {
    //                 name: name,
    //                 podKategoryId: mainKategoryId,
    //                 kategoryId: kategoryId,
    //             },
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
}

module.exports = new itemAttributeController();