var farm = Game.Objects["Farm"];
var farmM = farm.minigame;
var plantBakerWheat = farmM.plants.bakerWheat;
var plantThumbcorn = farmM.plants.thumbcorn;
var soilFertilizer = farmM.soils["fertilizer"];
var soilClay = farmM.soils["clay"];
var currentTile;
var currentPlant;

function useClay() {
  farmM.soil = soilClay.id;
  console.log("Set soil type to clay.");
}

function farmAway() {
  farmM.tools.harvestAll.func();
  farmM.soil = soilFertilizer.id;
  console.log("Set soil type to fertilizer.");
  if (!plantThumbcorn.unlocked) {
    //plant bakers wheat in correct orientation to get thumbcorn
    //use wood chips if possible (>300)
    farm.seedSelected = plantBakerWheat.id;
    console.log("Selected Baker's Wheat instead of Thumbcorn, fucking pleb.");
  } else {
    //plant thumbcorn in all plots
    //use fertilizer until fully grown
    //use clay when mature
    farm.seedSelected = plantThumbcorn.id;
  }
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++) {
      //check if plot is unlocked
      if (farmM.isTileUnlocked(x,y)) { // check if the tile is unlocked
        currentTile = farmM.getTile(x,y);
        if (currentTile[0] >= 1) { // check if there is something there
          if (farmM.getTile(2,2)[1] < 90) {
            setTimeout(farmAway, 1000 * 60 * 1);
            console.log("Thumbcorn at 2,2 age is < 90, waiting 1 minute.");
          }
          currentPlant = farmM.plantsById[currentTile[0]-1];
          console.log("Plot (" + x + ", " + y + ") has " + currentPlant.name + " planted.");
       } else {
          console.log("Planted " + farmM.plantsById[farm.seedSelected].name + " in plot (" + x + ", " + y + ").");
          farmM.useTool(farm.seedSelected,x,y);
        }
      }
    }
  }
  setTimeout(useClay, 1000 * 60 * 9); // 9 minutes = 3 ticks @ 3min/ticks (fertilizer) = thumbcorn maturation
}

if (!farm.minigameLoaded && !farm.freeze) {
  alert("Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  console.log("Congrats, you can farm shit now.");
  farmAway();
  setInterval(farmAway, 1000 * 60 * 60 * 3);
}

