const render = (state) => {
	state.lugar_html.innerHTML = "";
	state.lugar_html.appendChild(render_tablero(state));
};

const render_tablero = (state) => {
	const { othello_tablero } = state;
	const espacio_juego = document.createElement("div");
	const titulo = document.createElement("h1");
	titulo.innerHTML = "OTHELLO";
	espacio_juego.appendChild(titulo);
	const espacio_tablero = document.createElement("div");

	check_options(state);

	othello_tablero.map((fila, indexFila) => {
		const espacio_fila = document.createElement("div");
		espacio_fila.style.display = "flex";
		fila.map ( (celda, indexCelda) => {
			espacio_fila.appendChild(
				render_celda(indexFila, indexCelda, othello_tablero[indexFila][indexCelda], state)
			) 
		});
		espacio_tablero.appendChild(espacio_fila);
	});

	espacio_juego.appendChild(espacio_tablero);
	return espacio_juego;
};

const render_celda = (fila, celda, valor, state) => {
	const espacio_celda = document.createElement("div");
	espacio_celda.style.background = "green";
	espacio_celda.style.height = "50px";
	espacio_celda.style.width = "50px";
	espacio_celda.style.border = "1px solid black";
	espacio_celda.onclick = () => colocar_pieza(fila, celda, state);
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

const colocar_pieza = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;

	if (othello_tablero[x][y] != "X") {
		console.log("Sorry but no");
	} else {
		change_value(x, y, value, state);
		clean_recommendations(state);
		cambiar_fichas(x, y, state);
		change_turn(state);
		render(state);
	};
};

const change_turn = (state) => state.turnOfBlack = !state.turnOfBlack;

const change_value = (x, y, value, state) => state.othello_tablero[x][y] = value;

const clean_recommendations = (state) => {
	state.othello_tablero.map((fila, ind_fila) => {
		fila.map((celda, ind_celda) => {
			if (state.othello_tablero[ind_fila][ind_celda] === "X") {
				change_value(ind_fila, ind_celda, 0, state);
			};
		});
	});
};

const check_options = (state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	othello_tablero.map((fila, ind_fila) => {
		fila.map((celda, ind_celda) => {
			if (celda_is_next_to_opposite(ind_fila, ind_celda, state) && othello_tablero[ind_fila][ind_celda] === 0) {
				if (check_horizontal(ind_fila, ind_celda, state)
						|| check_vertical(ind_fila, ind_celda, state)
						|| check_diagonal(ind_fila, ind_celda, state)
						// || check_diagonal_inversa(ind_fila, ind_celda)
					) {
					change_value(ind_fila, ind_celda, "X", state);
				};
			};
		});
	});
};

const celda_is_next_to_opposite = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const opuesto = turnOfBlack ? 1 : -1;
	const lista_flanqueo = [];
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue;
			} else {
				if (othello_tablero[x+i] == undefined) {
					lista_flanqueo.push(false);
				} else {
					lista_flanqueo.push(othello_tablero[x+i][y+j] === opuesto);
				};
			};
		};
	};

	return lista_flanqueo.includes(true);
};

const check_horizontal = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	if (othello_tablero[x].includes(value)) { return check_jugada(y, othello_tablero[x], state); }
	return false;
};

const check_vertical = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	const tablero_traspuesta = crear_traspuesta(othello_tablero);
	if (tablero_traspuesta[y].includes(value)) { return check_jugada(x, tablero_traspuesta[y], state); }
	return false;
};

const check_diagonal = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	const diagonal = get_diagonal(x, y, state);
	const diagonal_inversa = get_diagonal_inversa(x, y, state);
	if (diagonal.includes(value) || diagonal_inversa.includes(value)) {
		return check_jugada(y, diagonal, state) || check_jugada(y, diagonal_inversa, state);
	}
	return false;
};

const get_diagonal = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
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

const get_diagonal_inversa = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
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

const check_jugada = (pos, arr, state) => {
	const { othello_tablero, turnOfBlack } = state;
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
};


// -------------------------------------------------------------

const cambiar_fichas = (x, y, state) => {
	const { othello_tablero, turnOfBlack } = state;
	actualizar_jugada(x, y, othello_tablero[x], true, state);
	const tablero_traspuesta = crear_traspuesta(othello_tablero);
	actualizar_jugada(y, x, tablero_traspuesta[y], false, state);
	const diagonal = get_diagonal(x, y, state);
	const diagonal_inversa = get_diagonal_inversa(x, y, state);
	actualizar_jugada_diagonal(x, y, diagonal, true, state);
	actualizar_jugada_diagonal(y, x, diagonal_inversa, false, state);
};

const check_jugada_horizontal_positivo = (pos, arr, value, opuesto) => {
	const pos_init = pos;
	while (true) {
		if (arr[pos + 1] == value) {
			if (pos_init == pos) { return false; }
			return true;
		} else if (arr[pos + 1] == opuesto) {
			pos += 1;
		} else { return false; }
	}
};

const check_jugada_horizontal_negativo = (pos, arr, value, opuesto) => {
	const pos_init = pos;
	while (true) {
		if (arr[pos - 1] == value) {
			if (pos_init == pos) { return false; }
			return true;
		} else if (arr[pos - 1] == opuesto) {
			pos -= 1;
		} else { return false; }
	}
};

const actualizar_jugada = (fila, pos, arr, ort, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	const opuesto = turnOfBlack ? 1 : -1;


	if (check_jugada_horizontal_positivo(pos, arr, value, opuesto)) {
		while (true) {
			if (arr[pos + 1] == value) {
				break;
			} else if (arr[pos + 1] == opuesto) {
				pos += 1;
				ort ? change_value(fila, pos, value, state) : change_value(pos, fila, value, state);
			} else { break; }
		}
	}

	if (check_jugada_horizontal_negativo(pos, arr, value, opuesto)) {
		while (true) {
			if (arr[pos - 1] == value) {
				break;
			} else if (arr[pos - 1] == opuesto) {
				pos -= 1;
				ort ? change_value(fila, pos, value, state) : change_value(pos, fila, value, state);
			} else { break; }
		}
	}
};

const actualizar_jugada_diagonal = (fila, pos, arr, ort, state) => {
	const { othello_tablero, turnOfBlack } = state;
	const value = turnOfBlack ? -1 : 1;
	const opuesto = turnOfBlack ? 1 : -1;

	console.log(arr);

	if (check_jugada_horizontal_positivo(pos, arr, value, opuesto)) {
		let cont = 0;
		while (true) {
			if (arr[pos + 1] == value) {
				break;
			} else if (arr[pos + 1] == opuesto) {
				pos += 1;
				cont += 1;
				ort ? change_value(fila+cont, pos, value, state) : change_value(pos, fila+cont, value, state);
			} else { break; }
		}
	}

	if (check_jugada_horizontal_negativo(pos, arr, value, opuesto)) {
		let cont = 0;
		while (true) {
			if (arr[pos - 1] == value) {
				break;
			} else if (arr[pos - 1] == opuesto) {
				pos -= 1;
				cont += 1;
				ort ? change_value(fila+cont, pos, value, state) : change_value(pos, fila+cont, value, state);
			} else { break; }
		}
	}
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
	lugar_html: root,
};

render(state_initial);
