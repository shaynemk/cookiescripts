var farm = Game.Objects["Farm"];
var farmM = farm.minigame;
var plantBakerWheat = farmM.plants.bakerWheat;
var plantThumbcorn = farmM.plants.thumbcorn;
var soilFertilizer = farmM.soils["fertilizer"];
var soilClay = farmM.soils["clay"];
var currentTile;
var currentPlant;
var xDEBUG = true;
var needFertilizer = false;

function useClay() {
  farmM.soil = soilClay.id;
  debugLog("Set soil type to clay.");
}

function farmAway() {
  //farmM.tools.harvestAll.func();
  //farmM.soil = soilFertilizer.id;
  //debugLog("Set soil type to fertilizer.");
  if (!plantThumbcorn.unlocked) {
    //plant bakers wheat in correct orientation to get thumbcorn
    //use wood chips if possible (>300)
    farm.seedSelected = plantBakerWheat.id;
    debugLog("Selected Baker's Wheat instead of Thumbcorn, fucking pleb.");
  } else {
    //plant thumbcorn in all plots
    //use fertilizer until fully grown
    //use clay when mature
    farm.seedSelected = plantThumbcorn.id;
  }
  needFertilizer = false;
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++) {
      if (farmM.isTileUnlocked(x,y)) { // check if the tile is unlocked
        currentTile = farmM.getTile(x,y);
        if (currentTile[0] >= 1) { // check if there is something there
          currentPlant = farmM.plantsById[currentTile[0]-1];
          if (currentTile[1] < 90 && currentPlant.id == farm.seedSelected) { // plant is not quite old enough...i think this is out of 100? not sure.
            debugLog("Thumbcorn (" + x + "," + y + ") age is < 90, skipping.");
            continue;
          } else /*if (currentPlant.id != farm.seedSelected)*/ { // plant is old enough and/or not the same seed planted
            farmM.harvest(x,y);
            plant(x,y);
            debugLog("Plot (" + x + ", " + y + ") had " + currentPlant.name + " planted");
          }
        } else plant(x,y); // plot was empty, plant something
      }
    }
  }
  if (needFertilizer) setTimeout(useClay, 1000 * 60 * 9); // 9 minutes = 3 ticks @ 3min/ticks (fertilizer) = thumbcorn maturation
  setInterval(farmAway, 1000 * 60 * 60 * 3); // run farm func again in 3 hours
}

function plant(x,y) {
  farmM.useTool(farm.seedSelected,x,y);
  needFertilizer = true;
  debugLog("Planted " + farmM.plantsById[currentTile[0]-1].name + " in plot (" + x + ", " + y + ").");
}

function debugLog(message) {
  if (xDEBUG) console.log(message);
}

if (!farm.minigameLoaded && !farm.freeze) {
  alert("Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  debugLog("Congrats, you can farm shit now.");
  farmAway();
}

