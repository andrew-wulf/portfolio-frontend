import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {Input} from 'phaser';
import {board} from '../components/board'
import {pieces} from '../components/pieces'
import {Match} from '../components/match'
import {Stockfish} from '../components/stockfish'

export class Game extends Scene
{
    constructor ()
    {
        super({key: 'Game'});
    }

    init(options) {
        this.options = options;
    }

    create ()
    {
        //BASIC SETTINGS
        const screen_w = this.game.config.width;
        const screen_h = this.game.config.height;
        console.log(screen_h, screen_w)

        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');
        this.input.setDefaultCursor('default');

        //COMPONENTS
        this.graphics = this.add.graphics();
        this.white_king = false;
        this.black_king = false;
        this.squares = board(this);
        this.pieces = pieces(this);

        //KEY VARIABLES
        this.selected_piece = false;
        this.legal_moves = [];
        this.match = new Match(this);
        this.engine = new Stockfish(this, this.options.depth);
        this.mode = 'engine';
        this.active = true;

        //SOUNDS
        this.move = this.sound.add('move');
        this.capture = this.sound.add('capture');
        this.castle = this.sound.add('castle');
        this.check = this.sound.add('check');
        this.end = this.sound.add('checkmate');
        this.promote = this.sound.add('promote');
        this.illegal = this.sound.add('illegal');
        this.timer = this.sound.add('timer');

        //OPTIONS SETUP
        if (this.options.mode !== '2-Player') {
            this.match.mode = 'engine';
        }
        // no support for black pieces POV yet


        // STANDARD INPUT LISTENERS ------

        let piece_types = ['wp', 'wb', 'wn', 'wr', 'wq', 'wk', 'bp', 'bb', 'bn', 'br', 'bq', 'bk'];

        // Change cursor to grab when pointer is over an interactive image
        this.input.on('pointerover', (pointer, gameObject) => {
            if (gameObject.length > 0 && piece_types.includes(gameObject[0].type) && this.input.scene.active === true) {
                this.input.setDefaultCursor('grab');



                // INSERTING PIECE EVENT HANDLERS HERE ---------------------------
                // I thought that maybe if each piece was only listening for events while the mouse was hovering over them, it might be less work for phaser.
                // I don't know if it actually makes a difference one way or the other, but I'll tentatively keep this for now.

                let piece = gameObject[0];
                
                // Event listener for drag start
                piece.on('dragstart', function (pointer) {
                    // this.setTint(0xa3a3a2); // Change color when dragging starts
                    this.square.highlight();
                    this.refresh_moves();
                    });
        
                // Event listener for drag
                piece.on('drag', function (pointer, dragX, dragY) {
        
                    this.x = dragX; // Update the image's x-coordinate
                    this.y = dragY; // Update the image's y-coordinate
        
                    // add square overlap (maybe using the input and copying one of those validations?)
        
                });
        
                // Event listener for drag end
                piece.on('dragend', function (pointer) {
                //console.log(this.scene.selected_piece)
                if (this.selected_piece === this) {
                    this.click(pointer);
                }
        
                else {
                    
                    if (this.scene.match.current_player === piece.type[0]) {
                    this.scene.selected_piece = piece;
        
                    let x_diff = Math.abs(pointer.x - this.pos[0]);
                    let y_diff = Math.abs(pointer.y - this.pos[1]);
        
                    if (x_diff < 50 && y_diff < 50) {
                        this.reset()
                        this.show_moves()
                    }
                    else {this.scene.click(pointer)}
                    }
                    else {
                    piece.reset();
                    }
                }
        
                });


            }
        });

        // Revert cursor when pointer is no longer over an interactive image
        this.input.on('pointerout', (pointer, gameObject) => {
            if (gameObject.length === 0 || piece_types.includes(gameObject[0].type)) {
                this.input.setDefaultCursor('default');
            }
        });

        // Change cursor to grabbing when an image is clicked and back to grab when released
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            //console.log(gameObject)
            if (piece_types.includes(gameObject.type) && this.input.scene.active === true) {
                this.input.setDefaultCursor('grabbing');
            }
        });



        //refresh selections on click
        this.input.on('pointerdown', function (pointer) {
            if (this.scene.active === true) {
                this.scene.click(pointer);
            }
            
        });


        //Insert any test here and call with 'W' or 'B' keys

        const wKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);

        wKey.on('down', (event) => {
        console.log('W key pressed');
        this.pieces[10].promote();
        });

        const bKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.B);

        bKey.on('down', (event) => {
        console.log('B key pressed');
        this.engine.request();
        });

        // ------------------------------------



        EventBus.emit('current-scene-ready', this);
    }

        

    changeScene ()
    {
        this.scene.start('MainMenu');
    }


    click(pointer) {
        let square_to_highlight = false;

        if (this.selected_piece !== false) {
            let piece = this.selected_piece;

            this.squares.forEach(sq => {
                if (sq.contains(pointer.x, pointer.y)) {
                    let clicked_square = sq.i;
                    
                    let j = 0;
                    while (j < piece.legal_moves.length) {
                        let arr = piece.legal_moves[j];

                        let sq = arr[0];
                        let castle = false;
                        if (arr[1] === 'castle') {
                            castle = true
                        }

                        if (sq.i == clicked_square) {
                            console.log(`Moved to ${sq.i}!`);
                            piece.move(sq, castle);
                            break
                        }
                        j++;
                    }
                }
            });
            this.selected_piece.reset();
            this.selected_piece.deselect();
        }

        else {
            this.squares.forEach(sq => {
                if (sq.contains(pointer.x, pointer.y)) {
                    square_to_highlight = sq;
                }
            });
        }

        this.squares.forEach(sq => {
            if (sq !== square_to_highlight) {
                sq.reset() 
            }
        });
        

        if (this.match.moves.length > 0) {
            let last_move = this.match.moves[this.match.moves.length - 1];
            last_move[1].highlight();
            last_move[2].highlight();
        }
        
    }


    checkForMate(king) {
        console.log('Checking for Mate...')
        let i = 0;
        let legalMoveExists = false;
        let opp_king = this.black_king;

        if (king === this.black_king) {
            opp_king = this.white_king;
        }

        while (i < this.pieces.length && legalMoveExists === false) {
            let pc = this.pieces[i];

            if (pc.type[0] === king.type[0] && pc.active === true) {
                pc.refresh_moves();
                let j = 0;
                while (j < pc.legal_moves.length && legalMoveExists === false) {
                    let m = pc.legal_moves[j];
                    let res = pc.move(m[0], false, false, true);
                    if (res === true) {
                        legalMoveExists = true;
                        console.log('LEGAL MOVE FOUND: ' + pc.type + m[0].rowCol);
                    }
                    j++;
                }
            }
            i++;
        }

        if (legalMoveExists === false) {
            let checks = king.refresh_moves(true);
            if (checks.length > 0) {
                console.log('Check Mate!');
                this.match.end('mate', opp_king.type);
            }
            else {
                console.log('Stalemate!')
                this.match.end('draw');
            }
        }
        return legalMoveExists
    }

    checkForStalemate() {
        console.log('test')
    }
}
