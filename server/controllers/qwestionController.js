const { Qwestion } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class qwestionController {
    async addQwestion(req, res, next) {
        try {
            const { qwestion, description } = req.body
            const kategory = await Qwestion.create({
                qwestion:qwestion, description:  description
            })
            return res.json(kategory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllQwestion(req, res) {
        const kategory = await Qwestion.findAll();
        return res.json(kategory);
    }

    async deleteItemById(req, res) {
        const { id } = req.params
        const mainKategory = await Qwestion.findOne(
            { where: { id } }
        )
        await mainKategory.destroy();
        return res.json('deleted');
    }
}

module.exports = new qwestionController();