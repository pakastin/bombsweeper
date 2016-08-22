
function createGame (grid, cells) {
  var $game = el('div', { class: 'game' });
  var $container = el('div', { class: 'container' });
  var $score = el('p', { class: 'score' });
  var $scoreleft = el('span', { style: { float: 'left' } });
  var $scoreright = el('span', { style: { float: 'right' } });
  var $newgame = el('div', { class: 'newgame' });
  var $levels = el('span');
  var $table = createTable(grid);
  var $cells = $table.querySelectorAll('td');
  var $ps = $table.querySelectorAll('td > p');

  $newgame.innerHTML = '<a href="#">💣</a><a href="#15,15,40">💣💣</a><a href="#25,25,100">💣💣💣</a>';

  $score.appendChild($scoreleft);
  $score.appendChild($scoreright);

  $game.appendChild($score);
  $game.appendChild($container);
  $game.appendChild($newgame);

  $container.appendChild($table);

  $game.oncontextmenu = function (e) {
    var cell = e.cell;

    if (!cell) {
      return;
    }
    e.preventDefault();

    cell.flag();
    update();
  }

  $game.onclick = function (e) {
    var cell = e.cell;

    if (!cell) {
      return;
    }

    cell.open();
    update();
  }

  update();

  return $game;

  function update () {
    var win = false;
    var gameover = false;
    var points = 0;
    var bombs = 0;
    var openable = 0;

    cells.forEach(function (cell) {
      var i = cell.i;
      var $cell = $cells[i];
      var $p = $ps[i];

      if (cell.exploded) {
        gameover = true;
        $cell.classList.add('opened');
        if (cell.flagged) {
          points++;
          $p.textContent = '🏴';
        } else {
          $p.textContent = '💣';
        }
      } else if (cell.opened) {
        points++;
        $cell.classList.add('opened');
        if (cell.nearbyBombs) {
          $p.textContent = cell.nearbyBombs;
        } else {
          $p.textContent = '';
        }
      } else if (cell.flagged) {
        $p.textContent = '🏳';
        if (!cell.isBomb) {
          bombs--;
        }
      } else if (cell.isBomb) {
        $p.textContent = '';
        bombs++;
        openable++;
      } else {
        $p.textContent = '';
        openable++;
      }
    });

    $scoreleft.textContent = 'Bombs: ' + bombs;
    $scoreright.textContent = 'Points: ' + points;

    if (openable === bombs) {
      $scoreleft.textContent = 'WIN!';
      $game.oncontextmenu = null;
      $game.onclick = null;
      $cells.forEach(function ($cell) {
        $cell.classList.add('gameover');
      });
    } else if (gameover) {
      $cells.forEach(function ($cell) {
        $cell.classList.add('gameover');
      });
      $game.oncontextmenu = null;
      $game.onclick = null;
      $scoreleft.textContent = 'GAME OVER';
    }
  }}
