import { _decorator, assetManager, Component, director, instantiate, Node, Prefab, resources } from 'cc';
import { SystemConfig } from './SystemConfig';
const { ccclass, property } = _decorator;

@ccclass('Lanuch')
export class Lanuch extends Component {
    start() {
        const configName: string = "config/config";
        resources.load(configName, (err, data) => {
            if (err) {
                return console.error(err);
            }
            SystemConfig.init(data);
            console.log("system cfg init succ!");
            this._init();
        });
    }

    private _init()
    {
        this._showLoadingView();
    }

    private _showLoadingView()
    { 
        assetManager.loadBundle("plugins", (err, bundle) => {
            console.log("plugin bundle load succ!");
            bundle.load<Prefab>("prefabs/PreLoginView", (err, prefab) => {
                const ui_root = director.getScene().getChildByName("UIRoot");
                let obj: Node = instantiate(prefab) as Node;
                ui_root.addChild(obj);
            })
        })
    }
}


