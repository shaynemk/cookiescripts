var fj = {};

fj.init = function() { 
  fj.farm = Game.Objects.Farm;
  fj.farmM = fj.farm.minigame;
  fj.plantBakerWheat = fj.farmM.plants.bakerWheat;
  fj.plantThumbcorn = fj.farmM.plants.thumbcorn;
  fj.soilFertilizer = fj.farmM.soils.fertilizer;
  fj.soilClay = fj.farmM.soils.clay;
  //fj.currentTile;
  //fj.currentPlant;
  fj.xDEBUG = true;
  fj.xDebugPrefix = "[Farmer John] ";
  fj.needFertilizer = false;
  fj.fertilizerID = -1;
  fj.seed = (fj.plantThumbcorn.unlocked?fj.plantThumbcorn:fj.plantBakerWheat);
}

fj.start = function() {
  if (!fj.plantThumbcorn.unlocked) {
    fj.seed = fj.plantBakerWheat;
    fj.debugLog("Selected Baker's Wheat instead of Thumbcorn, fucking pleb.");
  } else fj.seed = fj.plantThumbcorn;
  //fj.farmM.seedSelected = fj.seed.id;
  fj.needFertilizer = false;
  for (x=0;x<6;x++) {
    for (y=0;y<6;y++) {
      if (fj.farmM.isTileUnlocked(x,y)) { // check if the tile is unlocked
        fj.currentTile = fj.farmM.getTile(x,y);
        if (fj.currentTile[0] >= 1) { // is something there
          fj.currentPlant = fj.farmM.plantsById[fj.currentTile[0]-1];
          if (fj.currentTile[1] < 95 && fj.farmM.soil == fj.soilClay.id && fj.currentPlant.id == fj.seed.id) { // plant is too young...i think this is out of 100? not sure.
            fj.debugLog(fj.currentPlant.name + " in (" + x + "," + y + ") has no pending action, skipping.");
            //continue;
          } else if (fj.currentTile[1] >= 20 && fj.farmM.soil == fj.soilFertilizer.id) {
            fj.clearFertilizerT();
            fj.useClay();
          } else {
            fj.farmM.tools.harvestAll.func();
            fj.plantAll();
          }
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
      if (fj.farmM.isTileUnlocked(x,y)) fj.plant(x,y); // because we dont want to actually cheat
    }
  }
}

fj.plant = function(x,y) {
  fj.farmM.useTool(fj.seed.id,x,y);
  fj.needFertilizer = true;
  fj.debugLog("Planted " + fj.seed.name + " in plot (" + x + ", " + y + ").");
}

fj.harvest = function(x,y) {
  fj.debugLog("Harvested " + fj.currentPlant.name + " in plot (" + x + ", " + y + ").");
  fj.farmM.harvest(x,y);
}

fj.clearFertilizerT = function() {
  clearTimeout(fj.fertilizerID);
  fj.fertilizerID = -1;
}

fj.useFertilizer = function() {
  // make sure we dont have any other timers running
  if (fj.fertilizerID != -1) fj.clearFertilizerT();
  fj.farmM.soil = fj.soilFertilizer.id;
  fj.debugLog("Set soil type to fertilizer.");
  fj.fertilizerID = setTimeout(fj.useClay, 1000 * 60 * 9); // 9 minutes = 3 ticks @ 3min/ticks (fertilizer) = thumbcorn maturation
}

fj.useClay = function() {
  fj.farmM.soil = fj.soilClay.id;
  fj.debugLog("Set soil type to clay.");
}

fj.debugLog = function(message) {
  if (fj.xDEBUG) console.log(fj.xDebugPrefix + message);
}

fj.stop = function() {
  clearInterval(fj.intervalID);
}

fj.init();
if (!fj.farm.minigameLoaded && !fj.farm.freeze) {
  Game.Note(fj.xDebugPrefix,"Farming not enabled yet (or frozen), buy/upgrade some farms or unfreeze!");
} else {
  fj.debugLog("Congrats, you can farm shit now.");
  fj.start();
  fj.intervalID = setInterval(fj.start, 1000 * 60 * 1); // run every couple minutes
}