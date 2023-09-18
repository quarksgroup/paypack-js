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

export type PaypackTransaction = {
    ref: string;
    amount: number;
    status: string;
    kind: string;
    provider: string;
    created_at: string;
}

export type PaypackRawTransaction = {
    ref: string;
    user_ref: string;
    amount: number;
    fee: number;
    kind: string;
    provider: string;
    client: string;
    metadata: any;
    merchant: string;
    timestamp: string;
}

export type PaypackTransactionEvent = {
    ref: string;
    user_ref: string;
    kind: string;
    merchant: string;
    client: string;
    amount: number;
    provider: string;
    fee: number;
    status: string;
    metadata: any;
    created_at: string;
    processed_at: string;
}

export type PaypackEvent = {
    event_id: string;
    event_kind: string;
    created_at: string;
    data: PaypackTransactionEvent;
}

export type PaypackMerchant = {
    id: string;
    name: string;
    in_rate: number;
    out_rate: number;
    airtel_in_rate: number;
    airtel_out_rate: number;
    mtn_balance: number;
    airtel_balance: number;
    balance: number;
}

export type PaypackTransactionsResponse = {
    data: {
        offset: number;
        limit: number;
        cashin: number;
        cashout: number;
        fee: number;
        total: number;
        transactions: PaypackRawTransaction[];
    },
}

export type PaypackEventsResponse = {
    data: {
        offset: number;
        limit: number;
        total: number;
        transactions: PaypackEvent[];
    }
}

export type PaypackTransactionResponse = {
    data: PaypackRawTransaction;
};

export type PaypackProfileResponse = {
    data: PaypackMerchant;
};

export type PaypackCashinResponse = {
    data: PaypackTransaction;
}

export type PaypackCashoutResponse = {
    data: PaypackTransaction;
}

export class Paypack {
    constructor(config?: PaypackConfig);
    config(config: PaypackConfig): Paypack;
    transactions(filters: PaypackFilters): Promise<PaypackTransactionsResponse>;
    transaction(ref: string): Promise<PaypackTransactionResponse>;
    cashin(params: PaypackParams): Promise<PaypackCashinResponse>;
    cashout(params: PaypackParams): Promise<PaypackCashoutResponse>;
    events(filters: PaypackEventsFilters): Promise<PaypackEventsResponse>;
    me(): Promise<PaypackProfileResponse>;
}

export interface PaypackStatic extends Paypack {
    new(config?: PaypackConfig): Paypack;
}

declare const Paypack: PaypackStatic;

export default Paypack;