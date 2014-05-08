Final Program - Chess Bots by Khang Le and Tuan Le

For our final project, we created two bots to compete against each other. Khang Le implemented the NegaMax algorithm, and Tuan Le implemented and Alpha-beta Min Max algorithm.
Our program pits the two bots against each other to see who wins. We use the chess.js and chessboard.js libraries to implement a visual representation of the game being played.

Alpha Beta Pruning Implementation Description (Tuan Le): js/ab.js

The Alpha Beta pruning algorithm uses alpha, beta boundaries to cut off unnecessary branches of the search tree. In the implementation, the implementation alternates between recursive
calls to abMax and abMin. The abMAx routine determines the best move to make based on the recursive calls to abMin, which represents the opponent's minimizing move. The abMin routine
conversely determines the best move to inhibit the Max player by making recursive calls to abMax's responding moves. Therefore, we have this cyclical recursion between these routines
that implements the recursive definition for the Min Max algorithm. Alpha beta pruning comes in handy in game like chess because the search tree's branching factor is on the order of
approximately 30 moves. Alpha beta pruning is implemented by maintaining alpha beta value scores in each routine, and early exiting if beta is greater than alpha in abMax or vice versa
in abMin. Furthermore, because the depth of a full chess game is very deep, leaves cannot be realistically reached. Therefore, we implement a heuristic to estimate the state of the game
to evaluate the board's state. In our implementation, we have values assigned to each chess piece. The score for a player is their weighted sum of all their chess pieces. We then evaluate
the current state of the game for player x by taking the difference between x's score and the opponent's score. This gives a rough estimate of how well a strategy is. The depth of the search
tree is limited. In our implementations, because of the lack of computing speed with javascript, we were only capable of achieving a depth of 3 for the Alpha-beta pruning algorithm. At depth 3
the search is cut off and the state of the board must be evaluated. Currently, there are some logical errors in evaluating a moveset with this Ab-pruning implementation which is why it performs
so poorly. I was unable to figure out why the logic in selecting the best moves was so poor. As a result, in watching the program, the bot makes very questionable decisions in its strategy.

NegaMax Implementation Description (Khang Le): js/negamax.js



