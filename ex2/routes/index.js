var express = require('express');
var router = express.Router();
var axios = require("axios")

var api = "http://localhost:15015"

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(api + "/contracts/").then((result)=>{
    res.render('index', { contracts: result.data });
  })
});

router.get("/:id", function(req, res, next) {
      axios.get(api + "/contracts/" + req.params.id).then((result2)=>{
        res.render('contrato', { contract: result2.data[0] });
      })
    
  })


router.get("/inst/:id", function(req, res, next) {
    axios.get(api + "/contracts?inst=" + req.params.id).then((result2)=>{

      res.render('instituicao', { contracts: result2.data });
    })
  
})





module.exports = router;
