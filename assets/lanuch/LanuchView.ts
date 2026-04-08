import { _decorator, assetManager, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LanuchView')
export class LanuchView extends Component {
    start() {
        this.lanuchMain();  
    }

    public lanuchMain() {
        assetManager.loadBundle("scripts", (err, bundle) => {
            console.log("scripts bundle load succ")
            const shellObj = director.getScene().getChildByName("Shell");
            shellObj.addComponent("Main");
        })
    }
}


