const { response } = require('express');
const express = require('express');
const router = express.Router();
//Import required objects
const Statecode = require('../../models/States');
const data = require('../../models/statesData.json');
 
//Post
router.post('/', async (req,res) => {
    try{
       const state = new Statecode({
        code: req.body.code
       }) ;;

       const newState = await state.save();
       res.status(201).json(newState);
    }catch(err){
        res.status(404).json(err.message);
    }
});

//Get requests
//get state information
router.get('/states/:state', async (req, res) =>{
 try{
    const statecode = req.body.code;
    const state = await Statecode.findOne({code: req.params.state});
    if(!state) return res.status(404).json({message: 'State not found'});
    
    
    res.json(state);
    console.log(statecode);
}catch(err){
    res.status(500).send(err.message);
}

});


//get random funfact from each state
router.get('/states/:state/funfact', async (req, res) =>{
    try{
      //Acquiring funfact from mongo db
       const statecode = req.params.code;
       const state = await Statecode.findOne({code: req.params.state})
       if(!state) return res.status(404).json({message: 'Invalid state abbreviation parameter'})
       const statefact = state.get('funfacts');
      //Linking data from json file and mongodb

       const ste = await data.filter(s => s.code === req.params.state );
       
    result = ste
        .map(({ state }) => state);
    console.log(result);

      //Checking for funfact
      if(statefact[0] === undefined)
      return res.status(404).json({message: `No Fun Facts found for ${result}`});
        //res.json(ste) 
       const random = Math.floor(Math.random() * statefact.length);
      var JSONObj = {"funfact": `${statefact[random]}`};
      res.json(JSONObj);
   }catch(err){
       res.status(500).send(err.message);
   }
   
   });

module.exports = router;