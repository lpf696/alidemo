import { BaseProxy } from "../../core/puremvc/BaseProxy";
import { UILayout } from "../../core/ui/UILayout";
import { UINameDef } from "../../core/ui/UINameDef";

export class GameProxy extends BaseProxy {


    public startGame(stage:number)
    {
        //todo init stage cfg
        UILayout.Ins().openWidget(UINameDef.GameView);
    }
}