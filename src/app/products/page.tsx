"use client";
import { useState, useEffect } from "react";
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

export default function ProductList() {
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadProducts() {
			setIsLoading(true);
			setError(null);
			try {
				const data = await getProducts();
				setProducts(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(
						"Ocurrió un error inesperado al cargar los productos."
					);
				}
			} finally {
				setIsLoading(false);
			}
		}

		loadProducts();
	}, []);

	if (isLoading) {
		return <p>Loading products...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<ul>
			{products.map((product: ProductInterface) => (
				<li key={product.id}>
                    <h2>
                        {product.title}
                    </h2>
                    <h3>{product.category}</h3>
                    <p>{product.description}</p>
                </li>
			))}
		</ul>
	);
}
