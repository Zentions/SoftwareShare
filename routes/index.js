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

let address = "0x7cb95a98370822d20d4cf75a7032abdaa5f14ca3";
//合约部署，已经在geth客户端中部署过，现在直接找到地址就可以部署
let abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
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
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "end_timestap",
        "type": "string"
      },
      {
        "name": "total_time",
        "type": "string"
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
        "type": "string"
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
      }
    ],
    "name": "firstStoreRecord",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
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
        "name": "inter",
        "type": "string"
      }
    ],
    "name": "replaceInterest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "inter1",
        "type": "string"
      },
      {
        "name": "inter2",
        "type": "string"
      },
      {
        "name": "inter3",
        "type": "string"
      },
      {
        "name": "inter4",
        "type": "string"
      },
      {
        "name": "inter5",
        "type": "string"
      }
    ],
    "name": "storeInterest",
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
        "name": "score",
        "type": "uint256"
      }
    ],
    "name": "updateUserScore",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
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
        "type": "uint8"
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
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "name": "u_address",
        "type": "address"
      },
      {
        "name": "score",
        "type": "uint8"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "pass",
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
        "name": "isShare",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
let Share = web3.eth.contract(abi).at(address);
let user = new Map();

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
      user.set(address,pass);
      res.json({success:isSuccess,Register:isUserRegister});
    }
    else{
      res.json({success:false});
    }
});

router.get('/a', function(req, res, next) {
  var test = {json:"tttt",tt:"444"} 
  res.json(test);
});


router.post('/startService',function(request,res,next){
    var address = request.body.address;
    var ip = request.body.ip;
    var mac = request.body.mac;
    console.log(request.body.ip);
    console.log(request.body.mac);
    let startServiceTrans = Share.pendShare.sendTransaction( mac,ip, {from:address, gas:216846});
    console.log(startServiceTrans);
    res.json({success:true});
});

router.post('/endService',function(request,res,next){
    var address = request.body.address;
    console.log(request.body.address);
    let endServiceTrans = Share.endShare.sendTransaction( {from:address, gas:216846});
    console.log(endServiceTrans);
    res.json({success:true});
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
  var registorTrans = Share.storeUser.sendTransaction({from:address, gas:216846});
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
   let storeSoftwareTrans = Share.storeSoftWare.sendTransaction( date,name,start,{from:address, gas:216846});
   console.log(storeSoftwareTrans);
   res.json({success:true,date:date,start:start,name:name,score:"100"});
});
//function getSoftWareLenth() public view returns(uint trueLen,uint falseLen)
router.get('/getSoftware',function(request,res,next){
    var address = request.query.address;
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
        sw.date = _sw[2];
        sw.name = _sw[3];
        sw.score = _sw[4].toString();
        sw.start = _sw[5];
        sw_array.push(sw);
      }
    }
   entity["sw"] = sw_array;
   res.json(entity);
});

//deleteSoftWare
router.post('/deleteSoftWare',function(request,res,next){
   var address = request.body.address;
   var name = request.body.name;
    let deleteSoftWareTrans = Share.deleteSoftWare.sendTransaction( name,{from:address, gas:216846});
    console.log(deleteSoftWareTrans);
     res.json({success:true,_name:name});
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

module.exports = router;
