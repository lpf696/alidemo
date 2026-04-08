import { director, Node, UITransform } from "cc";
import { BaseWidget } from "./view/UIBaseWidget";
import { UIDefine } from "./UIDefine";

export class UILayout {

    private static _uiRoot: Node;
    private static _uiTransform: UITransform;
    
    private _widgetMap: Map<string, BaseWidget> = null;
    constructor() {
        this._widgetMap = new Map<string, BaseWidget>();
    }

    private static _instance: UILayout;
    public static Ins(): UILayout {
        if (this._instance == null) {
            this._instance = new UILayout();
        }
        return this._instance;
    }

    public static Init(): void {
        this._uiRoot = director.getScene().getChildByName("UIRoot");
        this._uiTransform = this._uiRoot.getComponent(UITransform);

        UIDefine.registerWidgets();
    }

    public static get UIRoot() {
        if (this._uiRoot == null) {
            this._uiRoot = director.getScene().getChildByName("UIRoot");
        }
        return this._uiRoot;
    }

    public registerWidget(widgetName:string, widget:BaseWidget)
    {
        this._widgetMap[widgetName] = widget;
    }

    public openWidget(widgetName:string)
    {
        this._widgetMap[widgetName]?.load();
    }

    public closeWidget(widgetName:string)
    {
        this._widgetMap[widgetName]?.close();
    }
}