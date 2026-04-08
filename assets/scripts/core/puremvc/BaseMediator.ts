import { AppProxyName } from "../../modules/AppProxyName";
import { Facade, Mediator } from "./Puremvc";

export class BaseMediator extends Mediator {
    constructor(mediatorName: string = "") {
        super(mediatorName)
    }

    public retrieveProxy<T>(proxyName: string): T {
        return Facade.getInstance().retrieveProxy(proxyName) as T;
    }

    public listNotificationInterests(): string[] {
        return this.subListNotificationInterests();
    }

    protected subListNotificationInterests(): string[] {
        //return [AppProxyName.Game];
        return [AppProxyName.Game];
    }
}