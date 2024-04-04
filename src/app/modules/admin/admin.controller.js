const pick = require('../../middlewares/other/pick');

const { paginationFields } = require('./admin.constant');
const {
  getAdminServices,
  deleteUserService,
  updateUserRoleService,
  getAllUsersService,
  makeLandlordService,
} = require('./admin.service');


const makeLandlord = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };

    const result = makeLandlordService(filter);
    res.status(200).json({
      status: 'Success',
      message: 'Create seller successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: "Couldn't make seller successfully",
      error: error.message,
    });
    console.log(error, 'error');
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: "Could't delete the Landlord",
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Landlord Delete Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: "Landlord couldn't Delete Successfully",
      error: error.message,
    });
    console.log(error, 'error');
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filters = pick(req.query, [
      'searchTerm',
      'email',
      'firstName',
      'lastName',
    ]);

    const paginationOptions = pick(req.query, paginationFields);

    const users = await getAllUsersService(filters, paginationOptions);
    res.status(200).json({
      status: 'Success',
      message: 'Users find Successfully',
      meta: users.meta,
      data: users.data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: "Users couldn't found Successfully",
      error: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id, 'userRole iddddddddddd');
    const userRole = req.body.role;
    // console.log(userRole, 'user userRole');

    const result = await updateUserRoleService(id, userRole);
    res.status(200).json({
      status: 'Success',
      message: 'Update Role successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: "Couldn't update Role",
      error: error.message,
    });
    console.log(error, 'error');
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(email, 'admin email');
    const admin = await getAdminServices(id);
    res.status(200).json({
      status: 'Success',
      message: 'Admin get Successfully',
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: "Admin couldn't found Successfully",
      error: error.message,
    });
  }
};

module.exports.adminController = {
  deleteUser,
  getAllUsers,
  makeLandlord,
  updateUserRole,
  getAdmin,
};

