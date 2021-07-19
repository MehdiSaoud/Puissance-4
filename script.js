var grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  var color = "red";
  var winner = false;
  var forEachCell = function (fn) {
    var trs = document.querySelectorAll("table tr");
    for (var row = 0; row < trs.length; row++) {
      var tr = trs[row];
      var tds = tr.querySelectorAll("td");
      for (var column = 0; column < tds.length; column++) {
        var td = tds[column];
        fn(td, row, column);
      }
    }
  };
  var checkVictory = function () {
    winner = isHorizontalWinner() || isVerticalWinner() || isDiagonalWinner();
    if (winner) {
      for (var i = 0; i < winner.length; i++) {
        var position = winner[i].split("-");
        grid[position[0]][position[1]] += " victory";
      }
    }
  };
  var isHorizontalWinner = function (customGrid) {
    var player, positions;
    for (var row = 5; row >= 0; row--) {
      positions = [];
      for (var column = 0; column < 7; column++) {
        var color = grid[row][column];
        if (!color || player !== color) positions = [];
        if (!color) continue;
        positions.push(row + "-" + column);
        if (positions.length >= 4) return positions;
        player = color;
      }
    }
    return;
  };
  var isVerticalWinner = function (customGrid) {
    customGrid = customGrid || grid;
    var player, positions;
    for (var column = 0; column < 7; column++) {
      positions = [];
      for (var row = 5; row >= 0; row--) {
        var color = customGrid[row][column];
        if (!color || player !== color) positions = [];
        if (!color) continue;
        positions.push(row + "-" + column);
        if (positions.length >= 4) return positions;
        player = color;
      }
    }
    return;
  };
  var isDiagonalWinner = function () {
    var grid45Left = [];
    for (var row = 5; row >= 0; row--) {
      for (var column = 0; column < 7; column++) {
        var shift = 5 - row;
        if (!grid45Left[row]) grid45Left[row] = [];
        grid45Left[row][column - shift] = grid[row][column];
      }
    }
    var positions = isVerticalWinner(grid45Left);
    if (positions) {
      for (let i = 0; i < positions.length; i++) {
        var cell = positions[i].split("-");
        var row = Math.floor(cell[0]);
        var column = Math.floor(cell[1]);
        switch (row) {
          case 4:
            column += 1;
            break;
          case 3:
            column += 2;
            break;
          case 2:
            column += 3;
            break;
          case 1:
            column += 4;
            break;
          case 0:
            column += 5;
            break;
        }
        positions[i] = row + "-" + column;
      }
    }
    return positions;
  };
  forEachCell(function (td, row, column) {
    td.addEventListener("click", function () {
      if (winner) return;
      for (var i = 5; i >= 0; i--) {
        if (grid[i][column]) continue;
        color = color === "yellow" ? "red" : "yellow";
        grid[i][column] = color;
        checkVictory();
        forEachCell(function (td, row, column) {
          if (grid[row][column]) td.className = grid[row][column];
        });
        break;
      }
    });
  });
  