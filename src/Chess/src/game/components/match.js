

export class Match {
  constructor(scene) {
    this.scene = scene;
    this.moves = [];
    this.last_move = false;
    this.current_player = 'w';
    this.mode = 'player';
    this.player1 = 'w';
    this.castles = {wk: true, wq: true, bk: true, bq: true}
    this.passant = false;
  }
  

  record_move(m) {
    // console.log(m[0].type, m[1].rowCol);
    this.moves.push(m);
    this.last_move = m;

    if (this.current_player == 'w') {
      this.current_player = 'b';
    }
    else {
      this.current_player = 'w';
    }
    this.passant = false;

    // detect passant target
    let pc = this.last_move[0];
    let sq = this.last_move[1];
    let former = this.last_move[2];

    if (pc.type[1] === 'p' && Math.abs(sq.row - former.row) === 2) {
      let factor = 1;
      if (pc.type[0] === 'w') {factor = -1};
      this.passant = this.scene.squares[(8 * (sq.row - factor)) + sq.col];
    }
    

    if (this.mode === 'engine' && this.current_player !== this.player1) {
      let timeout = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
      console.log(timeout)
      this.scene.engine.request(timeout);
      this.piecesInteractive(false);

      setTimeout(() => {
        this.piecesInteractive(true);
      }, timeout + 200)
      
    }

    if (this.moves.length > 8) {
      this.checkRepetition();
    }
  }

  engine_move(note, timeout=3000) {
    let cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

    let rowCol1 = [rows.indexOf(note[1]), cols.indexOf(note[0])];
    let rowCol2 = [rows.indexOf(note[3]), cols.indexOf(note[2])];

    let sq1 = this.scene.squares[(8 * rowCol1[0]) + rowCol1[1]];
    let sq2 = this.scene.squares[(8 * rowCol2[0]) + rowCol2[1]];
    //console.log(sq1, sq2)
    let pc = sq1.piece;

    // artifically increase cpu "think" time to not move instantly
    setTimeout(() => {

      if (pc.type[1] === 'k' && Math.abs(rowCol1[1] - rowCol2[1]) > 1) {
        pc.move(sq2, true)
      }
      pc.move(sq2);

    }, timeout)
    
  }

  past_moves() {
    this.moves.forEach(m => {
      console.log(`${m[0].type} ${[m[1].row, m[1].col]}`)
    })
  }

  checkRepetition() {
    let moves = this.moves;
    let recent_moves = moves.slice(moves.length - 9, moves.length).map(m => {
        return m[0].type + m[2].rowCol + m[1].rowCol
    });
    console.log(recent_moves);
    if (recent_moves.length > 8) {
        if (recent_moves[0] === recent_moves[4] & recent_moves[1] === recent_moves[5] && recent_moves[2] === recent_moves[6] && recent_moves[3] === recent_moves[7] &&recent_moves[8] === recent_moves[0]) {
            this.end('draw');
            return true
        }
    }
    return false
  }

  piecesInteractive(bool = true) {
    this.scene.pieces.forEach(pc => {
      if (bool) {
        pc.setInteractive();
      }
      else {
        pc.disableInteractive();
      }
      this.scene.input.setDraggable(pc, bool);
    })
  }


  end(type='mate', winner='w') {
    this.scene.active = false;
    this.scene.pieces.forEach(pc => {
      pc.disableInteractive();
      this.scene.input.setDraggable(pc, false);
    })

    let msg = 'Checkmate';
    let xY = [400, 340];

    if (type === 'draw') {
      msg = 'Draw';
      xY = [400, 340];
    }


    let overlay = this.scene.add.image(this.scene.game.config.width / 2, this.scene.game.config.height / 2, 'overlay');
    overlay.setDisplaySize(this.scene.game.config.width, this.scene.game.config.height);
    overlay.setDepth(3);
    overlay.setAlpha(0.35);

    const message = this.scene.add.text(xY[0], xY[1], msg, {
      fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setDepth(100).setOrigin(0.5);
    

    const rematch = this.scene.add.text(410, 480, 'Rematch', {
        fontFamily: 'Arial Black', fontSize: 38, color: 'rgba(240,240,240,1)',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
    }).setDepth(100).setOrigin(0.5);

    rematch.setInteractive();
    rematch.setInteractive();


  // Mouseover event
    rematch.on('pointerover', function () {
    rematch.setFill('rgba(210,210,210,1)'); // Lighter color
    });

  // Mouseout event
    rematch.on('pointerout', function () {
    rematch.setFill('rgba(240,240,240,1)'); // Original color
    });

  // Click event
    rematch.setInteractive();
    rematch.on('pointerdown', function () {

    this.scene.changeScene();
    });
  }
}