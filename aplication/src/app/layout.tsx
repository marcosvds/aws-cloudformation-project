import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Lista de Tarefas",
  description: "Gerenciador de tarefas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-black text-white`}>
        {/* Barra superior fixa com título centralizado e menor altura */}
        <div className="fixed top-0 left-0 right-0 z-50 flex w-full bg-[#412e28] h-16 items-center justify-center">
          <h1 className="text-3xl font-bold text-[#edf6ee]">To Do List</h1>
        </div>
        {/* Adiciona padding top para evitar que o conteúdo fique atrás da navbar */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
