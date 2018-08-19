var SpeedyGonzalez = {};
SpeedyGonzalez.fpsNormal = 13;
SpeedyGonzalez.fpsFrenzy = 0;
SpeedyGonzalez.frenzy = function() {
  // return frenzy status
  return Game.hasBuff("Frenzy")?true:false;
}

SpeedyGonzalez.bldgFrenzy = function() {
  // return bldg frenzy status
//   for(var bldg = 0; bldg < Game.buffs.length; bldg++) {
//     if (Game.buffs[bldg].type.name=="building buff") return true;
//   }
//   return false;
  Game.buffs.every(function(x) {
    if (Game.buffs[bldg].type.name=="building buff") return true;
    else return false;
  });
}

SpeedyGonzalez.clickFrenzy = function() {
  // return click frenzy status
  return Game.hasBuff("Click frenzy")?true:false;
}

SpeedyGonzalez.dLog = function(msg) {
  if (SpeedyGonzalez.debug) console.log(SpeedyGonzalez.debugPrefix + msg);
}

SpeedyGonzalez.run = function() {
  if(SpeedyGonzalez.frenzy && SpeedyGonzalez.bldgFrenzy && SpeedyGonzalez.clickFrenzy) {
    FrozenCookies.fpsModifier = SpeedyGonzalez.fpsFrenzy;
    SpeedyGonzalez.dLog("Set FPS to Frenzy.(24)");
  } else {
    FrozenCookies.fpsModifier = SpeedyGonzalez.fpsNormal;
    SpeedyGonzalez.dLog("Set FPS to Normal (300).");
  }
}

SpeedyGonzalez.start = function() {
  SpeedyGonzalez.init();
  SpeedyGonzalez.intervalID = setInterval(SpeedyGonzalez.run, 1000 * 1);
  SpeedyGonzalez.dLog("Initialized.");
}

SpeedyGonzalez.stop = function() {
  clearInterval(SpeedyGonzalez.intervalID);
}

SpeedyGonzalez.init = function() {
  SpeedyGonzalez.fpsNormal = 13;
  SpeedyGonzalez.fpsFrenzy = 0;
  SpeedyGonzalez.debug = true;
  SpeedyGonzalez.debugPrefix = "[SpeedyGonzalez] ";
}

SpeedyGonzalez.start();

//default to 300fps
//detect if there is a Building Frenzy + Frenzy/Click Frenzy + Frenzy active
//if so, switch to 24 FPS until duration of Building Frenzy/Click Frenzy
//then switch back to 300