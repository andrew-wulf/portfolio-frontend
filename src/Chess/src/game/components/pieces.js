import {GameObjects, Geom} from 'phaser';


export function pieces(scene) {
  let pieces = []
  scene.squares.forEach((sq, i) => {
    let pos = [sq.centerX, sq.centerY]
    let piece = null;
    let types = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    let origin_y = 0.55;

    console.log(i, pos, [sq.row, sq.col])
    if (i < 16) {
        let type = 'bp';
        
        if (i < 8) {
            type = 'b' + types[i];
        }
        console.log(type)
        let pos = [sq.centerX, sq.centerY];
        piece = new Piece(scene, pos[0], pos[1], type);
        sq.piece = piece;
        piece.square = sq;
        console.log(`${piece.type} | sq: ${piece.square.col} pc: ${piece.square.piece.type}`)
    }

    else {
        if (i > 47) {
            let type = 'wp';

            if (i > 55) {
                type = 'w' + types[7 - (63 - i)];
            }
            let pos = [sq.centerX, sq.centerY];
            piece = new Piece(scene, pos[0], pos[1], type);
            sq.piece = piece;
            piece.square = sq;
        }
    }

    if (i == 4) {
      scene.black_king = piece;
    }
    if (i == 60) {
      scene.white_king = piece;
    }

    if (piece !== null) {
        pieces.push(piece)
        piece.setInteractive();
        scene.input.setDraggable(piece);
    }
  })
  return pieces
}


export class Piece extends GameObjects.Image {
    constructor (scene, x, y, type) {
      super(scene, x, y, type);

      this.type = type;
      this.pos = [x, y];
      this.scene = scene;
      this.square = false;

      scene.add.existing(this).setScale(0.7).setDepth(2);

      this.origin_y = 0.5

      if (this.type.includes('p')) {
        this.origin_y = 0.55;
      }

      this.setOrigin(0.5, this.origin_y);


      this.selected = false;
      this.legal_moves = [];
      this.active = true;
    }

    deselect() {
      this.scene.selected_piece = false;
    }

    reset() {
      this.x = this.pos[0];
      this.y = this.pos[1];
      this.clearTint();
    }
    

    move(square, castle=false, record=true, undo=false) {

      let legal = true;
      let king = this.scene.white_king;
      let other_king = this.scene.black_king;
      let sound = this.scene.move;

      if (this.type[0] == 'b') {
        king = this.scene.black_king;
        other_king = this.scene.white_king;
      }

      // detect pawn promotion (i.e. the only time this function is ever called on a stationary piece)
      if (square === this.square) {
        sound = this.scene.promote;
        this.scene.match.piecesInteractive(true);
      }
  
      let former_square = this.square;    

      // regular captures
      let pc = square.piece;
      if (pc !== false && pc !== this) {
        pc.setVisible(false);
        pc.active = false;
        sound = this.scene.capture;
      }

      // detect en passant capture (only capture where pieces don't touch)
      if (this.type[1] === 'p' && square === this.scene.match.passant) {
        let last_move = this.scene.match.last_move;
        let deadPawn = last_move[0];
        if (deadPawn.type !== this.type) {
          last_move[1].piece = false;
          deadPawn.setVisible(false);
          sound = this.scene.capture;
        }
      }

      this.square.piece = false;
      this.square = square;
      square.piece = this;

      //make sure player can't move into checks
      let checks = king.refresh_moves(true);
      if (checks.length > 0) {
        console.log('ILLEGAL MOVE -- CHECKS FOUND:');
        checks.forEach(m => {
          console.log(m[0].rowCol, m[1]);
          m[0].check();
        })

        legal = false;
      }

       // unique castling function

       if (castle === true && legal === true) {
        let squares = this.scene.squares;
        let i = square.i;

        let diff = square.i - former_square.i;
        let layover = squares[square.i - (diff/  2)];
        let res = this.move(layover, false, false, true);
        let res2 = this.move(former_square, false, false, true);

        if (res && res2) {
          if (diff === 2) {
            let rook = squares[i + 1].piece;
            rook.move(squares[i - 1], false, false);
        }
          else {
              let rook = squares[i - 2].piece;
              rook.move(squares[i + 1], false, false);
          }
          sound = this.scene.castle;
        }
        else {
          legal = false;
        }
      }
      // If legal, physically move piece. if not, reset square associations.
      if (legal === false || undo === true) {
        record = false;
        this.square = former_square;
        this.square.piece = this;
        square.piece = pc;
        if (pc !== false) {
          pc.setVisible(true);
        }
        sound = this.scene.illegal;
      }

      if (undo === true) {
        return legal
        }
      else {
        if (legal === true) {
          this.x = square.centerX;
          this.y = square.centerY;
          this.pos = [this.x, this.y];
          this.legal_moves = [];
        }
      } 

    

      // setup pawn promotions
      if (this.type[1] === 'p' && (this.square.row === 7 || this.square.row === 0)) {
        this.promote();
        return
      }


      // If successful check, play sound
      let opp_checks = other_king.refresh_moves(true);
      if (opp_checks.length > 0) {
        console.log('Checked enemy king!');
        checks.forEach(m => {
          console.log(m[0].rowCol, m[1]);
        })
        sound = this.scene.check;
      }

      if (record === true) {
        this.scene.match.record_move([this, square, former_square]);

        // update castle validation (forbid future castles if either piece was moved)
        if (this.scene.match.castles !== false && (this.type[1] === 'k' || this.type[1] === 'r')) {
          let castles = this.scene.match.castles;
  
          if (this.type[1] === 'k') {
            if (this.type[0] === 'w') {
              castles.wk = false;
              castles.wq = false;
            }
            else {
              castles.bk = false;
              castles.bq = false;
            }
          }

          if (this.type[1] === 'r') {
            let side = 'k';
            if (former_square.col === 0) {
              side = 'q';
            }
            castles[this.type[0] + side] = false;
          }
          console.log('Current castles: ' + Object.values(castles))
          if (Object.values(castles).every(v => {v === false})) {
            castles = false;
          }
        }
        
        
        // detect if no valid moves for opponent, i.e. checkmate or stalemate

        let validMoveExists = this.scene.checkForMate(other_king);
        if (validMoveExists === false) {
          sound = this.scene.end;
        }
        else {
          let draw = this.scene.match.checkRepetition();
          if (draw === true) {
            sound = this.scene.end;
          }
        }
      }
      sound.play();
    }




    refresh_moves(getChecks=false) {
      let checks = true;
      if (getChecks !== true) {
        checks = false;
      }


      let squares = this.scene.squares;
      let legal_moves = [];
      let type = this.type;
      
      let curr = this.square;

      
      function get_index(row, col) {
        return (8 * row) + col
      }

      function validate(moves, checkTypes=[]) {
        let j = 0;
        while (j < moves.length) {
          let m = moves[j];

          if ((m[0] < 0 || m[0] > 7) || (m[1] < 0 || m[1] > 7)) {
            j++;
            continue
          }

          
          let i = get_index(m[0], m[1]);
          let sq = squares[i];

          let pc = sq.piece;

          if (checks !== false) {
            if (pc !== false) {
              if (pc.type[0] !== type[0]) {
                console.log(pc.type, checkTypes)
                checkTypes.forEach(check => {
                  if (pc.type[1] === check) {
                    legal_moves.push([sq, pc.type[0] + check])
                  }
                })
              }
              break;
            }
              
            j++;
          }

          else {
            console.log(m)
            if (pc !== false) {

              if (pc.type[0] !== type[0]) {
                legal_moves.push([sq, true]);
              }
              break;
            }
            legal_moves.push([sq, false]);
            j++;
          }
        }
      }
      
    
      if (curr !== null) {
        let row = curr.row;
        let col = curr.col;
        let moves = [];

        console.log(`Piece: ${this.type} | Current Square: ${curr.i} | RowCol: ${[row, col]}`)

        
        if (this.type.includes('p') || checks === true) {
          
          let diff = 1;
          let start_row = 1;

          if (this.type.includes('w')) {
            diff = -1;
            start_row = 6;
          }

          let moves = [[row + diff, col]];
          
          if (row == start_row) {
            moves.push([row + (diff * 2), col]);
          }


          // Doing the pawn move validation by hand because it's unique (and only 2 possible squares)
          if (checks === false) {
            moves.forEach(m => {
              let i = (8 * m[0]) + m[1];
              console.log(squares[i].piece)
              if (squares[i].piece === false) {
                legal_moves.push([squares[i], false]);
              }
            })
          }

        

          let diags = [[row + diff, col + 1], [row + diff, col - 1]]

          diags.forEach(m => {
            let i = (8 * m[0]) + m[1];
            console.log(squares[i].piece)
            if (squares[i].piece !== false) {
              if (squares[i].piece.type[0] !== this.type[0]) {
                if (checks === true) {
                  if (squares[i].piece.type[1] === 'p') {
                    legal_moves.push([squares[i], squares[i].piece.type[0] + 'p'])
                  }
                }
                else {
                  legal_moves.push([squares[i], true]);
                }
                
              }
            }

            if (squares[i] === this.scene.match.passant) {
              legal_moves.push([squares[i], 'en passant'])
            }
          })
          
        }

        if (this.type.includes('r') || this.type.includes('q') || checks === true) {

          for (let i = 0; i < 2; i++) {

            let rowCol = [row, col];
            let start = rowCol[i];

            moves = [];

            rowCol[i] = start - 1;

            while (rowCol[i] > -1) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[i] = rowCol[i] - 1;
            }

            validate(moves, ['r', 'q']);

            moves = [];
            rowCol[i] = start + 1;

            while (rowCol[i] < 8) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[i]++;
            }
            validate(moves, ['r', 'q']);
          }
        }
        
