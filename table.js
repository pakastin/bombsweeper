
function createTable (grid) {
  var $table = document.createElement('table');

  for (var y = 0; y < grid.length; y++) {
    row = grid[y];
    $row = document.createElement('tr');

    for (var x = 0; x < row.length; x++) {
      var cell = grid[y][x];
      var $cell = createCell(cell);

      $row.appendChild($cell);
    }
    $table.appendChild($row);
  }

  return $table;
}
