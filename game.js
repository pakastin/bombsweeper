
function createGame (grid, cells) {
  var $game = document.createElement('div');
  var $container = document.createElement('div');
  var $score = document.createElement('p');
  var $scoreleft = document.createElement('span');
  var $scoreright = document.createElement('span');
  var $newgame = document.createElement('p');
  var $table = createTable(grid);
  var $cells = $table.querySelectorAll('td');
  var $ps = $table.querySelectorAll('td > p');

  $scoreleft.style.float = 'left';
  $scoreright.style.float = 'right';

  $game.classList.add('game');
  $score.classList.add('score');
  $newgame.classList.add('newgame');

  $score.appendChild($scoreleft);
  $score.appendChild($scoreright);

  $game.appendChild($score);
  $game.appendChild($container);
  $game.appendChild($newgame);

  $container.classList.add('container');
  $container.appendChild($table);

  $newgame.textContent = 'New game?';
  $newgame.onclick = function () {
    location.reload();
  }

  $game.oncontextmenu = function (e) {
    e.preventDefault();

    var cell = e.cell;

    if (!cell) {
      return;
    }
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
    } else if (gameover) {
      $cells.forEach(function ($cell) {
        $cell.classList.add('gameover');
      });
      $game.oncontextmenu = null;
      $game.onclick = null;
      $scoreleft.textContent = 'GAME OVER';
    }
  }}
