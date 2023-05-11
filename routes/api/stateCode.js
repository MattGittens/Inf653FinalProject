const { response } = require('express');
const express = require('express');
const router = express.Router({
  caseSensitive: true
});
//Import required objects
const Statecode = require('../../models/States');
const data = require('../../models/statesData.json');
 
//Post
router.get('/states/:state', async (req, res) =>{
 try{
    //Acquiring data from mongodb 
    
   
    const state = await Statecode.findOne({code: req.params.state});
    if(!state) return res.status(404).json({message: 'Invalid state abbreviation parameter'})
    const statefact = state.get('funfacts');
    //Acquiring json file date
    const ste = await data.filter(s => s.code === req.params.state );
   
    resp = ste
    .map(({state})=> state);
    resp1 = ste
    .map(({slug})=> slug);
    resp2 = ste
    .map(({code})=> code);
    resp3 = ste
    .map(({nickname})=> nickname);
    resp4 = ste
    .map(({website})=> website);
    resp5 = ste
    .map(({admission_date})=> admission_date);
    resp6 = ste
    .map(({admission_number})=> admission_number);
    resp7 = ste
    .map(({capital_city})=> capital_city);
    resp8 = ste
    .map(({capital_url})=> capital_url);
    resp9 = ste
    .map(({population})=> population);
    resp10 = ste
    .map(({population_rank})=> population_rank);
    resp11 = ste
    .map(({constitution_url})=> constitution_url);
    resp12 = ste
    .map(({state_flag_url})=> state_flag_url);
    resp13 = ste
    .map(({state_seal_url})=> state_seal_url);
    resp14 = ste
    .map(({map_image_url})=> map_image_url);
    resp15 = ste
    .map(({landscape_background_url})=> landscape_background_url);
    resp16 = ste
    .map(({skyline_background_url})=> skyline_background_url);
    resp17 = ste
    .map(({twitter_url})=> twitter_url);
    resp18 = ste
    .map(({facebook_url})=> facebook_url);

    //Link the two 
    if(statefact[0] === undefined) {
    var obj={
        "state": resp,    
        "slug": resp1,
        "code": resp2,
        "nickname": resp3,
        "website": resp4,
        "admission_date": resp5,
        "admission_number": resp6,
        "capital_city": resp7,
        "capital_url": resp8,
        "population": resp9,
        "population_rank": resp10,
        "constitution_url": resp11,
        "state_flag_url": resp12,
        "state_seal_url": resp13, 
        "map_image_url": resp14, 
        "landscape_background_url": resp15,
        "skyline_background_url": resp16,
        "twitter_url": resp17, 
        "facebook_url": resp18,
        
    }
    }else{ var obj={
        "state": resp,    
        "slug": resp1,
        "code": resp2,
        "nickname": resp3,
        "website": resp4,
        "admission_date": resp5,
        "admission_number": resp6,
        "capital_city": resp7,
        "capital_url": resp8,
        "population": resp9,
        "population_rank": resp10,
        "constitution_url": resp11,
        "state_flag_url": resp12,
        "state_seal_url": resp13, 
        "map_image_url": resp14, 
        "landscape_background_url": resp15,
        "skyline_background_url": resp16,
        "twitter_url": resp17, 
        "facebook_url": resp18,
        "funfacts": statefact
    }};


    res.json(obj);
    console.log(state);
}catch(err){
    res.status(500).send(err.message);
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

 router.delete('/states/:state/funfact', async (req, res) =>{
    try{
        const state = await Statecode.find(req.params.state);
if(!state) return res.status(404).json({ message: 'State not found'});
await state.remove();    
}catch(err){
    res.status(500).send(err.message);
}
   });

module.exports = router;