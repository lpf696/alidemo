
export class SystemConfig {

    private static _data: any = null;

    public static init(config: any): void {
        let data = config.json
        this._data = Object.freeze(data);
    }

    public static get DebugModel(): number {
        return this._data.config.debugModel;
    }

    public static get FrameRate(): number {
        return this._data.config.FrameRate;
    }
}


