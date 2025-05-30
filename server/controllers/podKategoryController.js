const { PodKategory } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class podKategoryController {
    async addPodKategory(req, res, next) {
        try {
            const { name, kategoryId } = req.body
            const kategory = await PodKategory.create({ name: name, kategoryId: kategoryId })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllPodKategory(req, res) {
        const kategory = await PodKategory.findAll();
        return res.json(kategory);
    }
    async getAllPodKategoryByKategoryId(req, res) {
        const { kategoryId } = req.params
        const kategory = await PodKategory.findAll(
            { where: { kategoryId } }
        );
        return res.json(kategory);
    }
    async deletePodKategoryById(req, res) {
        const { id } = req.params
        const mainKategory = await PodKategory.findOne(
            { where: { id } }
        )
        await mainKategory.destroy();
        return res.json('deleted');
    }
    async getPodKategoryById(req, res) {
        const { id } = req.params
        const mainKategory = await PodKategory.findOne(
            { where: { id } }
        )
        return res.json(mainKategory);
    }
    async updatePodKategoryById(req, res) {
        const { id } = req.params;
        const { name, kategoryId } = req.body;
        try {
            const [updatedRowsCount, updatedRows] = await PodKategory.update(
                {
                    name: name,
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

module.exports = new podKategoryController();