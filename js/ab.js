var pval = 1;
var rval = 2;
var kval = 2;
var bval = 3;
var Kval = 1;
var qval = 5;

var vals1 = { "p":1, "r":2, "n":2, "b":3, "q":5, "k":5 };
var vals2 = { "P":1, "R":2, "N":2, "B":3, "Q":5, "K":5 };

function evaluate(fen, turn) {
    var score = 0;
    var i=0;
    while(i<fen.length && fen.charAt(i) !== " ") {
	// if white
	if(turn) {
	    if(fen.charAt(i) in vals1) {
		score += vals1[fen.charAt(i)];
	    }	    
	} else { // if black	    
	    if(fen.charAt(i) in vals2) {
		score += vals2[fen.charAt(i)];
	    }
	}
	i++;
    }
    return score;
}

function abMinMax(board, depth_limit) {
    return abMax(board, depth_limit, 1, 0, 0);
}

function abMax(board, depth_limit, depth, a, b) {
    var best_move = null;
    var best_move_score = 0;
    var real_best_move = null;
    var move = null;
    var alpha = a, beta = b;
    
    if(depth >= depth_limit) {
	hist = board.history();
	return hist[hist.length-1];
    } else {
	var moves = board.moves();
	for(var i=0; i<moves.length; i++) {
	    board.move(moves[i]); // make max move
	    move = abMin(board, depth_limit, depth+1, alpha, beta); // get best move for min
	    board.move(move); // make min move
	    var score = evaluate(board.fen(), false);
	    if(best_move == null || score > best_move_score) {
		best_move = move;
		real_best_move = moves[i];
		alpha = best_move_score = score;
	    }
	    // undo max move and min move
	    board.undo();
	    board.undo();
	    if(beta > alpha)
		return real_best_move;
	}
	return real_best_move;
    }
}

function abMin(board, depth_limit, depth, a, b) {
    var best_move = null;
    var best_move_score = 0;
    var real_best_move = null;
    var move = null;
    var alpha = a, beta = b;
    
    if(depth >= depth_limit) {
	hist = board.history();
	console.log("depth hit");
	return hist[hist.length-1];
    } else {
	var moves = board.moves();
	for(var i=0; i<moves.length; i++) {
	    board.move(moves[i]); // make min move
	    //console.log(moves[i]);
	    move = abMax(board, depth_limit, depth+1, alpha, beta); // get best move for max
	    board.move(move); // make max move
	    var score = evaluate(board.fen(), true);
	    if(best_move == null || score < best_move_score) {
		best_move = move;
		real_best_move = moves[i];
		beta = best_move_score = score;
	    }
	    // undo max move and min move
	    board.undo();
	    board.undo();
	    if(beta < alpha)
		return real_best_move;
	}
	return real_best_move;
    }
}