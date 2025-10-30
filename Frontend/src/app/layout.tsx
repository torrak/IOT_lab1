import type { Metadata } from 'next';
import { Istok_Web } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

const istok_web = Istok_Web({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-istok-web',
});

export const metadata: Metadata = {
	title: 'C-V2X',
	description: 'Cellular - Vehicle to everything',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${istok_web.variable} font-sans`}>
			<body id="__next" suppressHydrationWarning={true}>
				<LayoutWrapper>{children}</LayoutWrapper>
			</body>
		</html>
	);
}
