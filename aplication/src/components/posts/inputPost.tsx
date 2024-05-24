'use client'
import { randomBytes } from "crypto"; // Importa a função randomBytes para gerar IDs aleatórios
import { FormEvent, useRef } from "react"; // Importa o tipo FormEvent do React para tipar eventos de formulário

// Componente InputPost que recebe uma prop call (função a ser chamada após a submissão)
export default function InputPost({ call }: { call: () => void }) {
  // Referências para os campos de entrada
  const titleRef = useRef<HTMLInputElement>(null);
  const postRef = useRef<HTMLTextAreaElement>(null);

  // Função para lidar com a submissão do formulário
  async function _handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    let formData = {
      UserID: randomBytes(16).toString("hex"), // Gera um ID aleatório para o usuário
      Title: e.currentTarget.titlepost.value, // Captura o valor do campo de título
      Text: e.currentTarget.posts.value // Captura o valor do campo de post
    };
    // Envia os dados do formulário para a API
    const response = await fetch('./api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // Reseta os campos de entrada
    if (titleRef.current) titleRef.current.value = "";
    if (postRef.current) postRef.current.value = "";
    call(); // Chama a função passada como prop para atualizar a lista de posts
  }

  return (
    // Formulário com campos de entrada e um botão de envio
    <form
      className="flex flex-col items-center mt-8" // Adicionada mt-8 para aumentar a distância da navbar
      onSubmit={(e) => _handleSubmit(e)}
    >
      <label htmlFor="posts" className="text-2xl text-white mb-2">
        Adicione sua tarefa
      </label>
      <span className="flex flex-col items-start mb-2">
        <label htmlFor="titlepost" className="text-white mb-1">Título da tarefa:</label>
        <input 
          type="text" 
          name="titlepost" 
          className="h-8 rounded-md mb-2 p-2 border border-gray-300 text-[#412e28] bg-[#edf6ee]"
          maxLength={50} // Limitação de 50 caracteres para o título
          ref={titleRef} // Referência ao campo de título
          required // Campo obrigatório
        />
      </span>
      <span className="flex flex-col items-start mb-2">
        <label htmlFor="posts" className="text-white mb-1">Descrição da tarefa:</label>
        <textarea 
          name="posts" 
          className="h-20 rounded-md p-2 border border-gray-300 text-[#412e28] bg-[#edf6ee]"
          maxLength={200} // Limitação de 200 caracteres para a descrição
          ref={postRef} // Referência ao campo de descrição
          required // Campo obrigatório
        />
      </span>
      <button className="bg-[#b3204d] max-w-fit p-2 mt-2 rounded-md text-white hover:bg-[#412e28] transition-colors">
        Enviar
      </button>
    </form>
  );
}
