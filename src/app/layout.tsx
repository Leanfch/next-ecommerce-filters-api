import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Filter E-commerce",
	description: "E-commerce testing using NextJS by Chapa",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
