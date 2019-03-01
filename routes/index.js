var express = require('express');
var router = express.Router();
let Web3 = require('web3');
var BigNumber = require('bignumber.js');
let web3;

//查看web3是否被导入，如果没有被导入则导入
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//查看节点链接状态
var connected = web3.isConnected();
if(!connected){
  console.log("node not connected!");
}else{
  console.log("node connected");
}

let localAddress = web3.eth.accounts[0];

let address = "0x32de473d8ffe50a1ceb966fa63a3d6cc0a9a00fc";
//合约部署，已经在geth客户端中部署过，现在直接找到地址就可以部署
let abi =[
  {
    "constant": false,
    "inputs": [
      {
        "name": "key",
        "type": "string"
      },
      {
        "name": "server_address",
        "type": "address"
      }
    ],
    "name": "continueToPay",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "deleteSoftWare",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "endShare",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "key",
        "type": "string"
      },
      {
        "name": "server_address",
        "type": "address"
      },
      {
        "name": "end_timestap",
        "type": "uint256"
      },
      {
        "name": "total_time",
        "type": "uint256"
      },
      {
        "name": "money",
        "type": "uint256"
      }
    ],
    "name": "endStoreRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "key",
        "type": "string"
      },
      {
        "name": "server_mac",
        "type": "string"
      },
      {
        "name": "server_ip",
        "type": "string"
      },
      {
        "name": "server_address",
        "type": "address"
      },
      {
        "name": "client_mac",
        "type": "string"
      },
      {
        "name": "client_ip",
        "type": "string"
      },
      {
        "name": "client_address",
        "type": "address"
      },
      {
        "name": "start_timestap",
        "type": "uint256"
      }
    ],
    "name": "firstStoreRecord",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "pass",
        "type": "string"
      }
    ],
    "name": "modifyPass",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "server_mac",
        "type": "string"
      },
      {
        "name": "server_ip",
        "type": "string"
      },
      {
        "name": "moneyPerHour",
        "type": "uint256"
      },
      {
        "name": "cpu",
        "type": "string"
      },
      {
        "name": "size",
        "type": "string"
      }
    ],
    "name": "pendShare",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "date",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "start",
        "type": "string"
      }
    ],
    "name": "storeSoftWare",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "storeUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "server_address",
        "type": "address"
      },
      {
        "name": "indexs",
        "type": "uint256[]"
      },
      {
        "name": "scores",
        "type": "uint256[]"
      }
    ],
    "name": "updateScore",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "key",
        "type": "string"
      }
    ],
    "name": "canUseNow",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "fetchUser",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "fetchUserBySoftware",
    "outputs": [
      {
        "name": "findAddressLen",
        "type": "uint256"
      },
      {
        "name": "addresses",
        "type": "address[50]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "fetchUserInfo",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "getMoneyPerHour",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "key",
        "type": "string"
      }
    ],
    "name": "getRecordByKey",
    "outputs": [
      {
        "name": "server_mac",
        "type": "string"
      },
      {
        "name": "server_ip",
        "type": "string"
      },
      {
        "name": "server_address",
        "type": "address"
      },
      {
        "name": "start_timestap",
        "type": "uint256"
      },
      {
        "name": "money",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getSoftWare",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "getSoftWareLenth",
    "outputs": [
      {
        "name": "trueLen",
        "type": "uint256"
      },
      {
        "name": "falseLen",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "getUserPass",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "getUserState",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "server_address",
        "type": "address"
      },
      {
        "name": "client_address",
        "type": "address"
      }
    ],
    "name": "hasEnoughMoney",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "add",
        "type": "address"
      }
    ],
    "name": "isUserRegister",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "searchUserLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
let Share = web3.eth.contract(abi).at(address);
let userMap = new Map();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var address = req.body.address;
    var pass = req.body.pass;
    console.log(pass);
    var isSuccess =  web3.personal.unlockAccount(address,pass);
    //console.log(isSuccess);
   if(isSuccess==true){
      var isUserRegister = Share.isUserRegister(address);
      userMap.set(address,pass);
      var userState = Share.getUserState(address);
      res.json({success:isSuccess,Register:isUserRegister,isShare:userState[0]});
    }
    else{
      res.json({success:false});
    }
});

function unlockAccount(address){
  var pass = userMap.get(address);
  console.log(pass);
  web3.personal.unlockAccount(address,pass);
}

