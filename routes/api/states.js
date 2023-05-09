const express = require('express');
const router = express.Router();
const statesController = require('../../Controllers/statesController');
 
router.get('/states',statesController.getAllStates);
router.get('/states/:state/capital', statesController.getStateCapital);
module.exports = router;