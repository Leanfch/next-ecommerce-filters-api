import { ProductInterface } from "../types/apiType";

async function getProducts(): Promise<ProductInterface[]> {
    try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
            throw new Error("Error fetching the products data");
        }
        const data: ProductInterface[] = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export default getProducts