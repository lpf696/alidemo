import { Button, Label, Node } from "cc";
import { BaseWidget } from "../../../core/ui/view/UIBaseWidget";
import { UILayout } from "../../../core/ui/UILayout";
import { RoleDataManager } from "../../role/RoleDataManager";
import { MainProxy } from "../MainProxy";
import { AppProxyName } from "../../AppProxyName";
import { Facade } from "../../../core/puremvc/Puremvc";
import { GameNotifyDef } from "../../game/GameDef";

export class MainView extends BaseWidget {

    private _txtLevel:Label;
    private _btnStart:Button;

    private _isFirstOpen:boolean = true;

    protected onLoad(): void {
        this.loadWidget("main/MainView", (obj:Node) => {
            this._onLoadEnd(obj);
        })
    }

    private _onLoadEnd(obj: Node): void {
        this.go = obj;
        this._onInitUI();
        this.step(1);
    }

    private _onInitUI()
    {
        this._txtLevel = this.go.getChildByName("TxtLevel").getComponent(Label);
        this._btnStart = this.go.getChildByName("BtnStart").getComponent(Button);
        this._btnStart.node.on(Node.EventType.TOUCH_END, this._onClickBtnStart.bind(this));
    }

    protected onOpen(): void {
        this._destroyPreLoginView();
        this._initStageData();

        this._isFirstOpen = false;
    }

    private _destroyPreLoginView()
    {
        if (this._isFirstOpen) {
            let preLoginView = UILayout.UIRoot.getChildByName("PreLoginView");
            preLoginView.destroy();   
        }
    }

    private _initStageData()
    {
        let stage = RoleDataManager.stage;
        this._txtLevel.string = `第${stage}关`;
    }

    private _onClickBtnStart()
    {
        Facade.getInstance().sendNotification(AppProxyName.Game, RoleDataManager.stage, GameNotifyDef.StartGame);
        this.close();
    }

    protected onClose(): void {
        
    }
}