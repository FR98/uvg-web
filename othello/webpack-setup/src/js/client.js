import flatten from 'lodash/flatten';

const render = (mount, state) => {
	mount.innerHTML = "";
	mount.appendChild(render_titulo());
	mount.appendChild(render_instruccion());
	mount.appendChild(render_tablero());
	// rendertablero();
	// const rendertablero = () => console.log('hola');

	function render_titulo() {
		const titulo = document.createElement("h1");
		titulo.innerHTML = "OTHELLO";
		return titulo;
	};

	function render_instruccion() {
		const instruc = document.createElement("h2");
		instruc.innerHTML = state.turnOfBlack ? "Turno de piezas negras" : "Turno de piezas blancas";
		return instruc;
	};

	function render_tablero() {
		const espacio_tablero = document.createElement("div");
		espacio_tablero.style.width = '425px';
		espacio_tablero.style.display = 'flex';
		espacio_tablero.style.flexWrap = 'wrap';
	
		check_options();

		flatten(state.othello_tablero.map(
			(fila, indexFila) => 
				fila.map (
					(celda, indexCelda) => render_celda(indexFila, indexCelda)
				)
			)
		).forEach(
			celdaDiv => espacio_tablero.appendChild(celdaDiv)
		);
	
		return espacio_tablero;
	};
	
	function render_celda(fila, celda) {
		const valor = state.othello_tablero[fila][celda]
		const espacio_celda = document.createElement("div");
		espacio_celda.style.background = "green";
		espacio_celda.style.height = "50px";
		espacio_celda.style.width = "50px";
		espacio_celda.style.border = "1px solid black";
		espacio_celda.style.borderRadius = "10%";
		espacio_celda.onclick = () => colocar_pieza(fila, celda);
		espacio_celda.style.display = "flex";
		espacio_celda.style.justifyContent = "center";
		espacio_celda.style.alignItems = "center";
		espacio_celda.appendChild(render_ficha(valor));
		return espacio_celda;
	};

	function render_ficha(valor) {
		const ficha = document.createElement("div");
		ficha.style.height = "50px";
		ficha.style.width = "50px";
		ficha.style.borderRadius = "100%";

		switch(valor) {
			case 1: ficha.style.background = "white"; break;
			case -1: ficha.style.background = "black"; break;
			case "X":
				ficha.style.background = "red";
				ficha.style.height = "10px";
				ficha.style.width = "10px";
				break;
			default: break;
		}

		return ficha;
	}
	
	function colocar_pieza(x, y) {
		const value = state.turnOfBlack ? -1 : 1;
	
		if (state.othello_tablero[x][y] != "X") {
			console.log("Sorry but no");
		} else {
			change_value(x, y, value);
			clean_recommendations();
			cambiar_fichas(x, y);
			change_turn();
			render(mount, state);
		};
	};
	
	function change_turn() { state.turnOfBlack = !state.turnOfBlack; }
	
	function change_value (x, y, value) { state.othello_tablero[x][y] = value; }
	
	function clean_recommendations() {
		state.othello_tablero.map( (fila, ind_fila) =>
			fila.map((celda, ind_celda) => {
				if (state.othello_tablero[ind_fila][ind_celda] === "X") {
					change_value(ind_fila, ind_celda, 0);
				};
			})
		);
	};
	
	function check_options() {
		state.othello_tablero.map((fila, ind_fila) =>
			fila.map((celda, ind_celda) => {
				if (celda_is_next_to_opposite(ind_fila, ind_celda) && state.othello_tablero[ind_fila][ind_celda] === 0) {
					if (check_horizontal(ind_fila, ind_celda)
							|| check_vertical(ind_fila, ind_celda)
							|| check_diagonal(ind_fila, ind_celda)
						) {
						change_value(ind_fila, ind_celda, "X");
					};
				};
			})
		);
	};
	
	function celda_is_next_to_opposite (x, y) {
		const opuesto = state.turnOfBlack ? 1 : -1;
		const lista_flanqueo = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i == 0 && j == 0) {
					continue;
				} else {
					if (state.othello_tablero[x+i] == undefined) {
						lista_flanqueo.push(false);
					} else {
						lista_flanqueo.push(state.othello_tablero[x+i][y+j] === opuesto);
					};
				};
			};
		};
	
		return lista_flanqueo.includes(true);
	};
	
	function check_horizontal(x, y) {
		const value = state.turnOfBlack ? -1 : 1;
		if (state.othello_tablero[x].includes(value)) { 
			// console.log("Este> ", check_jugada(y, state.othello_tablero[x]));
			return (check_jugada_arr_positivo(y, state.othello_tablero[x]) || check_jugada_arr_negativo(y, state.othello_tablero[x]));
			// return check_jugada(y, state.othello_tablero[x]);
		}
		return false;
	};
	
	function check_vertical(x, y) {
		const value = state.turnOfBlack ? -1 : 1;
		const tablero_traspuesta = crear_traspuesta(state.othello_tablero);
		if (tablero_traspuesta[y].includes(value)) {
			// console.log("Este> ", check_jugada(x, tablero_traspuesta[y]));
			return (check_jugada_arr_positivo(x, tablero_traspuesta[y]) || check_jugada_arr_negativo(x, tablero_traspuesta[y]));
			// return check_jugada(x, tablero_traspuesta[y]);
		}
		return false;
	};
	
	function check_diagonal(x, y) {
		const value = state.turnOfBlack ? -1 : 1;
		const diagonal = get_diagonal(x, y, true);
		const diagonal_inversa = get_diagonal(x, y, false);
		if (diagonal.includes(value) || diagonal_inversa.includes(value)) {
			// console.log("Este>", (check_jugada(y, diagonal) || check_jugada(y, diagonal_inversa)) == ((check_jugada_arr_positivo(y, diagonal) || check_jugada_arr_negativo(y, diagonal)) || (check_jugada_arr_positivo(y, diagonal_inversa) || check_jugada_arr_negativo(y, diagonal_inversa))));
			// console.log((check_jugada_arr_positivo(y, diagonal) || check_jugada_arr_negativo(y, diagonal)) || (check_jugada_arr_positivo(y, diagonal_inversa) || check_jugada_arr_negativo(y, diagonal_inversa)));
			// return check_jugada(y, diagonal) || check_jugada(y, diagonal_inversa);
			return (check_jugada_arr_positivo(y, diagonal) || check_jugada_arr_negativo(y, diagonal))
				|| (check_jugada_arr_positivo(y, diagonal_inversa) || check_jugada_arr_negativo(y, diagonal_inversa));
		}
		return false;
	};
	
	function get_diagonal(x, y, no_inversa) {
		const y_length = state.othello_tablero.length;
		const x_length = state.othello_tablero[0].length;
		const maxLength = Math.max(x_length, y_length);
		let temp;
		let cont = 0;
		for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
			temp = [];
			for (let y = y_length - 1; y >= 0; --y) {
				let x = no_inversa ? k - y : k - (y_length - y);
				if (x >= 0 && x < x_length) { temp.push(state.othello_tablero[y][x]); }
			}

			const cond = no_inversa ? x + y : state.othello_tablero.length - x + y;	
			if (cond == cont) { return no_inversa ? temp : temp.reverse(); }
			cont += 1;
		}
	};

	function check_jugada_arr_positivo(pos_i, arr) {
		const value = state.turnOfBlack ? -1 : 1;
		const opuesto = state.turnOfBlack ? 1 : -1;
		const pos_init = pos_i;
		let pos = pos_i;
		while (true) {
			if (arr[pos + 1] == value) {
				if (pos_init == pos) { return false; }
				return true;
			} else if (arr[pos + 1] == opuesto) {
				pos += 1;
			} else { return false; }
		}
	};
	
	function check_jugada_arr_negativo(pos_i, arr) {
		const value = state.turnOfBlack ? -1 : 1;
		const opuesto = state.turnOfBlack ? 1 : -1;
		const pos_init = pos_i;
		let pos = pos_i;

		while (true) {
			if (arr[pos - 1] == value) {
				if (pos_init == pos) { return false; }
				return true;
			} else if (arr[pos - 1] == opuesto) {
				pos -= 1;
			} else { return false; }
		}
	};
	
	
	// // -------------------------------------------------------------
	
	function cambiar_fichas(x, y) {
		actualizar_jugada(x, y, state.othello_tablero[x], true);
		const tablero_traspuesta = crear_traspuesta(state.othello_tablero);
		actualizar_jugada(y, x, tablero_traspuesta[y], false);
		const diagonal = get_diagonal(x, y, true);
		const diagonal_inversa = get_diagonal(x, y, false);
		const value = state.turnOfBlack ? -1 : 1;
		console.log(x, y);
		console.log("diagonal");
		actualizar_jugada_diagonal(x, y, diagonal, true);
		console.log("diagonal inversa");
		// actualizar_jugada_diagonal(y, x, diagonal_inversa, false);
		actualizar_jugada_diagonal(x, y, diagonal_inversa, false);
	};
	
	function actualizar_jugada(fila, pos, arr, ort) {
		const value = state.turnOfBlack ? -1 : 1;
		const opuesto = state.turnOfBlack ? 1 : -1;
	
	
		if (check_jugada_arr_positivo(pos, arr)) {
			while (true) {
				if (arr[pos + 1] == value) {
					break;
				} else if (arr[pos + 1] == opuesto) {
					pos += 1;
					ort ? change_value(fila, pos, value) : change_value(pos, fila, value);
				} else { break; }
			}
		}
	
		if (check_jugada_arr_negativo(pos, arr)) {
			while (true) {
				if (arr[pos - 1] == value) {
					break;
				} else if (arr[pos - 1] == opuesto) {
					pos -= 1;
					ort ? change_value(fila, pos, value) : change_value(pos, fila, value);
				} else { break; }
			}
		}
	};
	
	function actualizar_jugada_diagonal(fila, pos_i, arr, ort) {
		const value = state.turnOfBlack ? -1 : 1;
		const opuesto = state.turnOfBlack ? 1 : -1;
		let pos = pos_i;

		console.log(pos, arr);

		if (check_jugada_arr_positivo(pos, arr)) {
			let cont = 0;
			while (true) {
				if (arr[pos + 1] == value) {
					break;
				} else if (arr[pos + 1] == opuesto) {
					pos += 1;
					cont += 1;
					console.log("HOLA1");
					console.log(ort);
					// ort ? change_value(fila-cont, pos, value) : change_value(pos, fila+cont, value);
					ort ? change_value(fila-cont, pos, value) : change_value(pos, fila+cont, value);
				} else { break; }
			}
		}

		pos = pos_i;
	
		if (check_jugada_arr_negativo(pos, arr)) {
			let cont = 0;
			while (true) {
				if (arr[pos - 1] == value) {
					break;
				} else if (arr[pos - 1] == opuesto) {
					pos -= 1;
					cont += 1;
					console.log("HOLA2");
					console.log(ort);
					console.log(pos, cont);
					// ort ? change_value(fila+cont, pos, value) : change_value(pos, fila-cont, value);
					ort ? change_value(fila+cont, pos, value) : change_value(pos, fila-cont, value);
				} else { break; }
			}
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

const root = document.getElementById('root');
const state_initial = {
	othello_tablero: othello_tablero_initial,
	turnOfBlack: turnOfBlack_initial,
};

render(root, state_initial);
