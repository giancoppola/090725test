export interface iLotteryDraw {
    numbers: number[];
    date: string;
}

export interface iLotteryTickets {
    previous: iLotteryDraw[];
    current: iLotteryDraw;
}

export interface iLotteryData {
    draws: iLotteryTickets;
    userTickets: iLotteryTickets;
}

export interface iLotteryApiResponse {
    complete: boolean;
    msg?: string;
    data?: iLotteryData;
}

export type AppView = "UPCOMING" | "PAST";