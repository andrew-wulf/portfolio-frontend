import {Geom} from 'phaser';


export function board(scene) {
  let screen_h = scene.game.config.height;
  let screen_w = scene.game.config.width;

  let cel_w = screen_h / 8;
  let letters = 'ABCDEFGH';
  let graphics = scene.graphics;
  let rectangles = [];

  for (let y=0; y < 8; y++) {
    let even = 'dark';
    let odd = 'light';
    let row = 8 - y;

    if (y === 0 || y % 2 === 0) {
        even = 'light';
        odd = 'dark';
    }
        
    for (let i=0; i < 8; i++) {
        let color = odd;
        let col = letters[i];

        if (i === 0 || i % 2 === 0) {
            color = even;
        }
        //console.log(color)
        

        //console.log(`y: ${y} i: ${i} co-ord: ${[i * cel_w, y * cel_w, (i + 1) * cel_w, (y + 1) * cel_w]}`)
        let rect = new Square(i * cel_w, y * cel_w, cel_w, cel_w, scene);
        rect.set_label(y, i);

        let hex = '0x789656';
        let alt = '0xEBECD1';
        let hl = '0xB9CA43';
        
        if (color === 'light') {
          hex = '0xEBECD1';
          alt = '0x789656';
          hl = '0xF5F682';
        }
        rect.set_color(hex, alt, graphics)
        rect.highlighted = hl;
        rectangles.push(rect)

        if (i == 0) {
          //console.log(`#${hex.toString().substring(2)}`)
          let label = scene.add.text(rect.left, rect.top, row, { font: '22px Helvetica', fill: `#${alt.substring(2)}`});
          label.setOrigin(0, 0); // Set origin to top left
          label.setDepth([label], 2)
        }

        if (y == 7) {
          let label = scene.add.text((i + 1) * cel_w, (y + 1) * cel_w, col, { font: '22px Helvetica', fill: `#${alt.substring(2)}`});
          label.setOrigin(1,1); // Set origin to bottom right
          label.setDepth([label], 2)
        }
    }
  }
    return rectangles
}


export class Square extends Geom.Rectangle {
  constructor (left, top, width, height, scene) {
    super(left, top, width, height);

    this.color = null;
    this.graphics = null;
    this.scene = scene;
    this.piece = false;
    this.highlighted = null;
    this.danger = '0xAB3022'
  }

  set_color(color, alt, graphics) {
    if (this.color === null) {
      this.color = color;
      this.alt = alt;
      this.graphics = graphics;
    }
    this.fill(color);
  }

  fill(color) {
    this.graphics.fillStyle(color);
    this.graphics.fillRect(this.left, this.top, this.width, this.height)
  }

  highlight() {
    this.fill(this.highlighted)
  }

  check() {
    this.fill(this.danger)
  }

  reset() {
    this.set_color(this.color, this.alt, this.graphics)
  }

  set_label(row, col) {
    this.row = row;
    this.col = col;
    this.rowCol = [row, col];
    this.i = (row * 8) + col;
  }

}
