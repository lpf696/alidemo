import { BaseMediator } from "../../core/puremvc/BaseMediator";
import { INotification } from "../../core/puremvc/Puremvc";
import { UILayout } from "../../core/ui/UILayout";
import { UINameDef } from "../../core/ui/UINameDef";
import { AppProxyName } from "../AppProxyName";
import { GameNotifyDef } from "./GameDef";
import { GameProxy } from "./GameProxy";

export class GameMediator extends BaseMediator {
    constructor() {
        super("GameMediator");
    }

    public listNotificationInterests(): string[] {
        return [AppProxyName.Game];
    }

    public handleNotification(notification: INotification): void {
        if (notification.getName() == AppProxyName.Game) {
            let notification_type = notification.getType();
            switch (notification_type) {
                case GameNotifyDef.StartGame:
                    let gameProxy: GameProxy = this.retrieveProxy(AppProxyName.Game) as GameProxy;
                    gameProxy.startGame(notification.getBody());
                    break;
                case GameNotifyDef.EndGame:
                    UILayout.Ins().closeWidget(UINameDef.GameView);
                    UILayout.Ins().openWidget(UINameDef.MainView);
                    break;
                default:
                    break;
            }
        }
    }
}