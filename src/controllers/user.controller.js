const randomAccountNumber = require('../utils/accountNumberGenerator');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

//? Find All Users
exports.findAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        /*  where: {
                     status: 'active',
                 }, */
    });

    res.status(200).json({
        status: 'success',
        users,
    });
});

//? Find One User
exports.findOneUser = catchAsync(async (req, res, next) => {
    // const { id } = req.params;
    // const { user } = req;

    res.status(200).json({
        status: 'success',
        message: `User with ${id} found`,
        user,
    });
});

//? User Sign up  (od)
exports.SignUpUser = catchAsync(async (req, res, next) => {
    const { name, password } = req.body;

    const accountNumber = randomAccountNumber(8);
    const amount = 1000;
    const status = true;
    //console.log('sign up parameters: ', {name, accountNumber, password, amount, status})
    const user = await User.create({
        name,
        accountNumber,
        password,
        amount,
        status,
    });

    return res.status(200).json({
        status: 'success. Account Created.',
        user,
    });
});
//? User log in
exports.logInUser = catchAsync(async (req, res, next) => {
    const { accountNumber, password } = req.body;
    //console.log('log in Data:', { accountNumber, password });
    const data = { accountNumber, password };

    const account = await User.findOne({
        where: {
            accountNumber,
        },
    });

    if (!account) {
        return res.status(404).json({
            status: 'error',
            message: `Cannot access account`,
        });
    }
    if (!account.accountNumber) {
        return res.status(404).json({
            status: 'error',
            message: `Account does not exist`,
        });
    }
    if (account.password !== password) {
        return res.status(404).json({
            status: 'error',
            message: `Wrong Password`,
        });
    }

    if (!account.status) {
        return res.status(403).json({
            status: 'error',
            message: `Account not enabled`,
        });
    }
    //console.log("Account Number in DB:", account.accountNumber)
    //console.log("Password in DB:", account.password)
    //console.log('Status in DB:', account.status);

    return res.status(200).json({
        status: 'Success. User Logged in',
        accountNumber,
    });
});

//? Update User
exports.updateUser = catchAsync(async (req, res, next) => {
    /*     const { user } = req;
            const { id } = req.params;
            const { name, description } = req.body;
        
            await user.update({ name, description }); */

    return res.status(200).json({
        status: 'success',
        user,
    });
});

//? Delete User
exports.deleteUser = catchAsync(async (req, res, next) => {
    /*    const { id } = req.params;
       
           const { user } = req;
       
           await user.update({ status: 'inactive' }); */

    return res.status(200).json({
        status: 'success',
        message: `User with id=${id} deleted successfully`,
    });
});
