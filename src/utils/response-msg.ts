interface ResponseMsg {
    status: number,
    msg: string,
    data: any
}

export function ok(msg: string, data: any = null): ResponseMsg {
    return { status: 200, msg: msg, data: data };
}

export function error(msg: string, data: any = null): ResponseMsg {
    return { status: 500, msg: msg, data: data };
}