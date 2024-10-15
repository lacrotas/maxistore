const { Attribute } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class attributeController {
    async addAttribute(req, res, next) {
        try {
            const { name, kategoryId, mainKategoryId, podKategoryId } = req.body
            const attribute = await Attribute.create({ name: name, podKategoryId: mainKategoryId, kategoryId: kategoryId, podKategoryId: podKategoryId || null })
            return res.json(attribute);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAllAttributeByKategoryId(req, res) {
        const { kategoryId } = req.params
        const attribute = await Attribute.findAll(
            { where: { kategoryId, podKategoryId: null } }
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
}

module.exports = new attributeController();