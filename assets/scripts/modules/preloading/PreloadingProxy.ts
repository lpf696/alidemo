import { JsonAsset } from "cc";
import { AssetLoader } from "../../core/asset/AssetLoader";
import { ConfigManager } from "../../core/config/ConfigManager";
import { BaseProxy } from "../../core/puremvc/BaseProxy";
import { RoleDataManager } from "../role/RoleDataManager";
import { UILayout } from "../../core/ui/UILayout";
import { UINameDef } from "../../core/ui/UINameDef";

export class PreloadingProxy extends BaseProxy {
    
    public start()
    {
        this._loadAssetBundle();
    }

    private _loadAssetBundle() {
        console.log("start load asset bundle ...")
        AssetLoader.loadAssetsBundle(() => {
            console.log("load asset bundle succ !")
            this._loadConfigAndInit();
        });
    }

    private _loadConfigAndInit(): void {
        console.log("start load config ...")
        AssetLoader.loadConfigBundle((bundle) => {
            bundle.loadDir<JsonAsset>("", (err, data) => {
                console.log("load config succ !")
                data.forEach(element => {
                    ConfigManager.setConfig(element.name, element.json);
                });

                this._initRoleData();
            })
        });
    }

    private _initRoleData()
    {
        RoleDataManager.Init();

        //模拟加载
        setTimeout(() => {
            this._openMainView();
        }, 1000);
    }

    private _openMainView()
    {
        UILayout.Ins().openWidget(UINameDef.MainView);
    }
}