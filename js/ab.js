var pval = 1;
var rval = 2;
var kval = 2;
var bval = 3;
var Kval = 1;
var qval = 5;

var valsw = { "p":1, "r":2, "n":2, "b":3, "q":5, "k":5 };
var valsb = { "P":1, "R":2, "N":2, "B":3, "Q":5, "K":5 };

function evaluate(fen, turn) {
    var score = 0;
    var i=0;
    while(i<fen.length && fen.charAt(i) !== " ") {
	// if white
	if(turn) {
	    if(fen.charAt(i) in valsw) {
		score += valsw[fen.charAt(i)];
	    }	    
	} else { // if black	    
	    if(fen.charAt(i) in valsb) {
		score += valsb[fen.charAt(i)];
	    }
	}
	i++;
    }
    return score;
}

function evaluate_score(fen, turn) {
    return evaluate(fen, turn) - evaluate(fen, !turn);
}

function abMinMax(board, depth_limit, turn) {
    return abMax(board, depth_limit, 1, 0, 0, turn);    
}

function abMax(board, depth_limit, depth, a, b, turn) {
    var best_move = null;
    var best_move_score = -10000;
    var real_best_move = null;
    var move = null;
    var alpha = a, beta = b;
    
    if(depth >= depth_limit) {		
	return null;	
    } else {
	var moves = board.moves({verbose: true});
	for(var i=0; i<moves.length; i++) {
	    board.move(moves[i]); // make max move
	    move = abMin(board, depth_limit, depth+1, alpha, beta, turn); // get best move for min
	    if(move != null) board.move(move); // make min move	    
	    var score = evaluate_score(board.fen(), turn);
	    // depth limit hit
	    if(move == null && score > best_move_score) {
		real_best_move = moves[i];
		alpha = best_move_score = score;
	    }
	    else if(best_move == null || score > best_move_score) {
		best_move = move;
		real_best_move = moves[i];
		alpha = best_move_score = score;
	    }
	    // undo max move and min move
	    if(move != null) board.undo();
	    board.undo();
	    if(beta > alpha)
		return real_best_move;
	}
	return real_best_move;
    }
}

function abMin(board, depth_limit, depth, a, b, turn) {
    var best_move = null;
    var best_move_score = 10000;
    var real_best_move = null;
    var move = null;
    var alpha = a, beta = b;
    
    if(depth >= depth_limit) {
	return null;
    } else {
	var moves = board.moves({verbose: true});
	for(var i=0; i<moves.length; i++) {
	    board.move(moves[i]); // make min move	    
	    move = abMax(board, depth_limit, depth+1, alpha, beta, turn); // get best move for max
	    if(move != null) board.move(move); // make max move	    
	    var score = evaluate_score(board.fen(), !turn);
	    if(move == null && score < best_move_score) {
		real_best_move = moves[i];
		beta = best_move_score = score;
	    }
	    else if(best_move == null || score < best_move_score) {
		best_move = move;
		real_best_move = moves[i];
		beta = best_move_score = score;
	    }
	    // undo max move and min move
	    if(move != null) board.undo();
	    board.undo();
	    if(beta < alpha)
		return real_best_move;
	}
	return real_best_move;
    }
}