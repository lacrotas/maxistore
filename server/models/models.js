const sequelize = require("../db");
const { DataTypes } = require("sequelize")

// unlinked data
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

const Qwestion = sequelize.define('qwestion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    qwestion: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})

// linked data
// kategoryes
const MainKategory = sequelize.define('mainKategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
})

const Kategory = sequelize.define('kategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainKategoryId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
})

const PodKategory = sequelize.define('podKategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kategoryId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, unique: true },
})

// attributes and values
const Attribute = sequelize.define('attribute', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kategoryId: { type: DataTypes.INTEGER, allowNull: true },
    podKategoryId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING },
})

const Value = sequelize.define('value', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attributeId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING }
})

// items
const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainKategoryId: { type: DataTypes.INTEGER, allowNull: true },
    kategoryId: { type: DataTypes.INTEGER, allowNull: true },
    podKategoryId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    isExist: { type: DataTypes.BOOLEAN },
    isShowed: { type: DataTypes.BOOLEAN },
    description: { type: DataTypes.STRING(2000) },
    rating: { type: DataTypes.STRING },
    reviewNumber: { type: DataTypes.STRING },
})

const ItemAttribute = sequelize.define('itemAttribute', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.INTEGER },
    attributeId: { type: DataTypes.INTEGER },
    valueId: { type: DataTypes.INTEGER },
})

const ItemImage = sequelize.define('itemImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING }
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.INTEGER },
    mark: { type: DataTypes.STRING },
    Reviewdate: { type: DataTypes.STRING },
    label: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(1000) },
    isShowed: { type: DataTypes.BOOLEAN },
})
// relation between kategoryes
MainKategory.hasMany(Kategory, {
    foreignKey: 'mainKategoryId',
    onDelete: 'CASCADE'
});
Kategory.hasMany(PodKategory, {
    foreignKey: 'kategoryId',
    onDelete: 'CASCADE'
});
// relation betweem attribute and kategory
Kategory.hasMany(Attribute, {
    foreignKey: 'kategoryId',
    onDelete: 'CASCADE'
});
PodKategory.hasMany(Attribute, {
    foreignKey: 'podKategoryId',
    onDelete: 'CASCADE'
});
Attribute.hasMany(Value, {
    foreignKey: 'attributeId',
    onDelete: 'CASCADE'
});

// relation between kategoryes and item
MainKategory.hasMany(Item, {
    foreignKey: 'mainKategoryId',
    onDelete: 'CASCADE'
});
Item.belongsTo(MainKategory, {
    foreignKey: 'mainKategoryId',
    onDelete: 'CASCADE'
});

Kategory.hasMany(Item, {
    foreignKey: 'kategoryId',
    onDelete: 'CASCADE'
});
Item.belongsTo(Kategory, {
    foreignKey: 'kategoryId',
    onDelete: 'CASCADE'
});

PodKategory.hasMany(Item, {
    foreignKey: 'podKategoryId',
    onDelete: 'CASCADE'
});
Item.belongsTo(PodKategory, {
    foreignKey: 'podKategoryId',
    onDelete: 'CASCADE'
});

// relation with item
Item.hasMany(ItemAttribute, { foreignKey: 'itemId', onDelete: 'CASCADE' });
ItemAttribute.belongsTo(Item, { foreignKey: 'itemId' });

Item.hasMany(ItemImage, { foreignKey: 'itemId', onDelete: 'CASCADE' });
ItemImage.belongsTo(Item, { foreignKey: 'itemId' });

Item.hasMany(Review, { foreignKey: 'itemId', onDelete: 'CASCADE' });
Review.belongsTo(Item, { foreignKey: 'itemId' });


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
