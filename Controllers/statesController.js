
const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) {this.states = data}
}
//Get request
//Gets all states
const getAllStates = (req, res) => {
    let states = data.states
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
    try{
       const statecode = data.states;
       const state = await statecode.filter(s => s.code === req.params.state );
       if(!state) return res.status(404).json({message: 'State not found'});
       
       const stateCap = state.capital_city;
       const stateName = state.slug;
    res.json(stateName);
    res.json(stateCap);
      
   }catch(err){
       res.status(500).send(err.message);
   }
   
   };
   
   

//Exports
module.exports = {
    getAllStates,
    getStateCapital
   // checkIfContig,
   // getAllContigStates,

}