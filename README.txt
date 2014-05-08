Final Program - Chess Bots by Khang Le and Tuan Le

For our final project, we created two bots to compete against each other. Khang Le implemented the NegaMax algorithm, and Tuan Le implemented and Alpha-beta Min Max algorithm.
Our program pits the two bots against each other to see who wins. We use the chess.js and chessboard.js libraries to implement a visual representation of the game being played.

Alpha Beta Pruning Implementation Description (Tuan Le): js/ab.js (White)

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

NegaMax Implementation Description (Khang Le): js/negamax.js (Black)

The Negamax algorithm is a common recursive implementation of minimax algoirthms. It works by the notion that it attempts to minimize the opponent's best possible move. My implementation is recursive and works by taking the board, the depth, and the current player. The max score is initially set to -100000 (-INFINITY). The algorithm then loops through all of the current possible moves, and acts out each move, then recursively calls itself. Once the depth has been reached, it evaluates the current score of the opponent based on the board and returns this score. The opponent's score is then negated upon the return of evaluation function and the max is all of the scores is taken. This is done because we want to minimize our opponent's best option, so we take the option that leads our opponent to the lowest score. When implementing the program, I noticed that sometimes the algorithm would get stuck in an endless loop of switching back and forth between two positions while the opponent did the same. Since this would lead to an endless game, I decided to implement an inHistory function that would check if the past board state was in the history by checking if the piece was making a previous move, where the flags were also the same, and the options were also the same. When attempting to use different depths, I noticed that at depth 3, my algorithm was extremely slow because there was no pruning of moves, so at each depth the algorithm would attempt all moves without removing ones that are more than likely going to lead to a bad board. 
The evaluation function was a simple function that compares the current users score to the 
opponents. Both individual scores are calculated by adding the point values of all the pieces on 
each side. Then, the opponent's score is subtracted from the current user's score to get the
current user's score. I did not use the official chess rankings when assigning point values to my 
pieces. Instead, I chose to rank them myself with pawns being unit score, rooks 4 points, knights 
2 points, bishops 3 points, queens 7 points, and kings 5 points. These relative rankings are more 
so how I play chess.
