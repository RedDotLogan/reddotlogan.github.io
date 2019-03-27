var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var building;
        var buildings = [];
        
        //paints bottom background
        function changeBackground(color) {
            document.body.style.background = '#00345b';
        }
        
        changeBackground();
        

        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            
            var backgroundFill = draw.rect(canvasWidth,groundY,'#004475');
            
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            
            for(var i=0;i<100;i++) {
                
                circle = draw.circle(1,'white','white',0);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 450;
            moon.y = 25;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var buildingHeight = 290;
            
            for (var i=0;i< (canvasWidth / 200);++i) {
                building = draw.bitmap('img/building.png');;
                building.x = 200*i;
                building.y = groundY-buildingHeight - 1;
                background.addChild(building);
                buildings.push(building);

            }
            //*****I changed the color of the buildings to keep it with the theme for now, and also added some more of them ~Madi
            
            
            // TODO 4: Part 1 - Add a tree
            
            tree = draw.bitmap('img/scarytree.png');
            tree.x = 1400;
            tree.scaleX = 0.25;
            tree.scaleY = 0.25;
            tree.y = groundY - 300;
            background.addChild(tree);
            
            //*****I changed the height so it would touch the ground ~Madi

            
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1.5;
            
            if(tree.x < -400) {
                tree.x = canvasWidth;
            }

            
            // TODO 5: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = buildings[i].x - 0.75;
            
                if(buildings[i].x < -75) {
                    buildings[i].x = canvasWidth;
                }
            }
           

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
