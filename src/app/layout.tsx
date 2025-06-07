// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Filter E-commerce",
	description: "E-commerce testing using NextJS by Chapa",
};

// 1. Función para obtener las categorías
async function getCategories() {
	try {
		const res = await fetch("https://fakestoreapi.com/products/categories");
		if (!res.ok) {
			return []; // Devuelve un array vacío si la API falla
		}
		const categories: string[] = await res.json();
		return categories;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return []; // Devuelve un array vacío en caso de error de red
	}
}

// 2. Convertimos el Layout en una función async
export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// 3. Obtenemos las categorías al renderizar el layout en el servidor
	const categories = await getCategories();

	return (
		<html lang="en">
			<body>
				<header>
					<nav className="bg-amber-500 p-10 flex justify-center gap-5">
						<Link
							href="/"
							className="text-xl font-bold p-2 bg-amber-600 hover:bg-amber-700 hover:px-3 rounded-md transition-all"
						>
							Home
						</Link>

						<div className="relative group">
							<button className="text-xl font-bold p-2 bg-amber-600 hover:bg-amber-700 rounded-md transition-all">
								Categories
							</button>
							{/* Contenedor del menú desplegable */}
							<div className="absolute hidden group-hover:block bg-amber-600 rounded-md shadow-lg z-10 w-56">
								{/* 4. Mapeamos el array de categorías para crear los Links */}
								{categories.map((category) => (
									<Link
										key={category}
										// La ruta debe coincidir con tu estructura de archivos dinámicos
										href={`/category/${category}`}
										className="block px-4 py-2 text-xl font-bold hover:bg-amber-700 transition-all capitalize"
									>
										{category}
									</Link>
								))}
							</div>
						</div>
					</nav>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}