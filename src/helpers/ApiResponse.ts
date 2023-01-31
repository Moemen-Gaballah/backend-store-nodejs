export function apiResponse(data: object|string | null = null, status: number = 200, msg: string | null = null) {
    return {data, status, msg};
}
