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

	change_turn() { this.state.turnOfBlack = !this.state.turnOfBlack; };

	change_value(x, y, value) { this.state.othello_tablero[x][y] = value; };

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
			fila.map ( (celda, indexCelda) => espacio_fila.appendChild( this.render_celda(indexFila, indexCelda) ) );
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
			this.clean_recommendations();
			this.cambiar_fichas(x, y);
			this.change_turn();
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
				if (this.celda_is_next_to_opposite(ind_fila, ind_celda, value) && this.state.othello_tablero[ind_fila][ind_celda] === 0) {
					if (this.check_horizontal(ind_fila, ind_celda, value)
							|| this.check_vertical(ind_fila, ind_celda, value)
							|| this.check_diagonal(ind_fila, ind_celda, value)
							// || this.check_diagonal_inversa(ind_fila, ind_celda, value)
						) {
						this.change_value(ind_fila, ind_celda, "X");
					};
				};
			});
		});
	};

	check_horizontal(x, y, value) {
		const { othello_tablero, turnOfBlack } = this.state;
		if (othello_tablero[x].includes(value)) { return this.check_jugada(y, othello_tablero[x]); }
		return false;
	};

	check_vertical(x, y, value) {
		const { othello_tablero, turnOfBlack } = this.state;
		const tablero_traspuesta = crear_traspuesta(othello_tablero);
		if (tablero_traspuesta[y].includes(value)) { return this.check_jugada(x, tablero_traspuesta[y]); }
		return false;
	};

	check_diagonal(x, y, value) {
		const diagonal = this.get_diagonal(x, y);
		const diagonal_inversa = this.get_diagonal_inversa(x, y);
		if (diagonal.includes(value) || diagonal_inversa.includes(value)) {
			return this.check_jugada(y, diagonal) || this.check_jugada(y, diagonal_inversa);
		}
		return false;
	};

	// check_diagonal_inversa(x, y, value) {
	// 	const diagonal_inversa = this.get_diagonal_inversa(x, y);
	// 	if (diagonal_inversa.includes(value)) {
	// 		return this.check_jugada(y, diagonal_inversa);
	// 	}
	// 	return false;
	// };

	get_diagonal(x, y) {
		const { othello_tablero, turnOfBlack } = this.state;
		const y_length = othello_tablero.length;
		const x_length = othello_tablero[0].length;
		const maxLength = Math.max(x_length, y_length);
		let temp;
		let cont = 0;
		for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
			temp = [];
			for (let y = y_length - 1; y >= 0; --y) {
				let x = k - y;
				if (x >= 0 && x < x_length) { temp.push(othello_tablero[y][x]); }
			}

			if (x + y == cont) { return temp; }
			cont += 1;
		}
	};

	get_diagonal_inversa(x, y) {
		const { othello_tablero, turnOfBlack } = this.state;
		const y_length = othello_tablero.length;
		const x_length = othello_tablero[0].length;
		const maxLength = Math.max(x_length, y_length);
		let temp;
		let cont = 0;
		for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
			temp = [];
			for (let y = y_length - 1; y >= 0; --y) {
				let x = k - (y_length - y);
				if (x >= 0 && x < x_length) { temp.push(othello_tablero[y][x]); }
			}

			if (othello_tablero.length - x + y == cont) { return temp.reverse(); }
			cont += 1;
		}
	};

	check_jugada(pos, arr) {
		const { othello_tablero, turnOfBlack } = this.state;
		const value = turnOfBlack ? -1 : 1;
		const opuesto = turnOfBlack ? 1 : -1;
		const pos_init = pos;

		while (true) {
			if (arr[pos + 1] == value) {
				if (pos_init == pos) { return false; }
				return true;
			} else if (arr[pos + 1] == opuesto) {
				pos += 1;
			} else { break; }
		}

		while (true) {
			if (arr[pos - 1] == value) {
				if (pos_init == pos) { return false; }
				return true;
			} else if (arr[pos - 1] == opuesto) {
				pos -= 1;
			} else { return false; }
		}
	}

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

	cambiar_fichas(x, y) {
		const { othello_tablero, turnOfBlack } = this.state;
		const value = turnOfBlack ? -1 : 1;
		const opuesto = turnOfBlack ? 1 : -1;
		this.actualizar_jugada(x, y, othello_tablero[x]);
		const tablero_traspuesta = crear_traspuesta(othello_tablero);
		this.actualizar_jugada(y, x, tablero_traspuesta[y], false);
		
		const diagonal = this.get_diagonal(x, y);
		// const diagonal_inversa = this.get_diagonal_inversa(x, y);
		this.actualizar_jugada_diagonal(x, y, diagonal);
		// this.actualizar_jugada(x, y, diagonal_inversa);
	}

	actualizar_jugada(fila, pos, arr, ort = true) {
		const { othello_tablero, turnOfBlack } = this.state;
		const value = turnOfBlack ? -1 : 1;
		const opuesto = turnOfBlack ? 1 : -1;

		while (true) {
			if (arr[pos + 1] == value) {
				break;
			} else if (arr[pos + 1] == opuesto) {
				pos += 1;
				ort ? this.change_value(fila, pos, value) : this.change_value(pos, fila, value);
			} else { break; }
		}

		while (true) {
			if (arr[pos - 1] == value) {
				break;
			} else if (arr[pos - 1] == opuesto) {
				pos -= 1;
				ort ? this.change_value(fila, pos, value) : this.change_value(pos, fila, value);
			} else { break; }
		}
	};

	actualizar_jugada_diagonal(fila, pos, arr, ort = true) {
		const { othello_tablero, turnOfBlack } = this.state;
		const value = turnOfBlack ? -1 : 1;
		const opuesto = turnOfBlack ? 1 : -1;

		console.log(arr);
		console.log(fila, pos);

		while (true) {
			if (arr[pos + 1] == value) {
				break;
			} else if (arr[pos + 1] == opuesto) {
				console.log("HOLA");
				pos += 1;
				ort ? this.change_value(fila+1, pos, value) : this.change_value(pos, fila+1, value);
			} else { break; }
		}

		while (true) {
			if (arr[pos - 1] == value) {
				break;
			} else if (arr[pos - 1] == opuesto) {
				// REVISAR QUE TERMINE EN EL VALOR CORRECTO
				console.log("HOLA 2");
				console.log(arr.slice(0, pos).reverse());
				pos -= 1;
				ort ? this.change_value(fila+1, pos, value) : this.change_value(pos, fila+1, value);
			} else { break; }
		}
	};
};


// OTRAS FUNCIONES
const crearMatrizVacia = (m, n) => {
	const matriz = [];
	for (let i = 0; i < m; i++) {
		const fila = [];
		for (let j = 0; j < n; j++) {
			fila.push(0);
		}
		matriz.push(fila);
	}
	return matriz;
};

const crear_traspuesta = (matriz) => {
	const cantFilas = matriz.length;
	const cantColumnas = matriz[0].length;
	const traspuesta = crearMatrizVacia(cantColumnas, cantFilas);
	
	for (let f = 0; f < cantFilas; f++) {
		for (let c = 0; c < cantColumnas; c++) {
			traspuesta[c][f] = matriz[f][c];
		}
	}
	return traspuesta;
};

// ESTADO INICIAL
const turnOfBlack_initial = true;
const othello_tablero_initial = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, -1, 0, 0, 0],
	[0, 0, 0, -1, 1, 0, 0, 0],
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
