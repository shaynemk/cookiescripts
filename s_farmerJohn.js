var farm = Game.Objects["Farm"];
var farmM = farm.minigame;
var plantBakerWheat = farmM.plants.bakerWheat;
var plantThumbcorn = farmM.plants.thumbcorn;
var mySeed;
var soilFertilizer = farmM.soils["fertilizer"];
var soilClay = farmM.soils["clay"];
var currentTile;
var currentPlant;
var xDEBUG = true;
var xDebugPrefix = "[Farmer John] ";
var needFertilizer = false;
var numMature;
var numMajority = 5;

function farmAway() {
  if (!plantThumbcorn.unlocked) {
    mySeed = plantBakerWheat;
    debugLog("Selected Baker's Wheat instead of Thumbcorn, fucking pleb.");
  } else mySeed = plantThumbcorn;
  farm.seedSelected = mySeed.id;
  needFertilizer = false;
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++) {
      if (farmM.isTileUnlocked(x,y)) { // check if the tile is unlocked
        currentTile = farmM.getTile(x,y);
        if (currentTile[0] >= 1) { // is something there
          currentPlant = farmM.plantsById[currentTile[0]-1];
          if (currentTile[1] < 95 && currentPlant.id == farm.seedSelected) { // plant is too young...i think this is out of 100? not sure.
            debugLog(currentPlant.name + " in (" + x + "," + y + ") age is < 95, skipping.");
            continue;
          } else {
            harvest(x,y);
            plant(x,y);
          }
          if (currentTile[1] >= 19) numMature = numMature + 1; // how many plants are nearly mature
        } else plant(x,y); // plot was empty, plant something
      }
    }
  }
  if (needFertilizer) useFertilizer();
  if (numMature >= numMajority) useClay();
  debugLog("Done farming for now.");
}

function plant(x,y) {
  farmM.useTool(farm.seedSelected,x,y);
  needFertilizer = true;
  debugLog("Planted " + mySeed.name + " in plot (" + x + ", " + y + ").");
}

function harvest(x,y) {
  debugLog("Harvested " + currentPlant.name + " in plot (" + x + ", " + y + ").");
  farmM.harvest(x,y);
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
  Game.Note(xDebugPrefix,"Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  debugLog("Congrats, you can farm shit now.");
  farmAway();
  setInterval(farmAway, 1000 * 60 * 3); // run every 5 minutes
}
