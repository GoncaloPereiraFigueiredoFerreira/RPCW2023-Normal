var express = require("express")
var mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/scienceJobs", {useNewUrlParser:true, useUnifiedTopology:true})
let db = mongoose.connection

db.on("error", (err)=> {
  console.log(err)
  process.exit()
})
db.on("open", ()=>{
  console.log("Connexão ao mongo realizada com sucesso...")
})

var Contracts = require("./contractC")

var app = express()

app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/contracts",(req,res,next)=>{
    if ("year" in req.query){
      Contracts.getContractsByYear(req.query.year).then((result)=>{
        res.status(200).jsonp(result).end()
    }).catch(err=>{next(err)})
    }

    else if ("inst" in req.query){
      Contracts.getContractsByInst(req.query.inst).then((result)=>{
        res.status(200).jsonp(result).end()
    }).catch(err=>{next(err)})
    }
    else{
      Contracts.getContracts().then((result)=>{
          res.status(200).jsonp(result).end()
      }).catch(err=>{next(err)})
  }
})

app.get("/contracts/institutions",(req,res,next)=>{
  Contracts.getInstitutions().then((result)=>{
    res.status(200).jsonp(result).end()
  }).catch(err=>{next(err)})
})


app.get("/contracts/courses",(req,res,next)=>{
  Contracts.getCourses().then((result)=>{
    res.status(200).jsonp(result).end()
  }).catch(err=>{next(err)})
})


app.get("/contracts/:id",(req,res,next)=>{
  Contracts.getContractByID(req.params.id).then((result)=>{
    res.status(200).jsonp(result).end()
  }).catch(err=>{next(err)})
})




app.post("/contracts",(req,res,next)=>{
  Contracts.addContract(req.body).then((result)=>{
    res.status(200).jsonp(result).end()
  }).catch(err=>{next(err)})
})



app.delete("/contracts/:id",(req,res,next)=>{
  Contracts.deleteContract(req.params.id).then((result)=>{
    res.status(200).jsonp(result).end()
  }).catch(err=>{next(err)})
})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error("ERROR:"+ err.message)
});


app.listen(15015,()=>{
  console.log("Listening on http://localhost:"+15015)
})

