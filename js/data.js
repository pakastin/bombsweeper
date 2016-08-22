
function generateBombs (ROWS, COLS, BOMBS) {
  var bombs = new Array(ROWS * COLS);
  var grid = new Array(ROWS);

  for (var i = 0; i < bombs.length; i++) {
    if (i < BOMBS) {
      bombs[i] = 1;
    } else {
      bombs[i] = 0;
    }
  }

  randomize(bombs);

  return bombs;
}

function generateGrid (ROWS, COLS, bombs) {
  var grid = new Array(ROWS);
  var cells = [];
  var i = 0;

  for (var y = 0; y < grid.length; y++) {
    var row = grid[y] = new Array(COLS);

    for (var x = 0; x < row.length; x++) {
      var isBomb = bombs[y * COLS + x];

      var cell = row[x] = {
        i: i,
        x: x,
        y: y,
        isBomb: isBomb,
        opened: false,
        flagged: false,
        neighbours: null,
        nearbyBombs: 0,

        flag: function () {
          if (this.opened || this.exploded) {
            return;
          }
          this.flagged = !this.flagged;
        },

        open: function () {
          if (this.opened || this.exploded) {
            return;
          }
          if (this.isBomb) {
            this.flagged = false;
            this.exploded = true;
            explodeAll();
          } else {
            this.opened = true;

            if (!this.nearbyBombs) {
              this.neighbours.forEach(function (neighbour) {
                if (!neighbour) {
                  return;
                }
                if (neighbour.exploded || neighbour.opened || neighbour.flagged) {
                  return;
                }
                neighbour.open();
              });
            }
          }
        }
      };

      cells.push(cell);
      i++;
    }
  }

  cells.forEach(function (cell) {
    var x = cell.x;
    var y = cell.y;
    var i = cell.i;

    var neighbours = cell.neighbours = [
      grid[y][x - 1], // left
      grid[y - 1] && grid[y - 1][x - 1], // topleft
      grid[y - 1] && grid[y - 1][x], // top
      grid[y - 1] && grid[y - 1][x + 1], // topright
      grid[y][x + 1], // right
      grid[y + 1] && grid[y + 1][x + 1], // bottomright
      grid[y + 1] && grid[y + 1][x], // bottom
      grid[y + 1] && grid[y + 1][x - 1] // bottomleft
    ];

    cell.nearbyBombs = neighbours.reduce(function (sum, neighbour) {
      if (!neighbour) {
        return sum;
      }
      return sum + neighbour.isBomb;
    }, 0);
  });

  return grid;

  function explodeAll () {
    cells.forEach(function (cell) {
      if (cell.opened || cell.exploded) {
        return;
      }
      if (cell.isBomb) {
        cell.exploded = true;
      }
    });
  }
}

function randomize (array) {
  var rnd, temp

  for (var i = array.length - 1; i; i--) {
    rnd = Math.random() * i | 0
    temp = array[i]
    array[i] = array[rnd]
    array[rnd] = temp
  }

  return array
}
