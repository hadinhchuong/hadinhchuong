// models/categories.js
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    } // Thêm trường isDeleted
}, {
    timestamps: true
});

module.exports = mongoose.model('category', categorySchema);