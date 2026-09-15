# Desafio em Squad - Angular

Aplicação web desenvolvida em **Angular** como projeto prático em squad, aplicando conceitos de componentização, data binding, consumo de API externa com serviços, rotas dinâmicas e formulários com validação.

---

## Descrição

O projeto consiste em uma Single Page Application (SPA) que consome os dados da [Fake Store API](https://fakestoreapi.com/docs) para exibição, navegação e manipulação de produtos.

A aplicação foi estruturada para exercitar os conceitos centrais do desenvolvimento com Angular:
- **Consumo de API:** Listagem e filtragem de produtos da Fake Store.
- **Roteamento:** Navegação entre a listagem e tela de detalhes do produto via parâmetros de rota (`:id`).
- **Serviços & Estado Local:** Gerenciamento e persistência de dados em memória através de injeção de dependências.
- **Formulários & Validações:** Formulário com validações síncronas (`Validators`) e feedback visual ao usuário.

---

## Objetivos

- Construir componentes reutilizáveis e desacoplados.
- Aplicar comunicação e ligação de dados (*Property Binding*, *Event Binding* e interpolação).
- Centralizar regras de negócio e requisições HTTP em serviços com `HttpClient` e `RxJS`.
- Implementar navegação entre páginas utilizando o Angular Router.
- Criar formulários reativos com validações (`Validators.required`, `Validators.email`, etc.).

---

## Tecnologias

- **Angular**
- **TypeScript**
- **HTML5 & CSS3**
- **RxJS**
- **Fake Store API**
- **Git & GitHub**

---

## Aprendizados

Durante o desenvolvimento deste projeto foram praticados conceitos de:

- Arquitetura de aplicações baseadas em componentes no Angular.
- Fluxo de dados e ciclo de vida de componentes.
- Separação de responsabilidades com Serviços e Injeção de Dependências.
- Consumo assíncrono de APIs RESTful com `HttpClient`.
- Roteamento com parâmetros dinâmicos (`ActivatedRoute`).
- Validação de formulários e tratamento de erros visuais para o usuário.

---

## Como executar

### Pré-requisitos
- Node.js instalado
- Angular CLI instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/mariananlemos/desafio-angular.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd desafio-angular
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor local:
   ```bash
   ng serve
   ```

5. Acesse a aplicação no navegador em `http://localhost:4200/`.

---

## Squad

- **Aline Shimoi Rodrigues** - [GitHub](https://github.com/AlineShimoi)
- **Luana Ferreira Souza** - [GitHub](https://github.com/luanaferreirasouza)
- **Marcia Daniele da Silva Moreira** - [GitHub](https://github.com/Marcia-Moreira)
- **Mariana Lemos** - [GitHub](https://github.com/mariananlemos)

---

## Instituição e Contexto

- **Comunidade:** [WoMakersCode](https://womakerscode.org/)
- **Programa:** Formação / Bootcamp Front-End Angular
- **API Utilizada:** [Fake Store API](https://fakestoreapi.com/)