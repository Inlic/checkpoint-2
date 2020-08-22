//data objects and pageload resources
let statTracker = document.getElementById("stat-tracker")
let invTracker = document.getElementById("inventory-tracker")
let store = document.getElementById("store")

let player = {
  auto: 0,
  power: 1,
  inventory: [
    {name: "resource",
     amount: 1000},
    {name: "upgradeOne",
     amount: 0},
    {name: "upgradeTwo",
     amount: 0},
    {name: "upgradeThree", 
     amount: 0},
    {name: "upgradeFour",
     amount: 0}
  ]
}

let upgrades = [
  {name: "upgradeOne",
   power: 3,
   auto: 0,
   cost: 50
  },
  {name: "upgradeTwo",
   power: 1,
   auto: 5,
   cost: 100
  },
  {name: "upgradeThree",
   power: 10,
   auto: 10,
   cost: 200
  },
  {name: "upgradeFour",
   power: 20,
   auto: 30,
   cost: 500
  }
]


//Draw functions

//draw stat tracker
function drawStats(){
  let template = `
  <div class="row">
    <div class="offset-2 col-8 bg-secondary">
     Player Power: ${player.power}
    </div>
  </div>
  <div class="row">
    <div class="offset-2 col-8 bg-secondary">
     Auto Per 3 Seconds: ${player.auto}
    </div>
  </div>   
  `
  statTracker.innerHTML = template
}


//draw inventory
function drawInv(){
  let template = ""
  player.inventory.forEach(item => {
    template +=  `
    <div class="row">
      <div class="offset-2 col-8 bg-secondary">
       ${item.name} : ${item.amount}
      </div>
    </div>
    `
  })
  invTracker.innerHTML = template
}

// draw store
function drawStore(){
  let template = ""
  let i = 0
  upgrades.forEach(upgrade =>{
    if(i == (upgrades.length-1)){
    template += `
      <div class="col-6">
        <button class="btn btn-primary" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> ${upgrade.cost}  
      </div>
    </div>
    `
    } else if(i == 0 || i % 2 == 0){
      template += `
      <div class ="row text-left">
        <div class="col-6">
          <button class="btn btn-primary" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> ${upgrade.cost}  
        </div>
    `
    } else{
      template += `
      <div class="col-6">
        <button class="btn btn-primary" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> ${upgrade.cost}  
      </div>
    </div>
    `
    }
    i++
  })
  store.innerHTML = template
}

// on click
function addResource(){
  player.inventory[0].amount += player.power
  console.log(player.inventory[0].amount)
  drawInv()
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
      case "resource":
        break;
      case "upgradeOne":
      case "upgradeTwo":
      case "upgradeThree":
      case "upgradeFour":
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
    drawStore()
    drawInv()
    pPower()
    drawStats()
  }
}

// increments by auto values that the player has 
function autoAdd(){
  player.inventory[0].amount += player.auto
  // TODO remove log statement in production
  console.log(player.inventory[0].amount)
  drawInv()
}
// interval update every 3 seconds, enable after finished
//TODO set interval to on in finished project
//setInterval(autoAdd,3000)


drawStats()
drawInv()
drawStore()
pPower()