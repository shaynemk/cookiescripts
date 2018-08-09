var farm = Game.Objects["Farm"];
var farmM = farm.minigame;
var plantBakerWheat = farmM.plants.bakerWheat;
var plantThumbcorn = farmM.plants.thumbcorn;
var soilFertilizer = farmM.soils["fertilizer"];
var soilClay = farmM.soils["clay"];
var currentTile;
var currentPlant;
var xDEBUG = true;
var xDebugPrefix = "[Farmer John Says:] ";
var needFertilizer = false;

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
          if (currentTile[1] < 95 && currentPlant.id == farm.seedSelected) { // plant is not quite old enough...i think this is out of 100? not sure.
            debugLog("Thumbcorn (" + x + "," + y + ") age is < 95, skipping.");
            continue;
          } else if (currentTile[1] >= 95 || currentTile[1] == 0) { // if the plant is old or plot empty harvest all and reset to plant all
            farmM.tools.harvestAll.func();
            x=0;
            y=0;
            plant(x,y);
          } else /*if (currentPlant.id != farm.seedSelected)*/ { // plant is old enough and/or not the same seed planted
            //farmM.harvest(x,y);
            plant(x,y);
            debugLog("Plot (" + x + ", " + y + ") had " + currentPlant.name + " planted");
          }
        } else plant(x,y); // plot was empty, plant something
      }
    }
  }
  if (needFertilizer) useFertilizer();
  setInterval(farmAway, 1000 * 60 * 60 * 3); // run farm func again in 3 hours
}

function plant(x,y) {
  farmM.useTool(farm.seedSelected,x,y);
  needFertilizer = true;
  //debugLog("Planted " + farmM.plantsById[currentTile[0]-1].name + " in plot (" + x + ", " + y + ").");
}

function useFertilizer() {
  farmM.soil = soilFertilizer.id;
  debugLog("Set soil type to fertilizer.");
  setTimeout(useClay, 1000 * 60 * 9); // 9 minutes = 3 ticks @ 3min/ticks (fertilizer) = thumbcorn maturation
}

function useClay() {
  farmM.soil = soilClay.id;
  debugLog("Set soil type to clay.");
}

function debugLog(message) {
  if (xDEBUG) console.log(xDebugPrefix + message);
}

if (!farm.minigameLoaded && !farm.freeze) {
  Game.Note("Farmer John","Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  debugLog("Congrats, you can farm shit now.");
  farmAway();
}

