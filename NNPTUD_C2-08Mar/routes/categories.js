// routes/categories.js
const Category = require('../models/categories');

// Lấy danh sách danh mục không bị xóa
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
