var pantheon = Game.Objects["Temple"].minigame;
var godMazok = Game.Objects["Temple"].minigame.gods["ruin"];
var godMuridal = Game.Objects["Temple"].minigame.gods["labor"];

// check for chocolate egg
if (!Game.Upgrades["Chocolate egg"].unlocked) {
  Game.Note("Auto Ascension Error", "No chocolate egg available!!! Aborting.");
  break fin;
}

// disable FC && godzamok scripts
FrozenCookies.autoBuy = 0;
stopTheFire();

// sell everything
for (var x = 0; x < Game.ObjectsById.length; x++) {
  Game.ObjectsById[x].sell(Game.ObjectsById[x].amount);
}

// buy chocolate egg


// ascend and return


// enable FC & Godzamok scripts
FrozenCookies.autoBuy = 1;
startTheFire();

// set the gods in pantheon
pantheon.slot[0]=godMazok.id;
pantheon.slot[1]=godMuridal.id;

fin:
