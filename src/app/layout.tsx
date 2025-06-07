import type { Metadata } from "next";
import './globals.css';
import Link from "next/link";

export const metadata: Metadata = {
	title: "Filter E-commerce",
	description: "E-commerce testing using NextJS by Chapa",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
            <header>
                <nav className="bg-amber-500 p-10 flex gap-5">
                    <Link href="/" className="text-xl font-bold">Home</Link>
                    <Link href="/products" className="text-xl font-bold">Products</Link>
                </nav>
            </header>
                {children}
            </body>
		</html>
	);
}
