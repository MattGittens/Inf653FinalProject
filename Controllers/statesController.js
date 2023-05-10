
const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) {this.states = data}

}
const data2 = require('../models/statesData.json');
//Get request
//Gets all states
const getAllStates = (req, res) => {
    let states = data.states;
    if (req.query.contig === 'true'){
    states = states.filter(state => state.code !== 'AK' && state.code !== 'HI');
    }
    else if (req.query.contig === 'false'){
        states = states.filter(state => state.code === 'AK' || state.code === 'HI');
    }
    
    res.json(states);
}

//Get specific state and capital
const getStateCapital = async (req, res) =>{
    if(!req?.params?.state) return res.status(400).json({ message: 'Employee ID required.' });
   
    const state = await data2.findOne({code: req.params.state}).exec();
    res.json(state);
   };
   
   

//Exports
module.exports = {
    getAllStates,
    getStateCapital
   // checkIfContig,
   // getAllContigStates,

}