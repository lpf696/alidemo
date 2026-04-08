/**
 * 全局配置管理器
 */
export class ConfigManager {

    private static _configDict:{[key:string]:Record<string, any>} = {};

    public static setConfig(name:string, data:Record<string, any>) {
        ConfigManager._configDict[name] = data;
    }

    public static getConfig(name:string):Record<string, any> {
        return ConfigManager._configDict[name];
    }
}