const { Attribute } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class attributeController {
    async addAttribute(req, res, next) {
        try {
            const { name, kategoryId, mainKategoryId } = req.body
            const attribute = await Attribute.create({ name: name, podKategoryId: mainKategoryId, kategoryId: kategoryId })
            return res.json(attribute);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllAttributeByKategoryId(req, res) {
        const { kategoryId } = req.params
        const attribute = await Attribute.findAll(
            { where: { kategoryId } }
        );
        return res.json(attribute);
    }
    async getAttributeById(req, res) {
        const { id } = req.params
        const attribute = await Attribute.findOne(
            { where: { id } }
        );
        return res.json(attribute);
    }
    async getAllAttributeByPodKategoryId(req, res) {
        const { podKategoryId } = req.params
        const attribute = await Attribute.findAll(
            { where: { podKategoryId } }
        );
        return res.json(attribute);
    }
    async deleteAttributeById(req, res) {
        const { id } = req.params
        const attribute = await Attribute.findOne(
            { where: { id } }
        )
        await attribute.destroy();
        return res.json('deleted');
    }
    async updateAttributeById(req, res) {
        const { id } = req.params;
        const { name, kategoryId, mainKategoryId } = req.body
        try {
            const [updatedRowsCount, updatedRows] = await Attribute.update(
                {
                    name: name,
                    podKategoryId: mainKategoryId,
                    kategoryId: kategoryId,
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