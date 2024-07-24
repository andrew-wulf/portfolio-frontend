import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { Options } from './scenes/Options';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig


let width = 800;
let height = 800;
if (window.innerWidth < 900) {
    if (window.innerWidth > 650) {
    width = 600;
    height = 600;
    }
    else {
    width = 400;
    height = 400;
    }
}


const sizes = {width: width, height: height}

const config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Options,
        Game,
    ]
};


const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
