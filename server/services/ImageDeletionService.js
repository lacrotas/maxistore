const fs = require('fs');
const path = require('path');
const { Kategory, MainKategory, ItemImage, Item, PodKategory } = require('../models/models'); // импорт моделей

class ImageDeletionService {
    constructor() {
        this.addBeforeDestroyHooks();
        this.addAfterDestroyHooks();
    }

    static deleteImageFile(imagePath) {
        if (imagePath) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image file: ${err.message}`);
                } else {
                    console.log(`Image file deleted: ${imagePath}`);
                }
            });
        }
    }

    // before destroy hooks
    addBeforeDestroyHooks() {
        this.addBeforeDestroyHookForModel(MainKategory, Kategory, 'image', 'mainKategoryId');
        this.addBeforeDestroyHookForModel(Kategory, PodKategory, null, 'kategoryId');
        this.addBeforeDestroyHookForModel(MainKategory, Item, 'image', 'mainKategoryId');
        this.addBeforeDestroyHookForModel(Kategory, Item, 'image', 'kategoryId');
        this.addBeforeDestroyHookForModel(PodKategory, Item, 'image', 'podKategoryId');
        this.addBeforeDestroyHookForModel(Item, ItemImage, 'image', 'itemId');  // Для удаления ItemImage по itemId
    }

    addBeforeDestroyHookForModel(parentModel, childModel, imageField, foreignKey) {
        parentModel.beforeDestroy(async (instance) => {
            // Найдем все связанные дочерние элементы
            const childInstances = await childModel.findAll({ where: { [foreignKey]: instance.id } });

            // Удалим все изображения дочерних элементов
            for (const childInstance of childInstances) {
                const imagePath = childInstance[imageField];
                if (imagePath) {
                    const fullImagePath = path.resolve(__dirname, '..', 'static', imagePath);
                    ImageDeletionService.deleteImageFile(fullImagePath);
                }
                // Удаляем сам дочерний элемент (ItemImage)
                await childInstance.destroy();
            }
        });
    }

    // after destroy hooks
    addAfterDestroyHooks() {
        this.addAfterDestroyHookForModel(Kategory, 'image');
        this.addAfterDestroyHookForModel(MainKategory, 'image');
        this.addAfterDestroyHookForModel(ItemImage, 'image');
        this.addAfterDestroyHookForModel(Item, 'image');
    }

    addAfterDestroyHookForModel(model, imageField) {
        model.afterDestroy(async (instance) => {
            const imagePath = instance[imageField];
            if (imagePath) {
                const fullImagePath = path.resolve(__dirname, '..', 'static', imagePath);
                ImageDeletionService.deleteImageFile(fullImagePath);
            }
        });
    }
}

module.exports = ImageDeletionService;