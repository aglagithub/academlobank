const Transfer = require('../models/transfer.model');
const catchAsync = require('../utils/catchAsync');

//? Find All Transfers
exports.findAllTransfers = catchAsync(async (req, res, next) => {
  /*  const transfers = await Transfer.findAll({
         where: {
             status: 'active',
         },
     }); */

  res.status(200).json({
    status: 'success',
    transfers,
  });
});

//? Find One Transfer
exports.findOneTransfer = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  // const { transfer } = req;

  res.status(200).json({
    status: 'success',
    message: `Transfer with ${id} found`,
    transfer,
  });
});

//? Create Transfer
exports.createTransfer = catchAsync(async (req, res, next) => {
    const { amount, senderUserId, accountNumber} = req.body;
    console.log({ amount, senderUserId, accountNumber})

  //const transfer = await Transfer.create({ name, email, password, role })
 

  return res.status(200).json({
    status: 'success',
  });
});

//? Update Transfer
exports.updateTransfer = catchAsync(async (req, res, next) => {
  /*     const { transfer } = req;
        const { id } = req.params;
        const { ??, ?? } = req.body;
    
        await transfer.update({ name, description }); */

  return res.status(200).json({
    status: 'success',
    transfer,
  });
});

//? Delete Transfer
exports.deleteTransfer = catchAsync(async (req, res, next) => {
  /*    const { id } = req.params;
   
       const { transfer } = req;
   
       await transfer.update({ status: 'inactive' }); */

  return res.status(200).json({
    status: 'success',
    message: `Transfer with id=${id} deleted successfully`,
  });
});
