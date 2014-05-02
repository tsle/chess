var pval = 1;
var rval = 2;
var kval = 2;
var bval = 3;
var Kval = 1;
var qval = 5;

var vals = { "p":1, "r":2, "n":2, "b":3, "q":5, "k":5 };

function evaluate(fen, turn) {
    var score = 0;
    
    for(var i=0; i<fen.length; i++) {
	if(turn) 
	score += vals[fen.charAt(i)];
    }
}