router.post('/unlock', function(req, res, next) {
    var address = req.body.address;
    console.log(address);
    unlockAccount(address);
    res.json({success:true});
});

router.post('/startService',function(request,res,next){
    var address = request.body.address;
    var ip = request.body.ip;
    var mac = request.body.mac;
    var moneyPerHour = request.body.moneyPerHour;
    var amount = web3.toWei(moneyPerHour, 'ether');
    var cpu = request.body.cpu;
    var size = request.body.size;
    console.log(request.body.cpu);
    console.log(request.body.mac);
    console.log(amount);
    let startServiceTrans = Share.pendShare.sendTransaction( mac,ip,amount,cpu,size, {from:address, gas:216846});
    console.log(startServiceTrans);
    res.json({success:true});
});

router.post('/endService',function(request,res,next){
    var address = request.body.address;
    console.log(request.body.address);
    var userState = Share.getUserState(address);
    if(userState[1]>0){
       res.json({success:true,count:userState[1]});
    }
    else{
      let endServiceTrans = Share.endShare.sendTransaction( {from:address, gas:216846});
      console.log(endServiceTrans);
      res.json({success:true,count:userState[1]});
    }
    
});
router.get('/accounts', function(req, res, next) {
  var account = web3.eth.accounts;
  console.log(account);
  res.json({accounts:account});
});

router.post('/newAccount',function(request,res,next){
  pass = request.body.pass;
  console.log(pass);
  var _account =  web3.personal.newAccount(pass);
  res.json({account:_account});
});

router.post('/register',function(request,res,next){
  var address = request.body.address;
  console.log(address);
  var registorTrans = Share.storeUser.sendTransaction({from:address, gas:300000});
  console.log(registorTrans);
  res.json({success:true});
});
//storeSoftWare(string memory date,string memory name,string memory start)
router.post('/storeSoftware',function(request,res,next){
   var date = request.body.date;
   var name = request.body.name;
   var start = request.body.start;
   var address = request.body.address;
   console.log(date);
   console.log(name);
   console.log(start);
   console.log(address);
   var getSoftwareTrans = Share.getSoftWareLenth(address);
   var falseLen = new BigNumber(getSoftwareTrans[1]);
   let storeSoftwareTrans = Share.storeSoftWare.sendTransaction( date,name,start,{from:address, gas:216846});
   console.log(storeSoftwareTrans);
   res.json({success:true,index:falseLen.toString(),date:date,start:start,name:name,score:"100"});
});

function getSoftwareByAddress(address){
  let getSoftwareTrans = Share.getSoftWareLenth(address);
    var trueLen = new BigNumber(getSoftwareTrans[0]);
    var falseLen = new BigNumber(getSoftwareTrans[1]);
    var entity = {};
    entity["trueLen"] = trueLen.toString();
    entity["falseLen"] = falseLen.toString();
    console.log(falseLen.toString());
     var sw_array = [];
    for (var i = 0; i < falseLen; i++) {
      var _sw = Share.getSoftWare(address,i);
      var sw = {};
      if(_sw[0]) {
        sw.index = i;
        sw.date = _sw[2];
        sw.name = _sw[3];
        sw.score = _sw[4].toString();
        sw.start = _sw[5];
        sw_array.push(sw);
      }
    }
   entity["sw"] = sw_array;
   return entity;
}

//function getSoftWareLenth() public view returns(uint trueLen,uint falseLen)
router.get('/getSoftware',function(request,res,next){
  var address = request.query.address;
  var softwares = getSoftwareByAddress(address);
  res.json(softwares);
});

//deleteSoftWare
router.post('/deleteSoftWare',function(request,res,next){
   var address = request.body.address;
   var index = request.body.index;
    let deleteSoftWareTrans = Share.deleteSoftWare.sendTransaction(index,{from:address, gas:216846});
    console.log(deleteSoftWareTrans);
     res.json({success:true,_index:index});
});

//getUserPass
router.get('/getUserPass',function(request,res,next){
    var address = request.query.address;
    let getUserPassTrans = Share.getUserPass(address);
    res.json({success:true,_pass:getUserPassTrans});
});

//modifyPass(string memory pass) 
router.post('/modifyPass',function(request,res,next){
   var address = request.body.address;
   var pass = request.body.pass;
   console.log(pass);
    let passTrans = Share.modifyPass.sendTransaction( pass,{from:address, gas:216846});
    console.log(passTrans);
     res.json({success:true});
});

