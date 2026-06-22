import Analytics from '../models/Analytics.js';

export const getAnalytics = async (req, res) => {
    try {
        const { search, category, startDate, endDate, sortBy, sortOrder } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sortOption['date'] = 1;
        }

        const data = await Analytics.find(query).sort(sortOption).populate('createdBy', 'name email');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving analytics records', error: error.message });
    }
};

export const getAnalyticsById = async (req, res) => {
    try {
        const record = await Analytics.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const createAnalytics = async (req, res) => {
    try {
        const { title, category, revenue, sales, users, growth, date } = req.body;
        const record = new Analytics({
            title,
            category,
            revenue,
            sales,
            users,
            growth,
            date,
            createdBy: req.user._id
        });
        const savedRecord = await record.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ message: 'Error creating record', error: error.message });
    }
};

export const updateAnalytics = async (req, res) => {
    try {
        const updatedRecord = await Analytics.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );
        if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: 'Error updating record', error: error.message });
    }
};

export const deleteAnalytics = async (req, res) => {
    try {
        const deletedRecord = await Analytics.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting record', error: error.message });
    }
};