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

		this.check_options();

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
		espacio_celda.style.display = "flex";
		espacio_celda.style.justifyContent = "center";
		espacio_celda.style.alignItems = "center";

		const ficha = document.createElement("div");
		ficha.style.height = "50px";
		ficha.style.width = "50px";
		ficha.style.borderRadius = "100%";

		if ( valor === "X" ) {
			ficha.style.background = "red";
			ficha.style.height = "10px";
			ficha.style.width = "10px";
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
		const value = turnOfBlack ? -1 : 1;

		if (othello_tablero[x][y] != "X") {
			console.log("Sorry but no");
		} else {
			this.change_value(x, y, value);
			this.change_turn();
			this.clean_recommendations();
			this.render();
		};
	};

	clean_recommendations() {
		this.state.othello_tablero.map((fila, ind_fila) => {
			fila.map((celda, ind_celda) => {
				if (this.state.othello_tablero[ind_fila][ind_celda] === "X") {
					this.change_value(ind_fila, ind_celda, 0);
				};
			});
		});
	};

	check_options() {
		const { othello_tablero, turnOfBlack } = this.state;
		const value = turnOfBlack ? -1 : 1;
		this.state.othello_tablero.map((fila, ind_fila) => {
			fila.map((celda, ind_celda) => {
				if (this.celda_is_next_to_opposite(ind_fila, ind_celda, value)) {
					// check_for_horizontal_path_between({ind_fila, ind_celda, f, c});
					if (this.state.othello_tablero[ind_fila][ind_celda] === 0) {
						this.change_value(ind_fila, ind_celda, "X");
					};
				};
			});
		});
	};

	celda_is_next_to_opposite(x, y, value) {
		const opuesto = value === 1 ? -1 : 1;
		const lista_flanqueo = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i == 0 && j == 0) {
					continue;
				} else {
					if (this.state.othello_tablero[x+i] == undefined) {
						lista_flanqueo.push(false);
					} else {
						lista_flanqueo.push(this.state.othello_tablero[x+i][y+j] === opuesto);
					};
				};
			};
		};

		return lista_flanqueo.includes(true);
	};

	// verificar_jugada(f, c, value) {
	// 	// DEBE ESTAR AL LADO DE UNA DEL OTRO COLOR
	// 	const opuesto = value === 1 ? -1 : 1;
	// 	const lista_flanqueo = [];

	// 	for (let i = -1; i <= 1; i++) {
	// 		for (let j = -1; j <= 1; j++) {
	// 			if (i == 0 && j == 0) {
	// 				continue;
	// 			} else {
	// 				if (this.state.othello_tablero[f+i] == undefined) {
	// 					lista_flanqueo.push(false);
	// 				} else {
	// 					lista_flanqueo.push(this.state.othello_tablero[f+i][c+j] === opuesto);
	// 				};
	// 			};
	// 		};
	// 	};

	// 	if (lista_flanqueo.includes(true)) {
	// 		// TIENE QUE HABER UN DISCO DEL OTRO COLOR 
	// 		// ENTRE ESTA PIEZA Y OTRA DEL MISMO COLOR

	// 		// this.state.othello_tablero.map((fila, ind_fila) => {
	// 		// 	fila.map((celda, ind_celda) => {
	// 		// 		if (celda === value) {
	// 		// 			// check_for_horizontal_path_between({ind_fila, ind_celda, f, c});
	// 		// 			continue;
	// 		// 		}
	// 		// 	});
	// 		// });

	// 		this.state.othello_tablero[f][c] = value;
	// 		this.change_turn();
	// 	};
	// };
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