//getUserPass
router.get('/getShareUser',function(request,res,next){
    var len = Share.searchUserLength();
    var address_array = [];
    for(var i=0;i<len;i++){
      var user = Share.fetchUser(i);
      if(user[1]) address_array.push(user[0]);
    }
    res.json({success:true,users:address_array});
});

router.get('/getShareUserBySoftware',function(request,res,next){
  var swName = request.query.name;
  console.log(swName);  
  var user = Share.fetchUserBySoftware(swName);
  var length = user[0];
  var userAddress = [];
  for(var i=0;i<length;i++){
      userAddress.push(user[1][i])
  }
  res.json({success:true,len:user[0],users:userAddress});
});

//ShareUserInfo
router.get('/getShareUserInfo',function(request,res,next){
    var address = request.query.address;
    var UserInfo = Share.fetchUserInfo(address);
    var softwares = getSoftwareByAddress(address);
    var moneyPerHour = web3.fromWei(UserInfo[4], 'ether');
    res.json({success:true,cpu:UserInfo[5],size:UserInfo[6],address:address,mac:UserInfo[0],ip:UserInfo[1],pass:UserInfo[2],score:UserInfo[3],money:moneyPerHour,sws:softwares});
});


router.post('/firstStoreRecord',function(request,res,next){
   var server_mac = request.body.server_mac;
   var server_ip = request.body.server_ip;
   var server_address = request.body.server_address;
   var start_timestap = request.body.start_timestap;
   var client_mac = request.body.client_mac;
   var client_ip = request.body.client_ip;
   var client_address = request.body.client_address;
   var money = request.body.money;
   var amount = web3.toWei(money, 'ether');
   console.log(amount);
   var enough = Share.hasEnoughMoney(server_address,client_address);
   if(enough){
    var key = client_address+start_timestap;
    console.log(key);
    Share.firstStoreRecord.sendTransaction(key,server_mac,server_ip,server_address,client_mac,client_ip,client_address,parseInt(start_timestap),{from:client_address,value:amount, gas:300000});
    res.json({success:true,isEnough:enough,address:server_address});
   }else{
     res.json({success:true,isEnough:enough,address:server_address});
   }
   
});

router.post('/endStoreRecord',function(request,res,next){
   var money = request.body.money;
   var total_time = request.body.total_time;
   var start_timestap = request.body.start_timestap;
   var end_timestap = request.body.end_timestap;
   var server_address = request.body.server_address;
   var client_address = request.body.client_address;
   console.log(parseInt(start_timestap));
   console.log(server_address);
   var key = client_address+start_timestap;
   console.log(key);
   Share.endStoreRecord.sendTransaction(key,server_address,parseInt(end_timestap),parseInt(total_time),parseInt(money),{from:client_address, gas:216846});
   res.json({success:true});
});
router.get('/canUseNow',function(request,res,next){
    var key = request.query.key;
    var canUse = Share.canUseNow(key);
    res.json({success:true,use:canUse});
});

//getUserState
router.get('/getUserState',function(request,res,next){
    var address = request.query.address;
    var userState = Share.getUserState(address);
    res.json({success:true,isShare:userState[0],count:userState[1]});
});

//continueToPay
router.post('/continueToPay',function(request,res,next){
   var server_address = request.body.server_address;
   var client_address = request.body.client_address;
   var key = request.body.key;
   var money = request.body.money;
   var amount = web3.toWei(money, 'ether');
   console.log(amount);
   var enough = Share.hasEnoughMoney(server_address,client_address);
   if(enough){
    console.log(key);
    Share.continueToPay.sendTransaction(key,server_address,{from:client_address,value:amount, gas:300000});
    res.json({success:true,isEnough:enough,address:server_address});
   }else{
     res.json({success:true,isEnough:enough,address:server_address});
   }
   
});

router.post('/undateScore',function(request,res,next){
   var data = request.body.data;
   var server_address = request.body.server_address;
   var client_address = request.body.client_address;
   console.log(data);
   var indexs=[];
   var scores = [];
   var list = data.split(";");
   for(var i=0;i<list.length;i++){
     var iAndS = list[i].split(":");
     indexs.push(parseInt(iAndS[0]));
     scores.push(parseInt(iAndS[1]));
   }
   Share.updateScore.sendTransaction(server_address,indexs,scores,{from:client_address, gas:216846});
   res.json({success:true});
});
module.exports = router;
