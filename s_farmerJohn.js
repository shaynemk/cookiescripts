var fj = {};
fjFarm = Game.Objects.Farm;
fjFarmM = fjFarm.minigame;

fj.init = function() { 
  fj.plantBakerWheat = fjFarmM.plants.bakerWheat;
  fj.plantThumbcorn = fjFarmM.plants.thumbcorn;
  fj.seed;
  fj.soilFertilizer = fjFarmM.soils.fertilizer;
  fj.soilClay = fjFarmM.soils.clay;
  fj.currentTile;
  fj.currentPlant;
  fj.xDEBUG = true;
  fj.xDebugPrefix = "[Farmer John] ";
  fj.needFertilizer = false;
}

fj.start = function() {
  if (!fj.plantThumbcorn.unlocked) {
    fj.seed = fj.plantBakerWheat;
    fj.debugLog("Selected Baker's Wheat instead of Thumbcorn, fucking pleb.");
  } else fj.seed = fj.plantThumbcorn;
  fjFarmM.seedSelected = fj.seed.id;
  fj.needFertilizer = false;
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++) {
      if (fjFarmM.isTileUnlocked(x,y)) { // check if the tile is unlocked
        fj.currentTile = fjFarmM.getTile(x,y);
        if (fj.currentTile[0] >= 1) { // is something there
          fj.currentPlant = fjFarmM.plantsById[fj.currentTile[0]-1];
          if (fj.currentTile[1] < 95 && fj.currentPlant.id == fjFarmM.seedSelected) { // plant is too young...i think this is out of 100? not sure.
            fj.debugLog(fj.currentPlant.name + " in (" + x + "," + y + ") age is < 95, skipping.");
            continue;
          } else {
            //harvest(x,y);
            //plant(x,y);
            fjFarmM.tools.harvestAll.func();
            fj.plantAll();
          }
          //if (currentTile[1] >= 19) numMature = numMature + 1; // how many plants are nearly mature
        } else fj.plant(x,y); // plot was empty, plant something
      }
    }
  }
  if (fj.needFertilizer) fj.useFertilizer();
  fj.debugLog("Done farming for now.");
}

fj.plantAll = function() {
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++){
      if (fjFarmM.isTileUnlocked(x,y)) fj.plant(x,y); // because we dont want to actually cheat
    }
  }
}

fj.plant = function(x,y) {
  fjFarmM.useTool(fjFarm.seedSelected,x,y);
  fj.needFertilizer = true;
  fj.debugLog("Planted " + fj.seed.name + " in plot (" + x + ", " + y + ").");
}

fj.harvest = function(x,y) {
  fj.debugLog("Harvested " + fj.currentPlant.name + " in plot (" + x + ", " + y + ").");
  fjFarmM.harvest(x,y);
}

fj.useFertilizer = function() {
  fjFarmM.soil = fj.soilFertilizer.id;
  fj.debugLog("Set soil type to fertilizer.");
  setTimeout(fj.useClay, 1000 * 60 * 9); // 9 minutes = 3 ticks @ 3min/ticks (fertilizer) = thumbcorn maturation
}

fj.useClay = function() {
  fjFarmM.soil = fj.soilClay.id;
  fj.debugLog("Set soil type to clay.");
}

fj.debugLog = function(message) {
  if (fj.xDEBUG) console.log(fj.xDebugPrefix + message);
}

fj.stop = function() {
  clearInterval(fj.intervalID);
}

fj.init();
if (!fjFarm.minigameLoaded && !fjFarm.freeze) {
  Game.Note(fj.xDebugPrefix,"Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  fj.debugLog("Congrats, you can farm shit now.");
  fj.start();
  fj.intervalID = setInterval(fj.start, 1000 * 60 * 2); // run every couple minutes
}