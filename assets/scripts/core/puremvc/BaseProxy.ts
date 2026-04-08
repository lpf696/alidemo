import { Facade, Proxy } from "./Puremvc";

export class BaseProxy extends Proxy {
    constructor(proxyName: string = "", data: any = null) {
        super(proxyName, data)
    }

    protected retrieveProxy<T>(proxyName: string) : T {
        return Facade.getInstance().retrieveProxy(proxyName) as T;
    }

     public sendNotify(type: string, body?: any): void {
        this.sendNotification(this.proxyName, body, type);
    }
}