const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
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
  const { amount, senderUserId, accountNumber } = req.body;
  //console.log({ amount, senderUserId, accountNumber });

  //Datos sender
  const SenderInfo = await User.findOne({
    where: {
      accountNumber: senderUserId,
    },
  });

  if (!SenderInfo) {
    return res.status(404).json({
      status: 'error',
      message: `Cannot access sender account`,
    });
  }
  if (!SenderInfo.status) {
    return res.status(403).json({
      status: 'error',
      message: `Sender Account not enabled`,
    });
  }

  //console.log('Sender name: ', SenderInfo.name);
  //console.log('Sender account Number: ', SenderInfo.accountNumber);
  //console.log('Sender accout balance : ', SenderInfo.amount);
  //console.log('Sender status: ', SenderInfo.status);

  //datos Receiver
  const ReceiverInfo = await User.findOne({
    where: {
      accountNumber: accountNumber,
    },
  });

  if (!ReceiverInfo) {
    return res.status(404).json({
      status: 'error',
      message: `Cannot access Receiver account`,
    });
  }

  if (!ReceiverInfo.status) {
    return res.status(403).json({
      status: 'error',
      message: `Receiver Account not enabled`,
    });
  }

  //console.log('Receiver name: ', ReceiverInfo.name);
  //console.log('Receiver account Number: ', ReceiverInfo.accountNumber);
  //console.log('Receiver accout balance : ', ReceiverInfo.amount);
  //console.log('Receiver status: ', ReceiverInfo.status);

  //Verificación de saldo

  if (SenderInfo.amount < amount) {
    return res.status(404).json({
      status: 'error',
      message: `Not enough money to make transaction`,
    });
  }

  // update Balances
  const senderBalance = SenderInfo.amount - amount;
  const ReceiverBalance = ReceiverInfo.amount + amount;

  await SenderInfo.update({ amount: senderBalance });
  await ReceiverInfo.update({ amount: ReceiverBalance });

  //save transaction

  const transfer = await Transfer.create({
    amount: amount,
    senderUserId: senderUserId,
    receiverUserId: accountNumber,
  });
  return res.status(200).json({
    status: 'success',
    transfer,
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
