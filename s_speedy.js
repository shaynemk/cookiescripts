var Speedy = {};

Speedy.frenzy = function() {
  // return frenzy status
  return Game.hasBuff("Frenzy")?true:false;
}

Speedy.bldgFrenzy = function() {
  // return bldg frenzy status
//   for(var bldg = 0; bldg < Game.buffs.length; bldg++) {
//     if (Game.buffs[bldg].type.name=="building buff") return true;
//   }
//   return false;
  var bldgExists = false;
  Game.buffs.every(function(x) {
    if (Game.buffs[bldg].type.name=="building buff") bldgExists = true;
  });
  //bldgExists = Game.buffs.some(bldg => bldg.type.name == "building buff");
  return bldgExists;
} //why wont anything work!?

Speedy.clickFrenzy = function() {
  // return click frenzy status
  return Game.hasBuff("Click frenzy")?true:false;
}

Speedy.dLog = function(msg) {
  if (Speedy.debug) console.log(Speedy.debugPrefix + msg);
}

Speedy.run = function() {
  if(Speedy.frenzy() /*&& Speedy.bldgFrenzy() && Speedy.clickFrenzy()*/) {
    FrozenCookies.fpsModifier = Speedy.fpsFrenzy;
    Speedy.dLog("Set FPS to Frenzy (24).");
  } else {
    FrozenCookies.fpsModifier = Speedy.fpsNormal;
    Speedy.dLog("Set FPS to Normal (300).");
  }
}

Speedy.start = function() {
  if (Speedy.debug == "undefined") Speedy.init();
  Speedy.intervalID = setInterval(Speedy.run, 1000 * 5);
  Speedy.dLog("Initialized.");
}

Speedy.stop = function() {
  clearInterval(Speedy.intervalID);
}

Speedy.init = function() {
  Speedy.fpsNormal = 13;
  Speedy.fpsFrenzy = 0;
  Speedy.debug = true;
  Speedy.debugPrefix = "[Speedy] ";
}

Speedy.start();

//default to 300fps
//detect if there is a Building Frenzy + Frenzy/Click Frenzy + Frenzy active
//if so, switch to 24 FPS until duration of Building Frenzy/Click Frenzy
//then switch back to 300