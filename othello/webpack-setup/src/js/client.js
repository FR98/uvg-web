const root = document.getElementById('root');

const render = (lugar_html, state) => {
	lugar_html.innerHTML = "";
	lugar_html.appendChild(render_tablero(state));
	console.log(state.turnOfBlack);
};

const render_tablero = (state) => {
	
};

const render_celda = (fila, celda, state) => {
	
};

const colocar_pieza = (x, y, state) => {
	
};

const verificar_tablero = (othello_tablero) => {
	
};

// ESTADO INICIAL
const turnOfBlack_global = true;
const othello_tablero_global = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, -1, 1, 0, 0, 0],
	[0, 0, 0, 1, -1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

const state_global = {
	othello_tablero: othello_tablero_global,
	turnOfBlack: turnOfBlack_global,
};

render(root, state_global);