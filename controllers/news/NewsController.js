const prisma = require('../../config/prisma')

class NewsController {
    async index(req, res) {
        try {
            const news = await prisma.news.findMany({
                include: { author: true, category: true }, // Relasi dengan tabel lain
            });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async store(req, res){
        try {
            const { title, description, content, url, url_image, published_at, authorId, categoryId } = req.body;
            const newNews = await prisma.news.create({
                data: {
                    title,
                    description,
                    content,
                    url,
                    url_image,
                    published_at: new Date(published_at),
                    authorId,
                    categoryId,
                },
            });
            res.status(201).json(newNews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, content, url, url_image, published_at, authorId, categoryId } = req.body;
            const updatedNews = await prisma.news.update({
                where: { id: parseInt(id) },
                data: {
                    title,
                    description,
                    content,
                    url,
                    url_image,
                    published_at: new Date(published_at),
                    authorId,
                    categoryId,
                },
            });
            res.status(200).json(updatedNews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async destroy(req, res){
        try {
            const { id } = req.params;
            await prisma.news.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: 'News deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res){
        try {
            const { id } = req.params;
            const news = await prisma.news.findUnique({
                where: { id: parseInt(id) },
                include: { author: true, category: true },
            });
            if (!news) return res.status(404).json({ message: 'News not found' });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchNewsByTitle(req, res){
        try {
            const { title } = req.params;
            const news = await prisma.news.findMany({
                where: { title: { contains: title, mode: 'insensitive' } },
                include: { author: true, category: true },
            });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSportNews (req, res){
        try {
            const news = await prisma.news.findMany({
                where: { category: { name: 'sport' } }, // Asumsi nama kategori adalah 'sport'
                include: { author: true, category: true },
            });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFinanceNews(req, res){
        try {
            const news = await prisma.news.findMany({
                where: { category: { name: 'finance' } }, // Asumsi nama kategori adalah 'sport'
                include: { author: true, category: true },
            });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAutomotiveNews(req, res){
        try {
            const news = await prisma.news.findMany({
                where: { category: { name: 'automotive' } }, // Asumsi nama kategori adalah 'automotive'
                include: { author: true, category: true },
            });
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const object = new NewsController();
module.exports = object;