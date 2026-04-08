import { DataManager } from "../../core/data/DataManager";

export class RoleDataManager {

    private static _stage:number;

    public static Init()
    {
        this._stage = parseInt(DataManager.Ins.get("XXL_Stage", "1"));
    }

    public static get stage():number
    {
        return this._stage;
    }

    public static set stage(value)
    {
        this._stage = value;
        DataManager.Ins.set("XXL_Stage", this._stage.toString());
    }
}