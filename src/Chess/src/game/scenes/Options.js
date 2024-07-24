import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Text } from '../components/text'

export class Options extends Scene
{
  constructor ()
  {
      super({key: 'Options'});
  }

  init(options) {
    this.options = options;
  }

  create () {
    let textScale = 1;
    if (window.innerWidth < 900) {
        if (window.innerWidth > 650) {
        textScale = 0.75;
        }
        else {
        textScale = 0.5
        }
    }

    this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');

    const logo = new Text(this, 420 * textScale, 200 * textScale, 'Options', {
      fontFamily: 'Arial Black', fontSize: 60 * textScale, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    logo.disableInteractive();

    
    // labels
    const mode_label = new Text(this, 320 * textScale, 480 * textScale, 'Mode: ');
    mode_label.disableInteractive();
    mode_label.setColor('rgb(225,225,225,1)');

    const color_label = new Text(this, 300 * textScale, 360 * textScale, 'Player 1: ');
    color_label.disableInteractive();
    color_label.setColor('rgb(225,225,225,1)');

    const depth_label = new Text(this, 300 * textScale, 540 * textScale, 'Depth: ');
    depth_label.disableInteractive();
    depth_label.setColor('rgb(225,225,225,1)');
    depth_label.setVisible(this.options.mode !== '2-Player');

    // buttons
    const mode_select = new Text(this, 540 * textScale, 480 * textScale, this.options.mode);
    const color_select = new Text(this, 540 * textScale, 360 * textScale, this.options.p1);
    const depth_select = new Text(this, 540 * textScale, 540 * textScale, this.options.depth);
    depth_select.setVisible(this.options.mode !== '2-Player');
    
    const save_select = new Text(this, 420 * textScale, 700 * textScale, 'Return');


    // button handlers
    function tMode() {
      this.scene.toggleMode();
      mode_select.text = this.scene.options.mode;
      
      depth_select.setVisible(this.scene.options.mode !== '2-Player');
      depth_label.setVisible(this.scene.options.mode !== '2-Player');
    }
    mode_select.action = tMode;

    function tColor() {
      this.scene.toggleColor();
      color_select.text = this.scene.options.p1;
    }
    color_select.action = tColor;

    function tDepth() {
      this.scene.toggleDepth();
      depth_select.text = this.scene.options.depth;
    }
    depth_select.action = tDepth;
    

    function goBack() {
      this.scene.mainMenu();
    }
    save_select.action = goBack;
    



    EventBus.emit('current-scene-ready', this);
  }


  // scene level functions
  toggleMode() {
    if (this.options.mode === '2-Player') {
      this.options.mode = 'Vs. CPU';
    }
    else {
      this.options.mode = '2-Player';
    }
  }

  toggleColor() {
    if (this.options.p1 === 'White') {
      this.options.p1 = 'Black';
    }
    else {
      this.options.p1 = 'White';
    }
  }

  toggleDepth() {
    let depth = parseInt(this.options.depth);
    if (depth === 8) {
      depth = 1;
    }
    else {
      depth +=1
    }
    this.options.depth = `${depth}`
  }

  mainMenu() {
    this.scene.start('MainMenu', this.options);
  }
}