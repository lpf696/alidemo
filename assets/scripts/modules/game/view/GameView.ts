import { Button, Node, NodeEventType } from "cc";
import { BaseWidget } from "../../../core/ui/view/UIBaseWidget";
import { Facade } from "../../../core/puremvc/Puremvc";
import { AppProxyName } from "../../AppProxyName";
import { GameNotifyDef } from "../GameDef";

export class GameView extends BaseWidget {

    private _btnExit:Button;
    protected onLoad(): void {
        this.loadWidget("game/GameView", (obj: Node) => {
            this._onLoadEnd(obj);
        })
    }

    private _onLoadEnd(obj: Node): void {
        this.go = obj;
        this._onInitUI();
        this.step(1);
    }

    private _onInitUI() {
       this._btnExit = this.go.getChildByName("BtnExit").getComponent(Button);
       this._btnExit.node.on(NodeEventType.TOUCH_END, this._onClickBtnExit.bind(this));
    }

    protected onOpen(): void {
        this._createBottles();
    }

    private _createBottles()
    {
        //TODO
        //1、根据难度配置初始化瓶子
        //主要三个难度系数:空瓶子数量、初始水分的最小粒度、水的颜色种类
        //2、初始化瓶子完成后  自动倒水  完成随机初始状态
    }

    protected onClose(): void {
        
    }

    private _onClickBtnExit()
    {
        Facade.getInstance().sendNotification(AppProxyName.Game, null, GameNotifyDef.EndGame);
    }
}