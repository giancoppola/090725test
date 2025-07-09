import type {iLotteryApiResponse} from "./types.ts";

export const FetchLotteryData = async (): Promise<iLotteryApiResponse> => {
    const url = "http://localhost:3000/lottery";
    try {
        const response = await fetch(url);
        return {
            complete: true,
            data: await response.json()
        };
    }
    catch (error) {
        console.error(error);
        return {
            complete: false,
            msg: (error as Error).message
        }
    }
}