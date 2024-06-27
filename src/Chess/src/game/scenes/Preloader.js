import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('/assets');
        this.load.image('overlay', 'overlay2.png')
        //this.load.image('logo', 'logo.png');
        //this.load.image('star', 'star.png');

        this.load.image('wp', 'https://assets-themes.chess.com/image/ejgfv/150/wp.png')
        this.load.image('wn', 'https://assets-themes.chess.com/image/ejgfv/150/wn.png')
        this.load.image('wb', 'https://assets-themes.chess.com/image/ejgfv/150/wb.png')
        this.load.image('wr', 'https://assets-themes.chess.com/image/ejgfv/150/wr.png')
        this.load.image('wk', 'https://assets-themes.chess.com/image/ejgfv/150/wk.png')
        this.load.image('wq', 'https://assets-themes.chess.com/image/ejgfv/150/wq.png')
        this.load.image('bq', 'https://assets-themes.chess.com/image/ejgfv/150/bq.png')
        this.load.image('bk', 'https://assets-themes.chess.com/image/ejgfv/150/bk.png')
        this.load.image('br', 'https://assets-themes.chess.com/image/ejgfv/150/br.png')
        this.load.image('bb', 'https://assets-themes.chess.com/image/ejgfv/150/bb.png')
        this.load.image('bn', 'https://assets-themes.chess.com/image/ejgfv/150/bn.png')
        this.load.image('bp', 'https://assets-themes.chess.com/image/ejgfv/150/bp.png')

        this.load.audio('move', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3')
        this.load.audio('capture', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3')
        this.load.audio('castle', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/castle.mp3')
        this.load.audio('check', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3')
        this.load.audio('checkmate', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3')
        this.load.audio('promote', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/promote.mp3')
        this.load.audio('illegal', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/illegal.mp3')
        this.load.audio('timer', 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/tenseconds.mp3')

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.

        let options = {mode: '2-Player', p1: 'White', depth: '1'};
        this.scene.start('MainMenu', options);
    }
}
