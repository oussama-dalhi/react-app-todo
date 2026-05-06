import { Button } from "./button";
import { eachDayOfInterval, startOfWeek, endOfWeek, format, isFuture } from 'date-fns'
type Habit = {
    id: string;
    name: string;
};

export function HabitList() {
    const habits: Habit[] = [
        {id : '1', name: 'Go to the GYM'}
    ];
    if(habits.length === 0) 
        return <p className="text-center text-zinc-500 py-12">
            No habits yet. Add one above to get started
            </p>
    return (
        <div className="flex flex-col gap-3">
        {habits.map((habit) => (
            <HabitItem key={habit.id} habit = {habit} />
        ))}
    </div>
    )
}

type HabitItemProps = {
    habit: Habit;
};
function HabitItem({habit}: HabitItemProps) {
    const visibleDates = eachDayOfInterval({
            start: startOfWeek(new Date(), { weekStartsOn: 1}), 
            end: endOfWeek(new Date(), { weekStartsOn: 1})
    }); 
    return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-amber-400">🔥 3</span>
            </div>
            
            <Button variant="ghost-destructive" className="text-sm">Delete</Button>
        </div>
        <div className="flex gap-1.5">
            {visibleDates.map(date => (
                <Button className="flex-1 flex flex-col items-center gap-0.5 
                rounded-lg text-xs" key={date.toISOString()} disabled={isFuture(date)}>
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span>{format(date, "d")}</span>
                </Button>
            ))}
        </div>
    </div>
    )
}