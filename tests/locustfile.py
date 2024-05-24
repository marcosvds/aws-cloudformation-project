import uuid
from locust import HttpUser, task, between
from numpy import random

class MyUser(HttpUser):
    # Define o tempo de espera entre cada tarefa, variando entre 1 a 5 segundos
    wait_time = between(1, 5)
    
    # Define o host alvo para os testes de carga
    host = "http://minha--myloa-m9vwhwmang54-1101900728.us-east-2.elb.amazonaws.com/"
    
    @task
    def my_task(self):
        # Cria um corpo de requisição com dados fictícios para o envio do formulário
        body = {
            'UserID': f"{uuid.uuid4()}",  # Gera um ID único para cada usuário utilizando UUID
            'Title': 'Título teste',  # Define um título genérico para o teste
            'Text': 'Veja aqui você tem uma descrição genérica para sua atividade.'  # Texto descritivo genérico
        }

        # Envia uma requisição POST para o endpoint "api/submit-form" com o corpo definido acima
        self.client.post("api/submit-form", json=body)
        
        # Envia uma requisição GET para o endpoint "api/submit-form" e armazena a resposta
        response = self.client.get("api/submit-form")
        
        # Verifica se a resposta do GET foi bem-sucedida (status code 200)
        if response.status_code == 200:
            data = response.json()
            if data:
                # Se a resposta contém dados, imprime os dados recebidos
                print("Requisição GET retornou dados:", data)
            else:
                # Se a resposta não contém dados, informa que nenhum dado foi retornado
                print("Requisição GET não retornou nenhum dado")
        else:
            # Se a resposta do GET falhar, imprime o status code da falha
            print("Requisição GET falhou com o status code:", response.status_code)
