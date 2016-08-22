
function createCell (cell) {
  var $cell = el('td');
  var $p = el('p');

  $cell.appendChild($p);

  $cell.oncontextmenu = function (e) {
    e.cell = cell;
  }

  $cell.onclick = function (e) {
    e.cell = cell;
  }

  return $cell;
}
