import {GameObjects} from 'phaser';


export class Text extends GameObjects.Text {
  constructor (scene, x, y, text, style=false) {

    let textScale = 1;
    if (window.innerWidth < 900) {
        if (window.innerWidth > 650) {
        textScale = 0.75;
        }
        else {
        textScale = 0.5
        }
    }

    if (style === false) {
      style = {
        fontFamily: 'Arial Black', fontSize: 38 * textScale, color: 'rgba(180,180,180,1)',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'};
    }

    super(scene, x, y, text, style);

    this.scene = scene;
    this.action = false;
    this.interactive = true;

    scene.add.existing(this).setDepth(100).setOrigin(0.5);


    // Mouseover event
    this.on('pointerover', function () {
      this.setFill('rgba(255,255,255,1)'); // Lighter color
    });

    // Mouseout event
    this.on('pointerout', function () {
        this.setFill('rgba(220,220,220,1)'); // Original color
    });

    // Click event
    this.setInteractive();
    this.on('pointerdown', function () {
        console.log('pressed: ' + this.text)
        if (this.action !== false) {
          this.action();
        }
    });
  }

  disable() {
    this.disableInteractive();
  }
}