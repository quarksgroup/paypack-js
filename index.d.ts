export type PaypackConfig = {
    client_id: string;
    client_secret: string;
}

export type PaypackParams = {
    amount: number;
    number: string;
}

export type PaypackFilters = {
    limit?: number;
    offset?: number;
    from?: string;
    to?: string;
    kind?: string;
    client?: number;
}

export type PaypackEventsFilters = PaypackFilters & {
    ref?: string;
    status?: string;
}


export class Paypack {
    constructor(config?: PaypackConfig);
    config(config: PaypackConfig): void;
    transactions(filters: PaypackFilters): Promise<any>;
    transaction(ref: string): Promise<any>;
    cashin(params: PaypackParams): Promise<any>;
    cashout(params: PaypackParams): Promise<any>;
    events(filters: PaypackEventsFilters): Promise<any>;
    me(): Promise<any>;
}

export interface PaypackStatic extends Paypack {
    new(config?: PaypackConfig): Paypack;
}

declare const Paypack: PaypackStatic;

export default Paypack;