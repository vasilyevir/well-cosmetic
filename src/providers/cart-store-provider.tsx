// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ICartStore, createCartStore } from "@/store/cart";

export type CounterStoreApi = ReturnType<typeof createCartStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const CartStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: ICartStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
