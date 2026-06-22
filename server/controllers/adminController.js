import User from '../models/User.js';
import Analytics from '../models/Analytics.js';

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalRecords = await Analytics.countDocuments();

        const categoryAgg = await Analytics.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 }, totalRevenue: { $sum: '$revenue' } } }
        ]);

        const aggregateStats = await Analytics.aggregate([
            {
                $group: {
                    _id: null,
                    avgGrowth: { $avg: '$growth' },
                    totalSales: { $sum: '$sales' },
                    totalRevenue: { $sum: '$revenue' }
                }
            }
        ]);

        const stats = aggregateStats[0] || { avgGrowth: 0, totalSales: 0, totalRevenue: 0 };

        res.status(200).json({
            totalUsers,
            totalRecords,
            averageGrowth: stats.avgGrowth,
            totalSales: stats.totalSales,
            totalRevenue: stats.totalRevenue,
            categories: categoryAgg
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating global statistics', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users list', error: error.message });
    }
};