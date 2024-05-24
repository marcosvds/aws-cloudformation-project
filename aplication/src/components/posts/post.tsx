import { FormEvent } from "react";

// Define o tipo das props para o componente Post
interface PostProps {
  post: {
    UserID: { S: string },
    Title: { S: string },
    Text: { S: string }
  };
  call: () => void;
}

export default function Post({ post, call }: PostProps) {
  // Função assíncrona para deletar um post
  async function _handleDelete(UserID: string, Title: string) {
    console.log(UserID);
    const response = await fetch('./api/submit-form', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserID, Title }),
    });
    call();
  }

  return (
    // Componente que representa um post
    <div className="flex items-center w-full mb-2 px-4 py-2 border-solid rounded-lg bg-[#edf6ee] shadow-sm mx-8 md:mx-16">
      {/* Título do post */}
      <h1 className="text-lg text-[#151101] font-bold mr-4">{post.Title.S}</h1>
      {/* Texto do post */}
      <p className="text-sm text-[#151101] flex-grow mr-4">{post.Text.S}</p>
      {/* Botão para deletar o post */}
      <button className="text-sm font-bold text-[#b3204d] hover:text-[#412e28] cursor-pointer" onClick={() => _handleDelete(post.UserID.S, post.Title.S)}>Deletar</button>
    </div>
  );
}
