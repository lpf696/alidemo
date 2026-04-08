import { _decorator, Component, director, game, Node } from 'cc';
import { SystemConfig } from '../lanuch/SystemConfig';
import { UILayout } from './core/ui/UILayout';
import { Facade } from './core/puremvc/Puremvc';
import { AppFacade } from './modules/AppFacade';
import { PreloadingProxy } from './modules/preloading/PreloadingProxy';
import { AppProxyName } from './modules/AppProxyName';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        this._init();
    }

    private _init(): void {
        if (this._isInit == false) {
            this._isInit = true;

            game.frameRate = SystemConfig.FrameRate;    
            
            UILayout.Init();
            AppFacade.Ins().init();

            let preloadingProxy = Facade.getInstance().retrieveProxy(AppProxyName.Preloading) as PreloadingProxy;
            preloadingProxy.start();
        } 
    }

    private _isInit: boolean = false;
}


