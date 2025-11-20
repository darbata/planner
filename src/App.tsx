import {Planner} from "./planner/Planner.tsx";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";

export function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
                retry: 1,
            },
        },
    });


    return (
        <QueryClientProvider client={queryClient}>
            <Planner />
        </QueryClientProvider>
    )
}