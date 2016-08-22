
start();

window.addEventListener('hashchange', function () {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  start();
});

function start () {
  var hash = location.hash.slice(1).split(',');
  var ROWS = parseInt(hash[0]) || 9;
  var COLS = parseInt(hash[1]) || 9;
  var BOMBS = parseInt(hash[2]) || 10;

  var bombs = generateBombs(ROWS, COLS, BOMBS);
  var grid = generateGrid(ROWS, COLS, bombs);
  var cells = flatten(grid);
  var $game = createGame(grid, cells);

  document.body.appendChild($game);
}

function flatten (grid) {
  var cells = [];

  for (var y = 0; y < grid.length; y++) {
    var row = grid[y];

    for (var x = 0; x < row.length; x++) {
      cells.push(row[x]);
    }
  }

  return cells;
}
