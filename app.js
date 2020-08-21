//data objects and pageload resources
let statTracker = document.getElementById("stat-tracker")
let invTracker = document.getElementById("inventory-tracker")
let store = document.getElementById("store")

let player = {
  auto: 0,
  power: 1,
  inventory: [
    {name: "resource",
     amount: 0},
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
    <div class="col-12">
     Player Power: ${player.power}
    </div>
  </div>
  <div class="row">
    <div class="col-12">
     Auto Per Second: ${player.auto}
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
      <div class="col-12">
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
        <button class="btn btn-primary">${upgrade.name}</button> ${upgrade.cost}  
      </div>
    </div>
    `
    } else if(i == 0 || i % 2 == 0){
      template += `
      <div class ="row text-center">
        <div class="col-6">
          <button class="btn btn-primary">${upgrade.name}</button> ${upgrade.cost}  
        </div>
    `
    } else{
      template += `
      <div class="col-6">
        <button class="btn btn-primary">${upgrade.name}</button> ${upgrade.cost}  
      </div>
    </div>
    `
    }
    i++
  })
  store.innerHTML = template
}



//Click and buy functions



// on click
function addResource(){
  pPower()
  player.resource += player.power
  console.log(player.resource)
}

// calculates how much resource on click
function pPower(){
  let i = 0
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

// increments by auto values that the player has 
function autoAdd(){

}


drawStats()
drawInv()
drawStore()