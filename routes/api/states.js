const express = require('express');
const router = express.Router();
const statesController = require('../../Controllers/statesController');
 
router.get('/states',statesController.getAllStates);
router.get('/states/:state/capital', statesController.getStateCapital);

router.get('/states/:state/nickname', statesController.getStateNickname);

router.get('/states/:state/population', statesController.getStatePopulation);

router.get('/states/:state/admission', statesController.getStateAdmission);

router.post('/states/:state/funfact', statesController.addFunFacts);

router.patch('/states/:state/funfact', statesController.updateFunFact);

router.delete('/states/:state/funfact', statesController.deleteFunFact)

module.exports = router;