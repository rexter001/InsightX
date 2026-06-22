import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Analytics from '../models/Analytics.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await User.deleteMany();
        await Analytics.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = await User.create({
            name: 'Executive Admin',
            email: 'admin@insightx.com',
            password: hashedPassword,
            role: 'Admin'
        });

        console.log('Admin user initialized.');

        const initialRecords = [
            { title: 'Q1 Ads Optimization', category: 'Marketing', revenue: 45000, sales: 1200, users: 4500, growth: 12.5, date: new Date('2025-01-15') },
            { title: 'Corporate Bond Portfolio', category: 'Finance', revenue: 120000, sales: 850, users: 1100, growth: 8.2, date: new Date('2025-02-10') },
            { title: 'SaaS Platform Redesign', category: 'SaaS', revenue: 95000, sales: 3200, users: 12500, growth: 22.4, date: new Date('2025-03-01') },
            { title: 'Summer Sale Extravaganza', category: 'E-Commerce', revenue: 180000, sales: 6500, users: 24000, growth: 45.1, date: new Date('2025-04-18') },
            { title: 'Professional Dev Bootcamp', category: 'Education', revenue: 35000, sales: 420, users: 1800, growth: -3.5, date: new Date('2025-05-12') },
            { title: 'Telehealth System Expansion', category: 'Healthcare', revenue: 150000, sales: 1900, users: 6500, growth: 18.7, date: new Date('2025-06-25') },
            { title: 'Paid Search Campaigns', category: 'Marketing', revenue: 52000, sales: 1400, users: 5100, growth: 14.2, date: new Date('2025-07-05') },
            { title: 'Venture Seed Allocation', category: 'Finance', revenue: 110000, sales: 780, users: 950, growth: 5.6, date: new Date('2025-08-14') },
            { title: 'Enterprise Licenses Expansion', category: 'SaaS', revenue: 105000, sales: 3500, users: 14000, growth: 25.8, date: new Date('2025-09-20') },
            { title: 'Automotive Clearance Event', category: 'E-Commerce', revenue: 210000, sales: 7200, users: 29000, growth: 38.3, date: new Date('2025-10-05') },
            { title: 'K-12 Platform Integration', category: 'Education', revenue: 42000, sales: 550, users: 2200, growth: 15.0, date: new Date('2025-11-11') },
            { title: 'AI Diagnostics Pipeline', category: 'Healthcare', revenue: 165000, sales: 2100, users: 7800, growth: 24.1, date: new Date('2025-12-01') },
            { title: 'Holiday Display Marketing', category: 'Marketing', revenue: 60000, sales: 1600, users: 5800, growth: 11.1, date: new Date('2026-01-08') },
            { title: 'Asset Rebalancing Strategy', category: 'Finance', revenue: 125000, sales: 900, users: 1200, growth: 4.2, date: new Date('2026-01-22') },
            { title: 'AI Integration Rollout', category: 'SaaS', revenue: 130000, sales: 4100, users: 18500, growth: 31.2, date: new Date('2026-02-15') },
            { title: 'Valentine Retail Rush', category: 'E-Commerce', revenue: 195000, sales: 6900, users: 26000, growth: 35.9, date: new Date('2026-02-28') },
            { title: 'Executive Coaching Modules', category: 'Education', revenue: 48000, sales: 620, users: 2500, growth: 8.5, date: new Date('2026-03-10') },
            { title: 'EMR Upgrade Licensing', category: 'Healthcare', revenue: 175000, sales: 2300, users: 8900, growth: 20.3, date: new Date('2026-03-24') },
            { title: 'Influencer Referral Engine', category: 'Marketing', revenue: 68000, sales: 1850, users: 6700, growth: 15.4, date: new Date('2026-04-05') },
            { title: 'Asset Management Fees', category: 'Finance', revenue: 140000, sales: 950, users: 1350, growth: 6.8, date: new Date('2026-04-20') },
            { title: 'SaaS Mobile App Release', category: 'SaaS', revenue: 142000, sales: 4600, users: 21000, growth: 28.5, date: new Date('2026-05-02') }
        ];

        const mappedRecords = initialRecords.map(item => ({
            ...item,
            createdBy: adminUser._id
        }));

        await Analytics.insertMany(mappedRecords);
        console.log('Successfully seeded database with 20+ analytics metrics.');

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Failure seeding database: ', error.message);
        mongoose.disconnect();
        process.exit(1);
    }
};

seedData();