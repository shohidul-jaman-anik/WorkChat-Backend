const AdminWebInfo = require("./adminWebInfo.model");
const bcrypt = require('bcrypt');

module.exports.addAdminWebInfoServices = async data => {
    const { companyName, webLink, username, email, password, description } = data;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 8);

        const result = await AdminWebInfo.create({
            companyName: companyName || '',
            webLink: webLink || '',
            username: username || '',
            email,
            password: hashedPassword,
            description: description || '',
        });
        return result;
    }
};

module.exports.getAdminWebInfoServices = async () => {

    const result = await AdminWebInfo.find({})

    return result;
};

module.exports.getAdminWebInfoByIdServices = async (id) => {
    const result = await AdminWebInfo.findOne({ _id: id });

    return result;
};

module.exports.deleteAdminWebInfoServices = async (id) => {
    const result = await AdminWebInfo.deleteOne({ _id: id });
    console.log(result, 'resutlttt')
    return result;
};

module.exports.updateAdminWebInfoService = async (id, data) => {
    const result = await AdminWebInfo.updateOne(
        { _id: id },
        { $set: data },
        { runValidators: true },
    );

    return result;
};