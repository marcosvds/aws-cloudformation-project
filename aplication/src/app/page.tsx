"use client";
import Posts from "@/components/posts/posts";
import InputPost from "@/components/posts/inputPost";
import { useEffect, useState } from "react";

export default function Home() {
  // Estado para armazenar os posts e controlar o estado de carregamento
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os posts quando o componente é montado
  useEffect(() => {
    getPosts();
  }, []);

  // Função assíncrona para buscar os posts da API
  async function getPosts() {
    setLoading(true); // Define o estado de carregamento como true
    let data = await fetch('./api/submit-form', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const posts = await data.json(); // Converte a resposta em JSON
    setPosts(posts); // Atualiza o estado com os posts recebidos
    setLoading(false); // Define o estado de carregamento como false
  }

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:gap-6">
      {/* Componente para entrada de posts */}
      <InputPost call={getPosts} />
      
      {loading ? (
        // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
        <div className="flex justify-center items-center w-full my-4">
          <p className="text-lg text-gray-700">Carregando...</p>
        </div>
      ) : (
        // Exibe os posts quando os dados foram carregados
        <div className="flex w-full">
          <Posts posts={posts} call={getPosts} />
        </div>
      )}
    </main>
  );
}
