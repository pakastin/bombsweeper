
function createCell (cell) {
  var $cell = document.createElement('td');
  var $p = document.createElement('p');

  $cell.appendChild($p);

  $cell.oncontextmenu = function (e) {
    e.cell = cell;
  }

  $cell.onclick = function (e) {
    e.cell = cell;
  }

  return $cell;
}
