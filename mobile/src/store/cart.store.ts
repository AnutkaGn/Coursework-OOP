import { CartItem } from "src/modules/cart/types/cart.types";
import { create } from "zustand";

interface CartStore {
	cart: CartItem[];
	addItemToCart: (item: CartItem) => void;
	removeItemFromCart: (id: string) => void;
	updateItemAmount: (id: string, amount: number) => void;
	getItemAmount: (id: string) => number;
	getTotalItems: () => number;
	totalPrice: number;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
	cart: [],
	totalPrice: 0,

	addItemToCart: (item) =>
		set((state) => {
			const existingItem = state.cart.find(
				(cartItem) => cartItem.id === item.id,
			);

			let updatedCart;
			if (existingItem) {
				updatedCart = state.cart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, amount: cartItem.amount + item.amount }
						: cartItem,
				);
			} else {
				updatedCart = [...state.cart, item];
			}

			const totalPrice = updatedCart.reduce(
				(total, cartItem) => total + cartItem.amount * cartItem.price,
				0,
			);

			return {
				cart: updatedCart,
				totalPrice,
			};
		}),

	removeItemFromCart: (id) =>
		set((state) => {
			const updatedCart = state.cart.filter((item) => item.id !== id);
			const totalPrice = updatedCart.reduce(
				(total, cartItem) => total + cartItem.amount * cartItem.price,
				0,
			);
			return {
				cart: updatedCart,
				totalPrice,
			};
		}),

	updateItemAmount: (id, quantity) =>
		set((state) => {
			const updatedCart = state.cart.map((item) =>
				item.id === id ? { ...item, amount: quantity } : item,
			);
			const totalPrice = updatedCart.reduce(
				(total, cartItem) => total + cartItem.amount * cartItem.price,
				0,
			);
			return {
				cart: updatedCart,
				totalPrice,
			};
		}),

	getItemAmount: (id) => {
		const item = get().cart.find((cartItem) => cartItem.id === id);
		return item ? item.amount : 0;
	},
	getTotalItems: () => {
		return get().cart.length;
	},
	clearCart: () => set({ cart: [], totalPrice: 0 }),
}));
