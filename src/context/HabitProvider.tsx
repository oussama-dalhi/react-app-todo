import {
  type ReactNode,
} from "react";
import { isSameDay } from "date-fns"
import {type Habit, HabitContext} from "./HabitContext"
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
        const [habits, setHabits] = useLocalStorage<Habit[]>("Habit", []);

        function addHabit(name: string) {
            setHabits((curr) => [
            ...curr,
            {
            id: crypto.randomUUID(),
            name,
            completions: [],
            },
            ]);
        }

        function deleteHabit(id: string) {
            setHabits((curr) => curr.filter((h) => h.id !== id));
        }

        function toggleHabit(id: string, date: Date) {
            setHabits((curr) =>
            curr.map((h) => {
            if (h.id !== id) return h;

            const alreadyDone = h.completions.some((c) =>
            isSameDay(c, date)
            );

            const completions = alreadyDone
            ? h.completions.filter((c) => !isSameDay(c, date))
            : [...h.completions, date];

            return { ...h, completions };
            })
            );
        }

    return (
    <HabitContext.Provider
    value={{ habits, addHabit, toggleHabit, deleteHabit }}
    >
    {children}
    </HabitContext.Provider>
    );
}