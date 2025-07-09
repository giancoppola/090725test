import type {iLotteryApiResponse} from "./types.ts";
const url = "http://localhost:4000/lottery"

export const FetchLotteryData = async (): Promise<iLotteryApiResponse> => {
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