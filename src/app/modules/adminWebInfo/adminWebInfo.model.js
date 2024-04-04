const mongoose = require('mongoose');

const adminWebInfoSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    webLink: {
        type: String,
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
},
    {
        timestamps: true,
    },
);

const AdminWebInfo = mongoose.model('Admin-Web-Info', adminWebInfoSchema);

module.exports = AdminWebInfo;