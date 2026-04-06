import { _decorator, Component, director, game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        this._init();
    }

    private _init(): void {
        if (this._isInit == false) {
            this._isInit = true;
            
            const shellObj = director.getScene().getChildByName("Shell");
            let lanuchComponent = shellObj.getComponent("Lanuch");
            if (lanuchComponent) {
                lanuchComponent.destroy();
            }

            game.frameRate = 60;        
        } 
    }

    private _isInit: boolean = false;
}


