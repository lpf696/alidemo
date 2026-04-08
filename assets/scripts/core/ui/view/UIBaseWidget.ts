import { instantiate, Node, Prefab } from "cc";
import { UILayout } from "../UILayout";
import { Facade, INotification } from "../../puremvc/Puremvc";
import { AssetLoader } from "../../asset/AssetLoader";

/** 界面基类 */
export class BaseWidget {

    private _go:Node;
    protected assetName: string;

    constructor()
    {
        
    }

    public load()
    {
        if (this._go) {
            this.open();
        } else {
            this.onLoad();
        }
    }

    protected loadWidget(assetName: string, callback?: ((data: Node) => void) | null) {
        this.assetName = assetName;

        AssetLoader.loadUIPrefab(assetName, (prefab: Prefab) => {
            if (prefab) {
                callback(instantiate(prefab));
            }
        });
    }

    protected onLoad()
    {

    }

    public set go(go:Node)
    {
        this._go = go;
        this._go.setParent(UILayout.UIRoot);
    }

    public get go() {
        return this._go;
    }

    public open()
    {
        if(this._go) this._go.active = true;
        this.onOpen();
    }

    protected onOpen()
    {
        
    }

    public close()
    {
        if(this._go) this._go.active = false;
        this.onClose();
    }
    protected onClose()
    {

    }

    public onDestroy()
    {

    }

    private _step: number = 0;
    private _stepCount: number = 0;
    public setStepCount(stepCount: number) {
        this._stepCount = stepCount;
        this._step = 0;
    }

    public step(step: number): void {
        this._step += step;
        if (this._stepCount <= this._step) {
            this._step = this._stepCount;
            this._stepEnd();
        }
    }

    private _stepEnd(): void {
        this.open();
    }

    public retrieveProxy<T>(proxyName: string): T {
        return Facade.getInstance().retrieveProxy(proxyName) as T;
    }

    protected listNotificationInterests(): string[] {
        return [];
    }

    protected handleNotification(notification: INotification): void {

    }
}