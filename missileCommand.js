const missileCommand = (() => {

	let canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		cities = [], timer, x = 0, y = 0,
		playerMissiles = [],
		enemyMissiles = [];

	const CANVAS_WIDTH = canvas.width,
		  CANVAS_HEIGHT = canvas.height;

	//city
	function City(x, y) {
		this.x = x;
		this.y = y;
		this.destroyed = false;

		this.draw = () => {
			let x = this.x,
        		y = this.y;

		    ctx.fillStyle = 'cyan';
		    ctx.beginPath();
		    ctx.moveTo(x, y);
		    ctx.lineTo(x, y - 10);
		    ctx.lineTo(x + 10, y - 10);
		    ctx.lineTo(x + 15, y - 15);
		    ctx.lineTo(x + 20, y - 10);
		    ctx.lineTo(x + 30, y - 10);
			ctx.lineTo(x + 30, y);
			ctx.closePath();
		    ctx.fill();
		}
	};

	//player missile
	function PlayerMissile(x, y) {
		this.x = x;
		this.y = y;
		this.dx = 400;
		this.dy = 570;

		this.fireMissile = (x, y) => {
			console.log('player missile fired: ' + x + ", " + y);
			//playerMissile.pop();
			//playerMissiles.pop();
		}

		this.draw = () => {
			ctx.strokeStyle = "blue";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.dx, this.dy);
			ctx.stroke();
			ctx.fillStyle = "white";
			ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
		}
	}

	//enemy missile 
	function EnemyMissile(x, y) {
		this.x = x;
		this.y = y;
		this.dx = x;
		this.dy = y;

		this.draw = () => {
			ctx.strokeStyle = "red";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.dx, this.dy);
			ctx.stroke();
			ctx.fillStyle = "white";
			ctx.fillRect(this.dx, this.dy, 2, 2);
			this.dx += 1;
			this.dy += 1;
		}
	}

	const fireMissile = (x, y) => {
		console.log(x + " " + y);
		playerMissiles.push(new PlayerMissile(x, y));
	}

	const renderPlayerMissiles = () => {
		playerMissiles.forEach(missile => missile.draw());
	}

	const renderEnemyMissiles = () => {
		enemyMissiles.forEach(missile => missile.draw());
	}

	let drawMessage = () => {
		ctx.fillStyle = "blue";
		ctx.font = "bold 20px arial";
		ctx.fillText("HIT SPACEBAR TO START", 280, 180);
		ctx.fillStyle = "red";
		ctx.fillText('DEFEND', 285, 355);
		ctx.fillText('CITIES', 435, 355);
	}

	const renderCities = () => {
		cities.forEach(city => city.draw());
	}

	const renderBackground = () => {
		ctx.fillStyle = "yellow";
		ctx.beginPath();
        ctx.lineTo(0, 580);
    	ctx.lineTo(CANVAS_WIDTH, 580);
    	ctx.lineTo(CANVAS_WIDTH, 650);
    	ctx.lineTo(0, 650);
    	ctx.lineTo(0, 580);
		ctx.closePath();
		ctx.fill();
	}

	const renderGameState = () => {
		renderBackground();
		renderCities();
		renderPlayerMissiles();
		renderEnemyMissiles();
		/*
		renderAntiMissiles();
		renderScore();
		*/

	}

	const nextFrame = () => {
		/*
		ctx.strokeStyle = '#ff0000';
		ctx.beginPath();
		ctx.moveTo( 0 + x, 0 + y );
		ctx.lineTo( 102 + x, 102.5 + y  );
		//ctx.lineTo( 200 + x, 202 + y );
		ctx.stroke();
		x += 1;
		y += 1;
		*/
		renderGameState();
	}

	const init = () => {
		cities.push(new City(180, 580));
		cities.push(new City(380, 580));
		cities.push(new City(580, 580));

		enemyMissiles.push(new EnemyMissile(60, 0));
		enemyMissiles.push(new EnemyMissile(500, 0));
		enemyMissiles.push(new EnemyMissile(80, 0));
		enemyMissiles.push(new EnemyMissile(200, 0));


		console.log("missile command init");
		drawMessage();
	};

	const startLoop = () => {
		console.log('enemy missile fired');
		let fps = 20;
		timer = setInterval(nextFrame, 1000 / fps);
	}

	const initEventListeners = () => {
		document.addEventListener("keydown", function(e) {
			if (e.key === ' ') {
				startLoop();
			}
			
			canvas.addEventListener("click", function(e) {
				console.log(e)
				console.log(this.offsetLeft);
				fireMissile(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			})
		}, { once: true });
	}

	return {
		init, initEventListeners
	}

})();

missileCommand.init();
missileCommand.initEventListeners();