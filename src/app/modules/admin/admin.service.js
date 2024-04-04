const paginationHelpers = require('../../helpers/paginationHelpers');
const UserModel = require('../auth/auth.model');

// ===========================================
//                  All Users
//============================================

module.exports.getAllUsersService = async (filters, paginationOptions) => {
  const { searchTerm } = filters;

  const productsSearchAbleFields = ['email', 'firstName', 'lastName'];
  const andConditions = [];

  // Add a default condition if andConditions is empty
  if (andConditions.length === 0) {
    andConditions.push({});
  }

  if (searchTerm) {
    andConditions.push({
      $or: productsSearchAbleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const users = await UserModel.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select('-password -contract -wishlist -task');;

  const total = await UserModel.estimatedDocumentCount();
  const totalSeller = await UserModel.countDocuments({
    $and: [{ seller: true }, { role: 'seller' }],
  });
  const totalBuyer = await UserModel.countDocuments({ role: 'buyer' });
  const unverifyUsers = await UserModel.countDocuments({
    role: 'unauthorized',
  });
  return {
    meta: {
      page,
      limit,
      total,
      totalSeller,
      totalBuyer,
      unverifyUsers,
    },
    data: users,
  };
};

module.exports.updateUserRoleService = async (id, userRole) => {
  const filter = { _id: id };
  const updateDoc = {
    $set: { role: userRole },
  };
  const result = await UserModel.updateOne(filter, updateDoc, {
    runValidators: true,
  });
  return result;
};


module.exports.getSellerServiceById = async id => {
  const result = await UserModel.findOne({ _id: id });
  console.log(result);
  return result;
};

module.exports.makeLandlordService = async userId => {
  const filter = { _id: userId };
  const updateDoc = {
    $set: { role: 'seller', seller: true },
  };
  const result = await UserModel.updateOne(filter, updateDoc, {
    runValidators: true,
  });
  return result;
};

exports.deleteUserService = async id => {
  const result = await UserModel.deleteOne({ _id: id });
  return result;
};

//====================  Admin ========================

module.exports.getAdminServices = async id => {
  // const admin = await UserModel.find({ email: email })
  // const isAdmin = admin.role === "admin"
  // return isAdmin;
  const filter = { $and: [{ _id: id }, { role: 'admin' }] }
  const admin = await UserModel.findOne(filter).select('-password -contract -wishlist -task');
  return admin
};
