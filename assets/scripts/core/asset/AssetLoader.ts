import { Asset, assetManager, AssetManager, Prefab } from "cc";

export class AssetLoader {
    private static ASSETS_BUNDLE_NAME: string = "art";
    private static CONIFG_BUNDLE_NAME: string = "config";
    
    private static _assets_bundle: AssetManager.Bundle;
    private static _assetsDict: { [key: string]: any } = {};

    public static loadAssetsBundle(callback) {
        assetManager.loadBundle(this.ASSETS_BUNDLE_NAME, (err, bundle) => {
            console.log("assets bundle load succ!");
            AssetLoader._assets_bundle = bundle;
            callback();
        })
    }

    public static loadConfigBundle(callback?: ((data: AssetManager.Bundle) => void) | null) {
        assetManager.loadBundle(this.CONIFG_BUNDLE_NAME, (err, bundle) => {
            callback(bundle);
        })
    }

    private static _getBundleRes<T extends Asset>(res_path: string, callback?: ((err: Error | null, data: T) => void) | null) {
        AssetLoader._assets_bundle.load<T>(res_path, callback);
    }

    public static loadUIPrefab(prefabFakePath: string, callback?: ((data: Prefab) => void) | null) {
        let pathInfo: string[] = prefabFakePath.split("/");
        let prefabPath = "ui/" + pathInfo[0] + "/prefabs/" + pathInfo[1]
        AssetLoader.loadAsset<Prefab>(prefabPath, callback)
    }

    /**
     * 通用资源加载
     * @param assetPath _assets目录下资源全路径
     * @param callback 
     */
    public static loadAsset<T extends Asset>(assetPath: string, callback?: ((data: T) => void) | null) {
        AssetLoader._getAsset(assetPath, this._getBundleRes, callback);
    }

    private static _getAsset<T extends Asset>(res_path: string, load_func, callback?: ((data: T) => void) | null) {
        let asset: T;
        if (res_path in AssetLoader._assetsDict) {
            asset = AssetLoader._assetsDict[res_path];
            if (asset.isValid) {
                callback(asset);    
                return;
            } else {
                delete AssetLoader._assetsDict[res_path];
            }  
        }
        load_func(res_path, function (err, data) {
            if (err != null) {
                console.warn("get res fail:", err.message);
                callback(null);
            } else {
                AssetLoader._assetsDict[res_path] = data;
                callback(data);
            }
        });
    }

    private static _deleteAsset(asset) {
        for (const key in AssetLoader._assetsDict) {
            if (AssetLoader._assetsDict[key] == asset) {
                delete AssetLoader._assetsDict[key];
                break;
            }
        }
    }

    public static releaseAsset(asset: Asset) {
        AssetLoader._deleteAsset(asset);
        assetManager.releaseAsset(asset);
    }
}