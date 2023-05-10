
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
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => s.code === req.params.state );
       console.log(ste);
       result = ste
        .map(({ state }) => state);
       result2 = ste  
        .map(({capital_city}) => capital_city);
       // res.json(result);
      var JSONObj = {"state": `${result}`,
                     "capital": `${result2}`   
};
if(JSONObj.state == "") return res.status(404).json({message: 'Invalid state abbreviation parameter'});
res.json(JSONObj)
   }catch(err){
       res.status(500).send(err.message);
   }
   
   };
   
//Get specific state and nickname
const getStateNickname = async (req, res) =>{
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => s.code === req.params.state );
       console.log(ste);
       result = ste
        .map(({ state }) => state);
       result2 = ste  
        .map(({nickname}) => nickname);
       // res.json(result);
      var JSONObj = {"state": `${result}`,
                     "nickname": `${result2}`   
};
if(JSONObj.state == "") return res.status(404).json({message: 'Invalid state abbreviation parameter'});
res.json(JSONObj)
   }catch(err){
       res.status(500).send(err.message);
   }
   
   };
   
//Get specific state and population
const getStatePopulation = async (req, res) =>{
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => s.code === req.params.state );
       console.log(ste);
       result = ste
        .map(({ state }) => state);
       result2 = ste  
        .map(({population}) => population);
       // res.json(result);
      var JSONObj = {"state": `${result}`,
                     "population": `${result2}`   
};
if(JSONObj.state == "") return res.status(404).json({message: 'Invalid state abbreviation parameter'});
res.json(JSONObj)
   }catch(err){
       res.status(500).send(err.message);
   }
   
   };
   
//Get specific state and admission
const getStateAdmission  = async (req, res) =>{
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => s.code === req.params.state );
       console.log(ste);
       result = ste
        .map(({ state }) => state);
       result2 = ste  
        .map(({admission_date}) => admission_date);
       // res.json(result);
      var JSONObj = {"state": `${result}`,
                     "admitted": `${result2}`   
};
if(JSONObj.state == "") return res.status(404).json({message: 'Invalid state abbreviation parameter'});
res.json(JSONObj)
   }catch(err){
       res.status(500).send(err.message);
   }
   
   };
   

//Exports
module.exports = {
    getAllStates,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
   
   // getAllContigStates,

}