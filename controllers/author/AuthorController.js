const prisma = require('../../config/prisma')

class AuthorController{
    async index(req, res) {
        try {
            const authors = await prisma.author.findMany();
            res.status(200).json({
                message: "Get All Resource",
                error: false,
                data: authors,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const author = await prisma.author.findUnique({ where: { id: parseInt(id) } });
            if (!author) {
                return res.status(404).json({ 
                    message: 'author not found',
                    error: false,
                });
            }
            res.status(200).json({
                message: "Get Detail Resource",
                error: false,
                data: author
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async store(req, res) {
        const { name } = req.body;
        try {
            const newAuthor = await prisma.author.create({
                data: { name },
            });
            res.status(201).json({
                message: "Reource is Added successfully",
                error: false,
                data: newAuthor,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedAuthor = await prisma.author.update({
                where: { id: parseInt(id) },
                data: { name },
            });
            res.status(200).json({
                message: "Reource is Update successfully",
                error: false,
                data: updatedAuthor,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        try {
            await prisma.author.delete({ where: { id: parseInt(id) } });
            res.status(200).json({
                message: 'author deleted successfully',
                error: false
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

const object = new AuthorController();
module.exports = object;