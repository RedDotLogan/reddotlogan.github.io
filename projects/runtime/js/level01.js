var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'enemy',x:800,y:groundY - 50},
                {type: 'enemy',x:1600,y:groundY - 50},
                {type: 'sawblade',x:600,y:groundY - 120},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'sawblade',x:1300,y:groundY - 110},
                {type: 'sawblade',x:1700,y:groundY},
                {type: 'spike',x:1500,y:groundY},
                {type: 'spike',x:2100,y:groundY},
                {type: 'reward',x:1000,y:groundY - 110},
                {type: 'reward',x:13
                00,y:groundY - 90},
                
                
            ]
            
        };
        
        
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
       var createSawBlade = function(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            
            myObstacle.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -25;

            myObstacle.x = x;
            myObstacle.y = y;
            
            game.addGameItem(myObstacle)
        }
        
        var createSpike = function(x,y) {
            var hitZoneSize = 23;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            var obstacleImage = draw.bitmap('img/spikes.png');
            
            myObstacle.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = 0.08;
            obstacleImage.scaleY = 0.1;
        
            myObstacle.x = x;
            myObstacle.y = y;
            
            game.addGameItem(myObstacle)
        }
        
        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy', 35);
            var enemyImage = draw.bitmap('img/spookyghost.png');

            enemy.addChild(enemyImage);

            enemyImage.x = -25;
            enemyImage.y = -100;
            enemyImage.scaleX = 0.4;
            enemyImage.scaleY = 0.4;

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            //makes enemy move toward halle
            enemy.velocityX = -1;

            //makes halle take damage when collides with enemy
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-30);
            };

            enemy.onProjectileCollision = function() {
                game.increaseScore(200);
                enemy.fadeOut();
                enemy.shrink();
            }

        }
        
        function createReward(x, y) {
            var reward = game.createGameItem('reward', 25);
            var rewardImage = draw.bitmap('img/gold.png')
            
            reward.addChild(rewardImage);
            
            rewardImage.x = -50;
            rewardImage.y = -50;
            rewardImage.scaleX = 0.12;
            rewardImage.scaleY = 0.12;
            
            reward.x = x;
            reward.y = y;
            
            game.addGameItem(reward);
            
            //makes reward move towards Halle
            reward.velocityX = -0.9;
            
            //gives halle health 
            reward.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(200);
                reward.shrink();
            };
            
            
        };
        

        //**creates gameitems with the properties from levelData variable above
        
        
        for (var i = 0; i < levelData.gameItems.length + 1; i++) {
            if (levelData.gameItems[i].type === 'sawblade') {
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if (levelData.gameItems[i].type === 'spike') {
                createSpike(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if (levelData.gameItems[i].type === 'enemy') {
                createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if (levelData.gameItems[i].type === 'reward') {
                createReward(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
        }
        
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}