const mongoose = require('mongoose');
const Role = require('../models/roles');
const User = require('../models/users');

async function taoNguoiDungVaVaiTro() {
    try {
        // Kết nối đến MongoDB database BTI
        await mongoose.connect('mongodb://localhost:27017/BTI');
        console.log('Đã kết nối đến MongoDB thành công');
        
        // Tạo các vai trò nếu chưa tồn tại
        const danhSachVaiTro = [
            { roleName: 'admin', description: 'Quản trị viên hệ thống' },
            { roleName: 'mod', description: 'Người kiểm duyệt' },
            { roleName: 'user', description: 'Người dùng thông thường' }
        ];

        for (const vaiTro of danhSachVaiTro) {
            await Role.findOneAndUpdate(
                { roleName: vaiTro.roleName },
                vaiTro,
                { upsert: true, new: true }
            );
        }
        
        console.log('Đã tạo các vai trò thành công');

        // Tạo người dùng
        const danhSachNguoiDung = [
            {
                username: 'admin_user',
                password: 'Admin@123',
                email: 'admin@example.com',
                fullName: 'Nguyễn Văn Admin',
                avatarUrl: 'https://example.com/admin.jpg',
                role: 'admin'
            },
            {
                username: 'mod_user',
                password: 'Mod@123',
                email: 'mod@example.com',
                fullName: 'Trần Thị Mod',
                avatarUrl: 'https://example.com/mod.jpg',
                role: 'mod'
            },
            {
                username: 'regular_user',
                password: 'User@123',
                email: 'user@example.com',
                fullName: 'Lê Văn User',
                avatarUrl: 'https://example.com/user.jpg',
                role: 'user'
            }
        ];

        for (const thongTinNguoiDung of danhSachNguoiDung) {
            const vaiTro = await Role.findOne({ roleName: thongTinNguoiDung.role });
            if (!vaiTro) {
                throw new Error(`Không tìm thấy vai trò ${thongTinNguoiDung.role}`);
            }

            const nguoiDungTonTai = await User.findOne({ username: thongTinNguoiDung.username });
            if (!nguoiDungTonTai) {
                const nguoiDung = new User({
                    ...thongTinNguoiDung,
                    role: vaiTro._id
                });
                await nguoiDung.save();
                console.log(`Đã tạo người dùng: ${thongTinNguoiDung.username}`);
            } else {
                console.log(`Người dùng ${thongTinNguoiDung.username} đã tồn tại`);
            }
        }

        console.log('Đã tạo người dùng thành công');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi:', error);
        process.exit(1);
    }
}

taoNguoiDungVaVaiTro();