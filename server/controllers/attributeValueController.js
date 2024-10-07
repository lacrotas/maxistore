const { Value } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class attributeController {
    async addAttributeValue(req, res, next) {
        try {
            const { name, attributeId } = req.body
            const attributeValue = await Value.create({ attributeId: attributeId, name: name })
            return res.json(attributeValue);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAttributeValueById(req, res) {
        const { id } = req.params;
        const attributeValue = await Value.findOne(
            { where: { id: id } }
        );
        return res.json(attributeValue);
    }
    async getAllAttributeValue(req, res) {
        const attributeValue = await Value.findAll();
        return res.json(attributeValue);
    }
    async getAllAttributeValueByAttributeId(req, res) {
        const { id } = req.params;
        const attributeValue = await Value.findAll(
            { where: { attributeId: id } }
        );
        return res.json(attributeValue);
    }
    async deleteAttributeValueById(req, res) {
        const { id } = req.params
        const attributeValue = await Value.findOne(
            { where: { id } }
        )
        await attributeValue.destroy();
        return res.json('deleted');
    }
    async updateAttributeValueById(req, res) {
        const { id } = req.params;
        const { value, attributeId } = req.body
        try {
            const [updatedRowsCount, updatedRows] = await Value.update(
                {
                    value: value,
                    attributeId: attributeId,
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

module.exports = new attributeController();