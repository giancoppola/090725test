import {useEffect, useState} from 'react'
import type {AppView, iLotteryDraw, iLotteryTickets} from "./types.ts";
import {Button, Flex, Heading, Spinner, Table, Text} from "@radix-ui/themes";
import {FetchLotteryData} from "./api-calls.ts";

function App() {
    const [view, setView] = useState<AppView>("UPCOMING");
    const [loading, setLoading] = useState<boolean>(true);
    const [errMsg, setErrMsg] = useState<string>("");
    const [userTickets, setUserTickets] = useState<iLotteryTickets>()
    const [lotteryDraws, setLotteryDraws] = useState<iLotteryDraw[]>([])
    const [nextLotteryDraw, setNextLotteryDraw] = useState<iLotteryDraw | null>(null);
    const SwitchView = () => {
        if (view === "UPCOMING") setView("PAST")
        else setView("UPCOMING");
    }
    const GetLotteryData = async () => {
        setLoading(true);
        setErrMsg("");
        const response = await FetchLotteryData();
        if (response.complete) {
            setLoading(false);
            setNextLotteryDraw(response.data!.draws.current);
            setUserTickets(response.data!.userTickets);
            setLotteryDraws(response.data!.draws.previous);
        }
        else {
            setLoading(false);
            setErrMsg(response.msg!);
        }
    }
    useEffect(() => {
        GetLotteryData()
    }, []);
    return (
        <Flex style={{ margin: "auto" }} minHeight="100dvh" justify="center" align="center" direction="column" gap="2rem">
            <Heading as="h1" size="9" weight="bold">Lottery Test</Heading>
            { loading &&
                <Spinner size="3"/>
            }
            { !loading &&
                <Flex direction="column" gap="1rem" justify="center">
                { !errMsg && view === "UPCOMING" &&
                    <>
                        <Heading as="h2">Upcoming Draw</Heading>
                        { nextLotteryDraw && <Text>The next draw is on {new Date(nextLotteryDraw.date).toDateString()}</Text> }
                        { userTickets &&
                            <Text>Your numbers are {userTickets.current.numbers.join(" ")}</Text>
                        }
                    </>
                }
                { !errMsg && view === "PAST" &&
                    <>
                        <Heading as="h2">Previous Draws</Heading>
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Draw</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Your Numbers</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            { lotteryDraws.map((draw) =>
                                <Table.Row>
                                        <Table.Cell>{new Date(draw.date).toDateString()}</Table.Cell>
                                        <Table.Cell>{draw.numbers.join(" ")}</Table.Cell>
                                        <Table.Cell>{userTickets!.previous.find((ticket) => ticket.date === draw.date)?.numbers.join(" ") || "No entry"}</Table.Cell>
                                </Table.Row>
                            )}
                            </Table.Body>
                        </Table.Root>
                    </>
                }
                <Button onClick={SwitchView}>View {view === "UPCOMING" ? "Past Draws" : "Upcoming Draws"}</Button>
                </Flex>
            }
        </Flex>
    )
}

export default App
