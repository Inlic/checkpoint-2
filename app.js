//data objects and pageload resource
let statTracker = document.getElementById("stat-tracker")
let invTracker = document.getElementById("inventory-tracker")
let store = document.getElementById("store")
let achieve = document.getElementById("achieve")

let player = JSON.parse(localStorage.getItem("playerData")) || {
  auto: 0,
  power: 1,
  inventory: [
    {name: "Gold",
    //TODO change gold to 0 when done testing
     amount: 999},
    {name: "Torch",
     amount: 0},
    {name: "Pick",
     amount: 0},
    {name: "Mine-Cart", 
     amount: 0},
    {name: "Dynamite",
     amount: 0}
  ]
}

let upgrades = JSON.parse(localStorage.getItem("upgradeData")) || [
  {name: "Torch",
   power: 3,
   auto: 0,
   cost: 50
  },
  {name: "Pick",
   power: 1,
   auto: 5,
   cost: 100
  },
  {name: "Mine-Cart",
   power: 10,
   auto: 10,
   cost: 200
  },
  {name: "Dynamite",
   power: 20,
   auto: 30,
   cost: 500
  }
]

let hidden = localStorage = JSON.parse(localStorage.getItem("hiddenData")) || [
  {name: "Torch",
   hidden: true},
   {name: "Pick",
   hidden: true},
   {name: "Mine-Cart",
   hidden: true},
   {name: "Dynamite",
   hidden: true},
]

let achievements = localStorage = JSON.parse(localStorage.getItem("achievementData")) || [
  {text: "Digger",
   idtext: "digger",
   rgold: 1000,
   earned: false},
   {text: "Miner",
   idtext: "miner",
   rgold: 10000,
   earned: false},
   {text: "Too Greedily and Too Deep",
   idtext: "too-g-and-too-d",
   rgold: 100000,
   earned: false}
]


//Draw functions

//draw stat tracker
function drawStats(){
  let template = `
  <div class="row">
    <div class="offset-2 col-8 p-box topb">
     Player Power: ${player.power}
    </div>
  </div>
  <div class="row">
    <div class="offset-2 col-8 p-box botb">
     Auto Per 3 Seconds: ${player.auto}
    </div>
  </div>   
  `
  statTracker.innerHTML = template
}


//draw inventory
function drawInv(){
  let template = ""
  let i = 0
  player.inventory.forEach(item => {
    if(i == 0){
    template +=  `
    <div class="row">
      <div class="offset-2 col-8 topb i-box">
       ${item.name} : ${item.amount}
      </div>
    </div>
    `
    } else if(i == (player.inventory.length-1)){
      template +=  `
    <div class="row">
      <div class="offset-2 col-8 botb i-box">
       ${item.name} : ${item.amount}
      </div>
    </div>
    `
    } else{
      template +=  `
    <div class="row">
      <div class="offset-2 col-8 sideb i-box">
       ${item.name} : ${item.amount}
      </div>
    </div>
    `
    }
    i++
  })
  invTracker.innerHTML = template
}

//TODO icons instead of numbers to track items?


// draw store
function drawStore(){
  let template = ""
  let i = 0
  upgrades.forEach(upgrade =>{
    if(i == (upgrades.length-1)){
    template += `
      <div id='${upgrade.name}' class="col-6 s-box p-2 d-none">
        <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
      </div>
    </div>
    `
    } else if(i == 0 || i % 2 == 0){
      template += `
      <div class ="row text-left">
        <div id='${upgrade.name}' class="col-6 s-box p-2 d-none">
          <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
        </div>
    `
    } else{
      template += `
      <div id='${upgrade.name}' class="col-6 s-box p-2 d-none">
        <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
      </div>
    </div>
    `
    }
    i++
  })
  store.innerHTML = template
}

// store hiding functions

function checkHidden(){
  upgrades.forEach(upgrade => {
    if(player.inventory[0].amount >= upgrade.cost){
      hidden.find(item => item.name == upgrade.name).hidden = false
    }
  });
  localStorage.setItem("hiddenData",JSON.stringify(hidden))
}

function revealHidden(){
  hidden.forEach(item => {
    if(item.hidden == false){
      document.getElementById(item.name).classList.remove("d-none")
    }    
  });
}

// TODO add button disabling if item cannot be afforded


// draw achievement popups

function drawAchiev(){
  let template = ""
  achievements.forEach(achievement => {
     if(player.inventory[0].amount >= achievement.rgold && achievement.earned == false){
        template += `
        <div id='${achievement.idtext}' class="row achieve-box align-items-center justify-content-around" onclick="sawAchieve('${achievement.idtext}')"> 
          <div class="text-left col-4 p-1">
              Achievement: ${achievement.text} 
            </div>
            <div class="col-4 p-1">
              <img src="/assets/ale.jpg" width="175" height="100">
            </div> 
          </div>
        </div>
        `
     }
   });
  achieve.innerHTML = template
}

// remove achievement popup
function sawAchieve(id){
  achievements.find(achievement=>achievement.idtext == id).earned = true;
  localStorage.setItem("achievementData",JSON.stringify(achievements))
  drawAchiev()
}


// on click
function addResource(){
  timeOut()
  player.inventory[0].amount += player.power
  // TODO remove this log on finished product
  console.log(player.inventory[0].amount)
  checkHidden()
  revealHidden()
  drawInv()
  drawAchiev()
  localStorage.setItem("playerData",JSON.stringify(player))
}

// click timeout for addResource, adjusted image to input, and restyled
function timeOut() {
  document.getElementById("miner").disabled = true;
  setTimeout(function() {document.getElementById("miner").disabled = false;},50);
  }


// calculates how much resource on click
// run at start, run after buy, don't run on click
function pPower(){
  let i = 0
  player.power = 1
  player.auto = 0
  player.inventory.forEach(item =>{
  if(i > 0){
    let itemPower = upgrades.find(upgrade => upgrade.name == player.inventory[i].name).power
    let itemAuto = upgrades.find(upgrade => upgrade.name == player.inventory[i].name).auto
    switch(item.name){
      case "Gold":
        break;
      case "Torch":
      case "Pick":
      case "Mine-Cart":
      case "Dynamite":
        player.power += item.amount*itemPower
        player.auto += item.amount*itemAuto
        break;
      }
    i++
  } else{
    i++
  }
  })
}

//Click and buy functions
function buyItem(name,cost){
  if(cost > player.inventory[0].amount) {return}
  else{
    player.inventory[0].amount -= cost
    player.inventory.find(item => item.name == name).amount += 1
    upgrades.find(upgrade => upgrade.name == name).cost = Math.floor(upgrades.find(upgrade => upgrade.name == name).cost *=1.25)
    checkHidden()
    drawStore()
    revealHidden()
    drawInv()
    pPower()
    drawStats()
    localStorage.setItem("upgradeData",JSON.stringify(upgrades))
    localStorage.setItem("playerData",JSON.stringify(player))
  }
}

// increments by auto values that the player has 
function autoAdd(){
  player.inventory[0].amount += player.auto
  // TODO remove log statement in production
  //console.log(player.inventory[0].amount)
  checkHidden()
  revealHidden()
  drawInv()
  drawAchiev()
  localStorage.setItem("playerData",JSON.stringify(player))
}
//TODO consider adding timed bonuses for the auto multiplier, also consider increasing collection frequency and prevent the collection interval from being started more than once


// interval update every 3 seconds, enable after finished
//TODO set interval to on in finished project
setInterval(autoAdd,3000)

//TODO badges and achievement popups


drawStats()
drawInv()
checkHidden()
drawStore()
revealHidden()
pPower()


drawAchiev()