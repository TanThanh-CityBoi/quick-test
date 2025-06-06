export type CreateModalPayload = {
    type: string;
    sub: {
        messageKey?: string;
        messageArg?: Object;
        confirmButtonKey?: string;
        cancelButtonKey?: string;
    };
};
