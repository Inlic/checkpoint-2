//data objects and pageload resource
let statTracker = document.getElementById("stat-tracker")
let invTracker = document.getElementById("inventory-tracker")
let store = document.getElementById("store")

let player = {
  auto: 0,
  power: 1,
  inventory: [
    {name: "Gold",
     amount: 0},
    {name: "Torch",
     amount: 0},
    {name: "Pick",
     amount: 0},
    {name: "Mine Cart", 
     amount: 0},
    {name: "Dynamite",
     amount: 0}
  ]
}

let upgrades = [
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
  {name: "Mine Cart",
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

// draw store
function drawStore(){
  let template = ""
  let i = 0
  upgrades.forEach(upgrade =>{
    if(i == (upgrades.length-1)){
    template += `
      <div class="col-6 s-box p-2">
        <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
      </div>
    </div>
    `
    } else if(i == 0 || i % 2 == 0){
      template += `
      <div class ="row text-left">
        <div class="col-6 s-box p-2">
          <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
        </div>
    `
    } else{
      template += `
      <div class="col-6 s-box p-2">
        <button class="btn s-btn mr-3" onclick="buyItem('${upgrade.name}','${upgrade.cost}')">${upgrade.name}</button> Cost: ${upgrade.cost}  
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
  // TODO remove this log on finished product
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
      case "Gold":
        break;
      case "Torch":
      case "Pick":
      case "Mine Cart":
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