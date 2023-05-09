const States = require('../models/States');
const stateCode =  require ('../models/States');

module.exports = async function getState(req, res, next) {
    let state;
    try{
    state = await States.findById(req.body.state_id);
    if(!state){
        return res.status(404).json({message: 'Cannot find state code'});
    }
}catch (err){
    return res.status(500).json({error: err.message});
}
res.state_id = req.body.state_id;
next();
}