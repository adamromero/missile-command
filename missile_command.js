const missileCommand = (() => {

	let canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		cities = [], timer, x = 0, y = 0,
		playerMissile = [];

	const CANVAS_WIDTH = canvas.width,
		  CANVAS_HEIGHT = canvas.height;

	function City(x, y) {
		this.x = x;
		this.y = y;
		this.active = true;

		const draw = () => {
			let x = this.x,
        		y = this.y;

		    ctx.fillStyle = 'cyan';
		    ctx.beginPath();
		    ctx.moveTo( x, y );
		    ctx.lineTo( x, y - 10 );
		    ctx.lineTo( x + 10, y - 10 );
		    ctx.lineTo( x + 15, y - 15 );
		    ctx.lineTo( x + 20, y - 10 );
		    ctx.lineTo( x + 30, y - 10 );
			ctx.lineTo( x + 30, y );
			ctx.closePath();
		    ctx.fill();
		}

		return { x, y, draw };
	};

	const Missile = (props) => {  

	};

	const PlayerMissile = () => {

	}

	const fireMissile = (x, y) => {
		console.log('player missile fired: ' + x + ", " + y);
		//playerMissile.push(new PlayerMissile());
	}

	const EnemyMissile = () => {
		
	}

	let drawMessage = () => {
		ctx.fillStyle = "blue";
		ctx.font = "bold 20px arial";
		ctx.fillText("CLICK TO START", 315, 180);
		ctx.fillStyle = "red";
		ctx.fillText( 'DEFEND', 285, 355 );
		ctx.fillText( 'CITIES', 435, 355 );
	}

	const renderCities = () => {
		cities.forEach(function(city) {
			city.draw();
		})
	}

	const renderGameState = () => {
		renderCities();
		/*
		renderBackground();
		
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
		console.log("missile command init");
		drawMessage();
	};

	const startLoop = () => {
		console.log('enemy missile fired');
		let fps = 20;
		timer = setInterval(nextFrame, 1000 / fps);
	}

	const initEventListeners = () => {
		canvas.addEventListener("click", function() {
			startLoop();
			
			canvas.addEventListener("click", function(e) {
				fireMissile(e.pageX, e.pageY);
			})
		});
	}

	return {
		init, initEventListeners
	}

})();

missileCommand.init();
missileCommand.initEventListeners();