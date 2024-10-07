const sequelize = require("../db");
const { DataTypes } = require("sequelize")

const Slider = sequelize.define('slider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    label: { type: DataTypes.STRING, },
    description: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
})

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
})

const MainKategory = sequelize.define('mainKategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
})

const Kategory = sequelize.define('kategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainKategoryId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
})

const PodKategory = sequelize.define('podKategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kategoryId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
})

const Attribute = sequelize.define('attribute', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kategoryId: { type: DataTypes.STRING },
    podKategoryId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
})

const Value = sequelize.define('value', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attributeId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING }
})

const ItemImage = sequelize.define('itemImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING }
})

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainKategoryId: { type: DataTypes.STRING },
    kategoryId: { type: DataTypes.STRING },
    podKategoryId: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    isExist: { type: DataTypes.BOOLEAN },
    isShowed: { type: DataTypes.BOOLEAN },
    description: { type: DataTypes.STRING },
    rating: { type: DataTypes.STRING },
    reviewNumber: { type: DataTypes.STRING },
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.STRING },
    mark: { type: DataTypes.STRING },
    Reviewdate: { type: DataTypes.STRING },
    label: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    isShowed: { type: DataTypes.BOOLEAN },
})

const ItemAttribute = sequelize.define('itemAttribute', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.STRING },
    attributeId: { type: DataTypes.STRING },
    valueId: { type: DataTypes.STRING },
})

const Qwestion = sequelize.define('qwestion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    qwestion: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})

module.exports = {
    Slider,
    User,
    MainKategory,
    Kategory,
    PodKategory,
    Attribute,
    Value,
    Item,
    ItemAttribute,
    ItemImage,
    Qwestion,
    Review
}
