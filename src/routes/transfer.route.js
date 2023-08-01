const express = require('express');

const transferController = require('../controllers/transfer.controller');


const router = express.Router();

router.get('/', transferController.findAllTransfers);
router.post('/', transferController.createTransfer);


router.route('/:id')
    .get(transferController.findOneTransfer)
    .patch(transferController.updateTransfer)
    .delete(transferController.deleteTransfer);

module.exports = router;