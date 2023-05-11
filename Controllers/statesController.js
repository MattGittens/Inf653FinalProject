//Data Requirements
const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) {this.states = data}

}
const data2 = require('../models/statesData.json');
const Sae = require('../models/States');
//Get request
//Gets all states
const getAllStates = (req, res) => {
    //Contig query
let states = data.states;
if (req.query.contig === 'true'){
states = states.filter(state => state.code !== 'AK' && state.code !== 'HI');
}
else if (req.query.contig === 'false'){
    states = states.filter(state => state.code === 'AK' || state.code === 'HI');
}


//loop through data
for(let i = 0; i < states.length; i++) {
    let obj = states[i];
    const state =  Sae.findOne({code: obj.code});
    const statefact = state.get('funfacts');    
    console.log(state);
}
res.json(states);

}

//Get specific state and capital
const getStateCapital = async (req, res) =>{
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => (s.code).toLowerCase() === req.params.state.toLowerCase()  );
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
    
       const ste = await data2.filter(s => (s.code).toLowerCase() === req.params.state.toLowerCase() );
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
//Formatting function
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Get request
const getStatePopulation = async (req, res) =>{
    try{
       const statecode = data.states;
       const ste = await data2.filter(s => (s.code).toLowerCase() === req.params.state.toLowerCase()  );
       console.log(ste);
       result = ste
        .map(({ state }) => state);
       result2 = ste  
        .map(({population}) => population);
      result2 = numberWithCommas(result2);
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
       const ste = await data2.filter(s => (s.code).toLowerCase() === req.params.state.toLowerCase()  );
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
 
/*//const postFunFact =  async (req,res) => {
    try{
       const s = Sae.findOneAndUpdate({code: req.params.state}, {$push: {"funfacts": req.body.funfacts}})
       /*const state = new Statecode({
           funfacts: req.body.funfacts
       });
      console.log(s)
       res.status(201).json(s);
    }catch (err) {
       res.status(400).json(err.message);
    }
  // };*/

//add funfacts
const addFunFacts = async (req, res) => {
    try {
      const { state } = req.params;
      const { funfacts } = req.body;
  
      if (!funfacts) {
        return res.status(400).json({ message: 'State fun facts value required' });
      }
      if(!Array.isArray(funfacts)){
        return res.status(400).json({message: 'State fun facts value must be an array'})
      }
  
      const stateData = await Sae.findOne({ code: state });
  
      if (!stateData) {
        const newStateData = new State({ code: state, funfacts });
        await newStateData.save();
        return res.status(201).json(newStateData);
      }
  
      stateData.funfacts = [...stateData.funfacts, ...funfacts];
      await stateData.save();
  
      return res.status(200).json(stateData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

//patchfunfacts
const updateFunFact = async (req, res) => {
  try {
    const { state } = req.params;
    const { index, funfact } = req.body;

    if (!index || !funfact) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const stateData = await Sae.findOne({ code: state });

    if (!stateData || stateData.funfacts.length < index) {
      return res.status(404).json({ message: 'State fun fact value required' });
    }
    if(stateData.funfacts.length === 0){
      return res.status(404).json({ message: 'State fun fact index value required '})
    }

    stateData.funfacts[index - 1] = funfact;
    await stateData.save();

    return res.status(200).json(stateData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//Delete Funfact
const deleteFunFact = async (req, res) => {
  try {
    const { state } = req.params;
    const { index } = req.body;

    if (!index) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const stateData = await Sae.findOne({ code: state });

    if (!stateData || stateData.funfacts.length === 0 || stateData.funfacts.length < index) {
      return res.status(404).json({ message: 'Fun fact not found' });
    }

    stateData.funfacts = stateData.funfacts.filter((_, i) => i !== index - 1);
    await stateData.save();

    return res.status(200).json(stateData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//Exports
module.exports = {
    getAllStates,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
    addFunFacts,
    updateFunFact,
    deleteFunFact

}