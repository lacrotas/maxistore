const { Review } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');

class reviewController {
    async addReview(req, res, next) {
        try {
            const { itemId, mark, Reviewdate, label, description, isShowed } = req.body;
            const kategory = await Review.create({
                itemId: itemId, mark: mark, Reviewdate: Reviewdate, label: label, description: description, isShowed: isShowed
            })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllReview(req, res) {
        const kategory = await Review.findAll();
        return res.json(kategory);
    }
    async getAllReviewByItemId(req, res) {
        const { itemId } = req.params
        const kategory = await Review.findAll(
            { where: { itemId } }
        );
        return res.json(kategory);
    }
    async getAllReviewByItemIdAndIsShowed(req, res) {
        const { itemId } = req.params;
        const kategory = await Review.findAll(
            { where: { itemId, isShowed: true } }
        );
        return res.json(kategory);
    }
    async deleteReviewById(req, res) {
        const { id } = req.params
        const mainKategory = await Review.findOne(
            { where: { id } }
        )
        await mainKategory.destroy();
        return res.json('deleted');
    }
    async deleteReviewByItemId(req, res) {
        const { itemId } = req.params
        const mainKategory = await Review.findOne(
            { where: { itemId } }
        )
        await mainKategory.destroy();
        return res.json('deleted');
    }
    async updatePodKategoryById(req, res) {
        const { id } = req.params;
        const { itemId, mark, Reviewdate, label, description, isShowed } = req.body;
        try {
            const [updatedRowsCount, updatedRows] = await Review.update(
                {
                    itemId: itemId,
                    mark: mark,
                    Reviewdate: Reviewdate,
                    label: label,
                    description: description,
                    isShowed: isShowed
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

module.exports = new reviewController();