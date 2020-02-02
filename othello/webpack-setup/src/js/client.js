class Othello {
	constructor(lugar_html, state){
		this._state = state;
		this._lugar_html = lugar_html;
	};
	
	get state() { return this._state; };

	set state(state) { this._state = state; };

	get lugar_html() { return this._lugar_html; };

	set lugar_html(lugar_html) { this._lugar_html = lugar_html; };

	render(){
		this.lugar_html.innerHTML = "";
		this.lugar_html.appendChild(this.render_tablero());
	};

	change_turn() {
		this.state.turnOfBlack = !this.state.turnOfBlack;
	};

	change_value(x, y, value) {
		this.state.othello_tablero[x][y] = value;
	};

	render_tablero() {
		const { othello_tablero } = this.state;
		const espacio_juego = document.createElement("div");
		const titulo = document.createElement("h1");
		titulo.innerHTML = "OTHELLO";
		espacio_juego.appendChild(titulo);

		const espacio_tablero = document.createElement("div");

		othello_tablero.map((fila, indexFila) => {
			const espacio_fila = document.createElement("div");
			espacio_fila.style.display = "flex";
			fila.map ((celda, indexCelda) => {
				espacio_fila.appendChild(this.render_celda(indexFila, indexCelda));
			});
			espacio_tablero.appendChild(espacio_fila);
		});

		espacio_juego.appendChild(espacio_tablero);
		return espacio_juego;
	};

	render_celda(fila, celda) {
		const valor = this.state.othello_tablero[fila][celda];
		const espacio_celda = document.createElement("div");
		espacio_celda.style.background = "green";
		espacio_celda.style.height = "50px";
		espacio_celda.style.width = "50px";
		espacio_celda.style.border = "1px solid black";
		espacio_celda.onclick = () => this.colocar_pieza(fila, celda);

		const ficha = document.createElement("div");
		ficha.style.height = "50px";
		ficha.style.width = "50px";
		ficha.style.borderRadius = "100%";

		if ( valor === 0 ) {
			console.log(valor);
		} else if ( valor === 1 ) {
			ficha.style.background = "white";
		} else if ( valor === -1 ) {
			ficha.style.background = "black";
		}

		espacio_celda.appendChild(ficha);
		return espacio_celda;
	};

	colocar_pieza(x, y) {
		const { othello_tablero, turnOfBlack } = this.state;

		if (othello_tablero[x][y] != 0) {
			console.log("Sorry but nope");
		} else {
			// this.change_value(x, y, turnOfBlack ? -1 : 1);
			// if (this.verificar_jugada(x, y, turnOfBlack ? -1 : 1)) {
			// 	this.change_turn();
			// } else {
			// 	this.change_value(x, y, 0);
			// }
			this.verificar_jugada(x, y, turnOfBlack ? -1 : 1);
			this.render();
		};

		// verificar_tablero();
	};

	verificar_jugada(f, c, value) {
		// DEBE ESTAR AL LADO DE UNA DEL OTRO COLOR
		const opuesto = value === 1 ? -1 : 1;
		const lista_flanqueo = [];
		lista_flanqueo.push(this.state.othello_tablero[f-1][c-1] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f-1][c] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f-1][c+1] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f][c-1] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f][c+1] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f+1][c-1] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f+1][c] === opuesto);
		lista_flanqueo.push(this.state.othello_tablero[f+1][c+1] === opuesto);

		if (lista_flanqueo.includes(true)) {
			// TIENE QUE HABER UN DISCO DEL OTRO COLOR 
			// ENTRE ESTA PIEZA Y OTRA DEL MISMO COLOR
			this.state.othello_tablero[f][c] = value;
			this.change_turn();
		};
	};

	verificar_tablero(othello_tablero) {
		//TODO
	};
	
};

// ESTADO INICIAL
const turnOfBlack_initial = true;
const othello_tablero_initial = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, -1, 1, 0, 0, 0],
	[0, 0, 0, 1, -1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

const state_initial = {
	othello_tablero: othello_tablero_initial,
	turnOfBlack: turnOfBlack_initial,
};

const root = document.getElementById('root');
const othello_game = new Othello(root, state_initial);
othello_game.render();






















// const render = (lugar_html, state) => {
// 	lugar_html.innerHTML = "";
// 	lugar_html.appendChild(render_tablero(state));
// 	console.log(state.turnOfBlack);
// };

// const render_tablero = (state) => {
// 	const { othello_tablero } = state;
// 	const espacio_juego = document.createElement("div");
// 	const titulo = document.createElement("h1");
// 	titulo.innerHTML = "OTHELLO";
// 	espacio_juego.appendChild(titulo);

// 	const espacio_tablero = document.createElement("div");

// 	othello_tablero.map((fila, indexFila) => {
// 		const espacio_fila = document.createElement("div");
// 		espacio_fila.style.display = "flex";
// 		fila.map ((celda, indexCelda) => {
// 			espacio_fila.appendChild(render_celda(indexFila, indexCelda, state));
// 		});
// 		espacio_tablero.appendChild(espacio_fila);
// 	});

// 	espacio_juego.appendChild(espacio_tablero);
// 	return espacio_juego;
// };

// const render_celda = (fila, celda, state) => {
// 	const valor = state.othello_tablero[fila][celda];
// 	const espacio_celda = document.createElement("div");
// 	espacio_celda.style.background = "green";
// 	espacio_celda.style.height = "50px";
// 	espacio_celda.style.width = "50px";
// 	espacio_celda.style.border = "1px solid black";
// 	espacio_celda.onclick = () => colocar_pieza(fila, celda, state);

// 	const ficha = document.createElement("div");
// 	ficha.style.height = "50px";
// 	ficha.style.width = "50px";
// 	ficha.style.borderRadius = "100%";

// 	if ( valor === 0 ) {
// 		console.log(valor);
// 	} else if ( valor === 1 ) {
// 		ficha.style.background = "white";
// 	} else if ( valor === -1 ) {
// 		ficha.style.background = "black";
// 	}

// 	espacio_celda.appendChild(ficha);
// 	return espacio_celda;
// };

// const colocar_pieza = (x, y, state) => {
// 	const { othello_tablero, turnOfBlack } = state;

// 	if (othello_tablero[x][y] != 0) {
// 		console.log("Sorry but nope");
// 	} else {
// 		// ------------------------------------------
// 		// ES BUENA PRACTICA CAMBIAR EL ESTADO ASI?
// 		// Preguntar si cuando se pasa el estado entre 
// 		// las funciones es el estado global?
// 		// Y como es la mejor manera de cambiar el estado
// 		// global? Funcion o cambio directo al estado global? 
// 		// ------------------------------------------
		
// 		if (turnOfBlack) {
// 			console.log("Black in ", x, y);
// 			// state.othello_tablero[x][y] = -1;
// 			// state.turnOfBlack = false;
// 		} else {
// 			console.log("White in ", x, y);
// 			// state.othello_tablero[x][y] = 1;
// 			// state.turnOfBlack = true;
// 		}
// 	}

// 	// verificar_tablero();
// };

// const verificar_tablero = (othello_tablero) => {
// 	//TODO
// };

// // ESTADO INICIAL
// const turnOfBlack_global = true;
// const othello_tablero_global = [
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, -1, 1, 0, 0, 0],
// 	[0, 0, 0, 1, -1, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0]
// ];

// const state_global = {
// 	othello_tablero: othello_tablero_global,
// 	turnOfBlack: turnOfBlack_global,
// };

// render(root, state_global);