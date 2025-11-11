import {Day} from "./Day.tsx";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";

// must fetch all the tasks given the list of dates to fetch for
export function WeeklyView({ dates }: { dates: string[] }) {

    function handleDragEnd(event : DragEndEvent) {
        console.log(event);
        // get task
        // remove from old day
        // add to new day
    }

    return (
        <DndContext onDragEnd={handleDragEnd} >
            {dates.map((date) => (
                <Day
                    key={date}
                    date={date}
                />
            ))}
        </DndContext>
    );
}