/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({"n":n});

  //recursive function(currentRow)
  var placeNextRook = function(currentRow){
    if (currentRow===n){
      //return board;
      var result = [];
      for (var i = 0; i < board.attributes.n; i++) {
        result.push(board.attributes[i]);
      }
      return result;
    }

    //for each space on next row:
    for (var i = 0; i < board.attributes.n; i++) {
      //place rook there.
      board.togglePiece(currentRow,i);

      //if it's safe (check row and col conflicts)
      if(!board.hasRowConflictAt(currentRow) && !board.hasColConflictAt(i)){
        var result = placeNextRook(currentRow + 1);
        if(result !== undefined){
          return result;
        }
        //remove safe piece to explore other possibilities
        board.togglePiece(currentRow, i);

      // else - it's not safe - remove it.
      } else {
        board.togglePiece(currentRow,i);
      }
    }
  };

  var solvedBoard = placeNextRook(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solvedBoard));
  return solvedBoard;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({"n":n});

  //recursive function(currentRow)
  var placeNextRook = function(currentRow){
    if (currentRow===n){
      //increment solution count;

      solutionCount++;
      //and then rewind

    } else {

    //for each space on next row:
      for (var i = 0; i < board.attributes.n; i++) {
        //place rook there.
        board.togglePiece(currentRow,i);

        //if it's safe (check row and col conflicts)
        if(!board.hasRowConflictAt(currentRow) && !board.hasColConflictAt(i)){
          placeNextRook(currentRow+1);
          //remove piece
          board.togglePiece(currentRow,i);

        // else - it's not safe - remove it.
        } else {
          board.togglePiece(currentRow,i);
        }
      }
    }
  };

  placeNextRook(0);

  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({"n":n});


  //recursive function(currentRow)
  var placeNextQueen = function(currentRow){

    if (currentRow===n){
      //return board;
      var result = [];
      for (var i = 0; i < board.attributes.n; i++) {
        result.push(board.attributes[i]);
      }
      return result;
    }

    //for each space on next row:
    for (var i = 0; i < board.attributes.n; i++) {
      //place queen there.
      board.togglePiece(currentRow,i);

      //if it's safe (check row and col conflicts)
      //then make a recursive call
      if(!board.hasRowConflictAt(currentRow) &&
         !board.hasColConflictAt(i) &&
         !board.hasMajorDiagonalConflictAt(i - currentRow) &&
         !board.hasMinorDiagonalConflictAt(currentRow + i)){
        var result = placeNextQueen(currentRow + 1);
        if(result !== undefined){
          return result;
        }
        //remove safe piece to explore other possibilities
        board.togglePiece(currentRow, i);

      // else - it's not safe - remove it.
      } else {
        board.togglePiece(currentRow,i);
      }
    }
  };

  var solvedBoard = placeNextQueen(0);
  if (solvedBoard===undefined){
    var result = [];
    for (var i = 0; i < board.attributes.n; i++) {
      result.push(board.attributes[i]);
    }
    solvedBoard=result;
  }

  return solvedBoard;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({"n":n});
  var solutionCount = 0;

  //recursive function(currentRow)
  var placeNextQueen = function(currentRow){

    if (currentRow===n){
      //return board;
      solutionCount++;
    }

    //for each space on next row:
    for (var i = 0; i < board.attributes.n; i++) {
      //place queen there.
      board.togglePiece(currentRow,i);

      //if it's safe (check row and col conflicts)
      //then make a recursive call
      if(!board.hasRowConflictAt(currentRow) &&
         !board.hasColConflictAt(i) &&
         !board.hasMajorDiagonalConflictAt(i - currentRow) &&
         !board.hasMinorDiagonalConflictAt(currentRow + i)){
        placeNextQueen(currentRow + 1);

        //remove safe piece to explore other possibilities
        board.togglePiece(currentRow, i);

      // else - it's not safe - remove it.
      } else {
        board.togglePiece(currentRow,i);
      }
    }
  };

  placeNextQueen(0);

  return solutionCount;
};


