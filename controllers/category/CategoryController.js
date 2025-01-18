const prisma = require('../../config/prisma')

class CategoryController {
    async index(req, res) {
        try {
            const categories = await prisma.category.findMany();
            res.status(200).json({
                message: "Get All Resource",
                error: false,
                data: categories,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found', 
                    error: true
                });
            }
            res.status(200).json({
                message: "Get Detail Resource",
                error: false,
                data: category
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async store(req, res) {
        const { name } = req.body;
        try {
            const newCategory = await prisma.category.create({
                data: { name },
            });
            res.status(201).json({
                message: "Reource is Added successfully",
                error: false,
                data: newCategory,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
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
            res.status(200).json({
                message: "Reource is Update successfully",
                error: false,
                data: updatedCategory,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        try {
            await prisma.category.delete({ where: { id: parseInt(id) } });
            res.status(200).json({
                message: 'Category deleted successfully',
                error: false
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const object = new CategoryController();
module.exports = object;