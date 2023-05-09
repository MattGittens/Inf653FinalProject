const express = require('express');
const router = express.Router();

const Statecode = require('../../models/States');
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
       const statecode = req.params.code;
       const state = await Statecode.findOne({code: req.params.state})
       if(!state) return res.status(404).json({message: 'State not found'})
       const statefact = state.get('funfacts');
       const random = Math.floor(Math.random() * statefact.length);
       res.json(statefact[random]);
       console.log(state);
   }catch(err){
       res.status(500).send(err.message);
   }
   
   });

module.exports = router;