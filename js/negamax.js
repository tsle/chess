function negaMax(chess, depth, player) {
    if (player != chess.turn()) return "";
    var op = (player == 'b') ? 'w' : 'b';
    var best_move = null, max = -100000;
    var moves = chess.moves({ verbose: true });
    if (moves.length == 0) return null;
    for(var i=0; i < moves.length; i++) {
        var curPlayer = (player == 'b') ? 'w' : 'b';
	if (inHistory(chess, moves[i])) continue;
	if (!chess.move(moves[i])) continue;
	score = -negaHelper(chess, depth - 1, curPlayer, op);
	if (score > max) {
	    max = score;
	    best_move = moves[i];
	}
	chess.undo();
    }
    return best_move;
}

function negaHelper(chess, depth, curPlayer, player) {
    if (depth == 0) return negaEval(chess, player);
    var moves = chess.moves({ verbose: true });
    var max = -100000;
    if (moves.length == 0) return max;
    for (var i=0; i < moves.length; i++) {
	if (!chess.move(moves[i])) continue;
	cur_player = (curPlayer == 'b') ? 'w' : 'b';
	score = -negaHelper(chess, depth - 1, cur_player, player);
	if ( score > max ) 
	    max = score;
	chess.undo();
    }
    return max;
}

function inHistory(chess, move) {
    var history = chess.history({ verbose: true });
    var size = history.length;
    if (size > 5) size = 5;
    for(var i=0; i < history.length; i++) {
	if (history[i]['color'] == move['color'] &&
	    history[i]['from'] == move['from'] && 
	    history[i]['to'] == move['to'] &&
	    history[i]['piece'] == move['piece'] &&
	    move['flags'] == 'n') {
	    console.log('Repeated');
	    return true;
	}
    }
    return false;
}

function eval(chess, player) {
    var valsW = { "p":1, "r":4, "n":2, "b":3, "q":7, "k":5 };
    var valsB = { "P":1, "R":4, "N":2, "B":3, "Q":7, "K":5 };

    var score = 0;
    fen = chess.fen();
    var i = 0;
    while(i < fen.length) {
        if (player == 'w') { // if white                                                         
	    if (fen.charAt(i) in valsW) {
                score += valsW[fen.charAt(i)];
            }
        } else { // if black                                                                     
	    if (fen.charAt(i) in valsB) {
                score += valsB[fen.charAt(i)];
            }
        }
        i++;
    }
    return score;
}

function negaEval(chess, player) {
    if (player == 'w') {
        return eval(chess, 'w') - eval(chess, 'b');
    } else {
        return eval(chess, 'b') - eval(chess, 'w');
    }
}