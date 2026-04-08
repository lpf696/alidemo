import { GameView } from "../../modules/game/view/GameView";
import { MainView } from "../../modules/main/view/MainView";
import { UILayout } from "./UILayout";
import { UINameDef } from "./UINameDef";

//可以用装饰器
export function UIView(target, args?){
      
}


export class UIDefine {

    /**
     * 注册界面  todo 设置界面parent、缓存模式 等等
     */
    public static registerWidgets()
    {
        UILayout.Ins().registerWidget(UINameDef.GameView, new GameView());
        UILayout.Ins().registerWidget(UINameDef.MainView, new MainView());
    }
}