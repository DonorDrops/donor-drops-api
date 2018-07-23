const express = require('express');
const router = express.Router();
const classify = require('../middleware/classify');
const AccountsController =  require('../controllers/accounts');


router.get('/', AccountsController.get);
router.get('/:id', AccountsController.getOne);
router.post('/', AccountsController.register);
router.patch('/:id', AccountsController.update);
router.patch('/disable/:id', AccountsController.disable);
router.delete('/:id', AccountsController.remove);
router.post('/login', AccountsController.login);

module.exports = router;
