const States = require('../models/States');


module.exports = async function getState(req, res, next) {
    let state;
    try{
    state = await States.findOne({code: req.param.state});
    if(!state){
        return res.status(404).json({message: 'Cannot find state code'});
    }
}catch (err){
    return res.status(500).json({error: err.message});
}
res.state = req.body.state;
next();
}