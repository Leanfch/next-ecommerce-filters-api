"use client";
import { useState, useEffect } from "react";
import { ProductInterface } from "../types/apiType";
import getProducts from "../data/getProducts";
import Image from "next/image";

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
		<ul className="grid grid-cols-7 gap-2 bg-amber-300">
			{products.map((product: ProductInterface) => (
				<li key={product.id} className="bg-gray-100 p-2 rounded-xl text-center flex flex-col">
                    <div className="w-3xs">
                        <Image src={product.image} alt={"Picture" + product.title} width={120} height={1} className="w-28 h-auto"/>
                    </div>
                    <h2 className="font-bold text-xl leading-6">{product.title}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                </li>
			))}
		</ul>
	);
}
