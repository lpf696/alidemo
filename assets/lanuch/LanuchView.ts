import { _decorator, assetManager, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LanuchView')
export class LanuchView extends Component {
    start() {
        this.lanuchMain();  
    }

    public lanuchMain() {
        assetManager.loadBundle("scripts", (err, bundle) => {
            const shellObj = director.getScene().getChildByName("Shell");
            shellObj.addComponent("Main");
        })
    }
}


