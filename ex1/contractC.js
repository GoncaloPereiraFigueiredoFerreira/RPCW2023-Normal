let Contract = require("./contractM")


module.exports.getContracts = ()=>{
  return Contract.find()
}

module.exports.getContractByID = (id)=>{
  return Contract.find({id:id})
}

module.exports.getContractsByYear = (year)=>{
  return Contract.find({"DataInicioContrato":{ $regex: year}})
}

module.exports.getContractsByInst = (inst)=>{
  return Contract.find({"NIPCInstituicao":inst})
}


module.exports.getCourses = ()=>{
  return Contract.aggregate([{$group:{_id:"$Curso"}}])
}

module.exports.getInstitutions= ()=>{
  return Contract.aggregate([{$group:{_id:"$NomeInstituicao"}}])
}

module.exports.addContract= (contract)=>{
  return Contract.create(contract)
}

module.exports.deleteContract = (id)=>{
  return Contract.deleteOne({id:id})
}
