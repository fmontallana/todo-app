import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodosStore = create(
    persist(
        (set, get) => ({
            todos: [],
            asd: "asd",
            sdf: "asdf",
            addAFish: () => set({ fishes: get().fishes + 1 }),
        }),
        {
            name: "todos",
        }
    )
);
