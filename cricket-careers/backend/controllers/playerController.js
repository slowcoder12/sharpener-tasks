const Player = require('../models/player');

exports.addPlayer = (req,res) =>{
    const name = req.body.name;
    const dob = req.body.dob;
    const photourl = req.body.photourl;
    const birthplace = req.body.birthplace;
    const career = req.body.career;
    const matches = req.body.matches;
    const score = req.body.score;
    const fifties = req.body.fifties;
    const centuries = req.body.centuries;
    const wickets = req.body.wickets;
    const average = req.body.average;

    Player.create({
        name:name,dob:dob,
        photourl:photourl,
        birthplace:birthplace,
        career:career,
        matches:matches,
        score:score,
        fifties:fifties,
        centuries:centuries,
        wickets:wickets,
        average:average
    }).then(result=>{
        console.log("player added successfully in database");
        res.send();
    }).catch(err=>{
        console.log("Error occured",err);
    })
};

exports.searchPlayer = (req,res)=>{
    const name = req.params.name;

    Player.findOne({
        where: {
            name : name
        }
    }).then((player)=>{
        if(!player){
            res.status(404).send("error");
        }

        res.json(player);
    }).catch(err=>{

        console.log(err);
    })



}

exports.updatePlayer = (req,res)=>{
    const playerId = req.params.id;

    const updatedPlayer = {
         name : req.body.name,
         dob : req.body.dob,
         photourl : req.body.photourl,
         birthplace : req.body.birthplace,
         career : req.body.career,    
         matches : req.body.matches,
         score : req.body.score,
         fifties : req.body.fifties,
         centuries : req.body.centuries,
         wickets : req.body.wickets,
         average : req.body.average

    };

    Player.update(updatedPlayer,{
        where: {
            id: playerId,
        },
    }).then(()=>{
        return Player.findByPk(playerId);
    }).then((response)=>{
        res.status(204).json(response);
    }).catch(err=>{
        console.log(err);
    })



}

