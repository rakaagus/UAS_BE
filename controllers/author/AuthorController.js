const prisma = require('../../config/prisma')

class AuthorController{
    async index(req, res) {
        try {
            const authors = await prisma.author.findMany();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const author = await prisma.author.findUnique({ where: { id: parseInt(id) } });
            if (!author) {
                return res.status(404).json({ message: 'author not found' });
            }
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        const { name } = req.body;
        try {
            const newAuthor = await prisma.author.create({
                data: { name },
            });
            res.status(201).json(newAuthor);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
            res.status(200).json(updatedAuthor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        try {
            await prisma.author.delete({ where: { id: parseInt(id) } });
            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const object = new AuthorController();
module.exports = object;