var autoClicker = function(clicksAtOnce, repeatInterval) {
    var cheated = false;
    var intoTheAbyss = function() {
        if(!cheated) {
            cheated = true;
            for(var i = 0; i < clicksAtOnce; i++) {
                Game.ClickCookie();
                Game.lastClick = 0;
            }
            cheated = false;
        };
    };
    return setInterval(intoTheAbyss, repeatInterval);
};
autoClicker(100, 4);