        if (this.type.includes('k') || checks === true) {
          moves = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1], [row + 1, col + 1], [row - 1, col + 1], [row - 1, col - 1], [row + 1, col - 1]];

          moves.forEach((m) => {
            validate([m], ['k']);
          });


        // INSERT CASTLING HERE ------------
          if (checks === false) {

            let i = this.square.i
  
            if ( i === 60 || i === 4) {

              // kingside
              if (squares[i + 1].piece === false && squares[i + 2].piece === false && squares[i + 3].piece !== false) {
                if (squares[i + 3].piece.type[1] == 'r' && this.scene.match.castles[this.type[0] + 'k'] === true) {
                  legal_moves.push([squares[i + 2], 'castle'])
                }
              }
  
              // queenside
              if (squares[i - 1].piece === false && squares[i - 2].piece === false && squares[i - 3].piece === false && squares[i - 4].piece !== false) {
                if (squares[i - 4].piece.type[1] == 'r' && this.scene.match.castles[this.type[0] + 'q'] === true) {
                  legal_moves.push([squares[i - 2], 'castle'])
                }
              }
            }
          }

        }

      


        if (this.type[1] == 'b' || this.type.includes('q') || checks === true) {
          [-1, 1].forEach(j => {
            let rowCol = [row, col];
            let start = [row, col];

            moves = [];

            rowCol[1]--;
            rowCol[0]+=j;

            while (rowCol[1] > -1 && (rowCol[0] > -1 && rowCol[0] < 8)) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[1]--;
              rowCol[0]+=j;
            }

            validate(moves, ['b', 'q']);

            moves = [];
            rowCol = start;

            rowCol[1]++;
            rowCol[0]+=j;

            while (rowCol[1] < 8 && (rowCol[0] > -1 && rowCol[0] < 8)) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[1]++;
              rowCol[0]+=j;
            }
            validate(moves, ['b', 'q']);
          });
        }

        if (this.type.includes('n') || checks === true) {
          moves = [[row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1], [row + 1, col + 2], [row - 1, col + 2], [row + 1, col - 2], [row - 1, col - 2]]
          moves.forEach(m => validate([m], ['n']))
        }

        if (checks === true) {
          return legal_moves
        }

        else {
          console.log(legal_moves);
          this.legal_moves = legal_moves;
        }

      }
    }
  


    show_moves() {
      // this.setTint(0x1228b5);
      this.square.highlight();

      // console.log(this.legal_moves)
      this.legal_moves.forEach(arr => {
        let sq = arr[0];
        let occupied = arr[1];
        //let hex = '0x1228b5';
        let hex = 0x2b39cf;

        if (occupied === true) {
          hex = '0xc93232';
        }

        sq.set_color(hex, hex, this.scene.graphics)
      });
    }

    drop_move(moves, i) {
      moves.forEach((move, index) => {
        if (move.i == i) {
          moves.splice(index, 1);
          return
        }
      })
    }

    
    promote() {
      let factor = -100;
      let pre = this.type[0];
      let pieces = [];
      let to_promote = false;
      let types = ['q', 'n', 'r', 'b'];
      let square = this.square;
      let promoted = false;

      if (pre === 'w') {
        factor = 100;
      }

      // Disable all normal pieces until selection is made //
      this.scene.match.piecesInteractive(false);

      let overlay = this.scene.add.image(this.scene.game.config.width / 2, this.scene.game.config.height / 2, 'overlay');
      overlay.setDisplaySize(this.scene.game.config.width, this.scene.game.config.height);
      overlay.setDepth(3);
      overlay.setAlpha(0.5);

      console.log(this.x, this.y);

      types.forEach((type, i) => {
        let pc = new Piece(this.scene, this.x, this.y + (factor * (i+1)), pre + type);
        pc.setDepth(5);
        pieces.push(pc);

        pc.setInteractive();
        pc.on('pointerdown', function (pointer) {
          if (promoted === false) {
            pick(pc.type);
          }
        });
        pieces.push(pc);
      })

      function pick(type) {
        pieces.forEach(pc => {
          if (pc.type === type) {
            to_promote = pc;
          }
          else {
            pc.destroy();
          }
        })

        let pc = to_promote;
        square.piece.setVisible(false);
        pc.square = square;
        square.piece = pc;
        pc.setVisible(true);
        pc.x = square.centerX;
        pc.y = square.centerY;
        pc.pos = [pc.x, pc.y];

        pc.move(pc.square);
        pc.scene.input.setDraggable(pc);
        pc.scene.pieces.push(pc);
        promoted = true;
        overlay.destroy();
      }

    }
  }

