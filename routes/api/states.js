const express = require('express');
const router = express.Router();
const statesController = require('../../Controllers/statesController');
 
router.get('/states',statesController.getAllStates);
router.get('/states/:state/capital', statesController.getStateCapital);
module.exports = router;
router.get('/states/:state/nickname', statesController.getStateNickname);
module.exports = router;
router.get('/states/:state/population', statesController.getStatePopulation);
module.exports = router;
router.get('/states/:state/admission', statesController.getStateAdmission);
module.exports = router;
