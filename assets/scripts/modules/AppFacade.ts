import { BaseMediator } from "../core/puremvc/BaseMediator";
import { BaseProxy } from "../core/puremvc/BaseProxy";
import { Facade } from "../core/puremvc/Puremvc";
import { AppProxyName } from "./AppProxyName";
import { GameMediator } from "./game/GameMediator";
import { GameProxy } from "./game/GameProxy";
import { MainProxy } from "./main/MainProxy";
import { PreloadingProxy } from "./preloading/PreloadingProxy";
import { RoleDataManager } from "./role/RoleDataManager";

export class AppFacade {

    private static _instance: AppFacade;

    public static Ins() {
        if (AppFacade._instance == null) {
            AppFacade._instance = new AppFacade();
        }
        return AppFacade._instance;
    }

    public init(): void {
        console.log(`AppFacade init`);

        this._registerProxy(new PreloadingProxy(AppProxyName.Preloading));

        this._registerProxy(new MainProxy(AppProxyName.Main));

        this._registerProxy(new GameProxy(AppProxyName.Game));
        this._registerMediator(new GameMediator());
    }

    private _registerProxy(proxy: BaseProxy) {
        Facade.getInstance().registerProxy(proxy);
    }

    private _registerMediator(mediator: BaseMediator) {
        Facade.getInstance().registerMediator(mediator);
    }
}
