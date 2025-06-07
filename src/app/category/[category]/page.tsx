import Image from "next/image";
import { ProductInterface } from "@/app/types/apiType";

async function getProductsByCategory(category: string) {
	const res = await fetch(
		`https://fakestoreapi.com/products/category/${category}`
	);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const products: ProductInterface[] = await res.json();
	return products;
}

export default async function CategoryPage({params }: {params: { category: string };}) {
	const decodedCategory = decodeURIComponent(params.category);

	// Llamamos a la función para obtener los productos de esta categoría
	const products = await getProductsByCategory(decodedCategory);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 capitalize border-b pb-2">
				{decodedCategory}
			</h1>

			{/* Reutilizamos el código que ya tenías para listar los productos */}
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products.map((product) => (
					<li
						key={product.id}
						className="border rounded-lg p-4 flex flex-col items-center text-center shadow-lg"
					>
						<div
							style={{
								position: "relative",
								width: "150px",
								height: "150px",
							}}
						>
							<Image
								src={product.image}
								alt={"Picture of " + product.title}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<h2 className="text-lg font-semibold mt-4 h-16">
							{product.title}
						</h2>
						<p className="text-xl font-bold mt-2">
							${product.price}
						</p>
						{/* Opcional: un botón para ver el detalle del producto */}
						{/* <Link href={`/producto/${product.id}`} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Ver Producto
            </Link> */}
					</li>
				))}
			</ul>
		</div>
	);
}
