const prisma = require('../../config/prisma')

class CategoryController {
    async index(req, res) {
        try {
            const categories = await prisma.category.findMany();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        const { name } = req.body;
        try {
            const newCategory = await prisma.category.create({
                data: { name },
            });
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedCategory = await prisma.category.update({
                where: { id: parseInt(id) },
                data: { name },
            });
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        try {
            await prisma.category.delete({ where: { id: parseInt(id) } });
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const object = new CategoryController();
module.exports = object;