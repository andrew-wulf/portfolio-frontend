import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Text } from '../components/text';

export class MainMenu extends Scene
{
    constructor ()
    {
        super({key: 'MainMenu'});
    }

    init(options) {
        this.options = options;
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');

        this.logo = this.add.text(420, 260, 'Chess', {
            fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);


        const new_game = this.add.text(422, 430, 'New Game', {
            fontFamily: 'Arial Black', fontSize: 38, color: 'rgba(180,180,180,1)',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        const options = this.add.text(422, 500, 'Options', {
            fontFamily: 'Arial Black', fontSize: 38, color: 'rgba(180,180,180,1)',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);


        [[new_game, 'Game'], [options, 'Options']].forEach(arr => {
            // Mouseover event
            let btn = arr[0];
            let scene = arr[1];

            btn.on('pointerover', function () {
                btn.setFill('rgba(255,255,255,1)'); // Lighter color
            });

            // Mouseout event
            btn.on('pointerout', function () {
                btn.setFill('rgba(220,220,220,1)'); // Original color
            });

            // Click event
            btn.setInteractive();
            btn.on('pointerdown', function () {
                this.scene.goTo(scene);
            });
        })

        EventBus.emit('current-scene-ready', this);
    }

    goTo (scene)
    {
        this.scene.start(scene, this.options);
    }

}
