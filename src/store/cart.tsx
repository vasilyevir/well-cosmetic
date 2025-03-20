import { createStore } from "zustand";
import { ProductType } from "@/api";
import { devtools } from "zustand/middleware";

export type ProductCartType = ProductType & {
  amountSelected: number;
};

interface ICartStoreState {
  cart: ProductCartType[];
  amount: number;
  priceTotal: number;
}

interface ICartStoreAction {
  addCartItem: (product: ProductType) => void;
  sellCartItem: (id: number) => void;
  deleteCartItem: (id: number) => void;
  clearCart: () => void;
}

export type ICartStore = ICartStoreState & ICartStoreAction;

export const defaultInitState: ICartStoreState = {
  cart: [],
  amount: 0,
  priceTotal: 0,
};

export const createCartStore = (initState: ICartStoreState = defaultInitState) => {
  return createStore<ICartStore>()(
    devtools((set) => ({
      ...initState,
      sellCartItem: (id) =>
        set((state) => {
          const selectedProduct = state.cart.find((product) => product.id === id);
          const price = selectedProduct?.price_with_sale
            ? selectedProduct.price_with_sale
            : selectedProduct?.price;

          if (selectedProduct?.amountSelected === 1) {
            return {
              ...state,
              cart: state.cart.filter(({ id: idProduct }) => idProduct !== id),
              amount: state.amount - 1,
              priceTotal: state.priceTotal - (price || 0),
            };
          }

          return {
            ...state,
            cart: state.cart.map((product) => {
              if (product.id !== id) return product;

              return {
                ...product,
                amountSelected: product.amountSelected - 1,
              };
            }),
            amount: state.amount - 1,
            priceTotal: state.priceTotal - (price || 0),
          };
        }),
      addCartItem: (product) =>
        set((state) => ({
          ...state,
          cart: state.cart.find((el) => el.id === product.id)
            ? state.cart.map((cart) => {
                if (cart.id === product.id) {
                  return {
                    ...cart,
                    amountSelected: cart.amountSelected + 1,
                    id: cart.id,
                  };
                }

                return cart;
              })
            : [
                ...state.cart,
                {
                  ...product,
                  amountSelected: 1,
                },
              ],
          priceTotal:
            state.priceTotal + (product.price_with_sale ? product.price_with_sale : product.price),
          amount: state.amount + 1,
        })),
      clearCart: () => set(defaultInitState),
      deleteCartItem: (id) => {
        set((state) => {
          const selectedItem = state.cart.find((el) => el.id === id);
          if (selectedItem?.id) {
            return {
              ...state,
              cart: state.cart.filter(({ id: idProduct }) => idProduct !== id),
              amount: state.amount - 1,
              priceTotal:
                state.priceTotal -
                (selectedItem?.price_with_sale
                  ? selectedItem?.price_with_sale
                  : selectedItem.price) *
                  (selectedItem?.amountSelected || 0),
            };
          }

          return state;
        });
      },
    })),
  );
};
