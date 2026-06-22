import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        revenue: { type: Number, required: true },
        sales: { type: Number, required: true },
        users: { type: Number, required: true },
        growth: { type: Number, required: true },
        date: { type: Date, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Analytics', analyticsSchema);