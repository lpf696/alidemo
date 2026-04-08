import { sys } from "cc";

/**
 * 本地数据存储
 */
export class DataManager {

    private static _ins: DataManager;
    public static get Ins(): DataManager {
        if (this._ins == null) {
            this._ins = new DataManager();
        }
        return this._ins;
    }

    public set(key:string, value:any)
    {
        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                console.error(`解析失败, str = ${value}`);
                return;
            }
        }
        sys.localStorage.setItem(key, value);
    }

    public get(key:string, defaultValue?:any):any
    {
        let str: string | null = sys.localStorage.getItem(key);
        if (null === str) {
            return defaultValue;
        }
        return str;
    }
}