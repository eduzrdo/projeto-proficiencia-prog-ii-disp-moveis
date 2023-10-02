<h1 align="center">:iphone: Jogo da Forca</h1>

Projeto desenvolvido para a atividade de proficiência nas disciplinas de Programação II e Programação para Dispositivos Móveis, no Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais.

---

## :man_technologist: O Projeto

Jogo da forca, é um jogo de palavras onde o objetivo é descobrir uma palavra sorteada, escolhendo uma letra por vez, antes que seu personagem seja enforcado. Cada letra que o jogador escolhe, é revelado se ela existe ou não na palavra sorteada. Caso o jogador erre 6 letras, seu personagem é enforcado, e ele perde o jogo.

![Telas Jogo da Forca](https://github.com/eduzrdo/assets/blob/main/jogo-da-forca/screens-jogo-da-forca.png?raw=true)

## :bow_and_arrow: Desafio

O desafio do projeto foi desenvolver um jogo da forca para dispositivos móveis, utilizando React Native, onde foi os seguintes conhecimentos do aluno:

- Uso de componentes reativos
- Uso de state e props
- Uso de eventos
- Uso de estilização CSS
- Conexão com um SGBD
- Implementação utilizando MVC

E como requisitos, o jogo devia conter as seguintes características:

- O usuário deve acertar uma palavra sorteada informando suas letras
- O usuário pode errar no máximo 6 letras
- O jogo deve mostrar uma imagem da forca à medida que o usuário erra as letras
- O jogo deve exibir uma mensagem de vitória ou derrota ao final
- Deve existir a possibilidade do jogador se cadastrar e efetuar login na aplicação e deve
existir um ranking com as informações dos jogadores (nick do jogador, número de jogos
realizados, vitórias e derrotas)
- Devem existir usuários especiais que consigam apagar e alterar os dados de outros
jogadores
- Deve ser respeitado o padrão MVC na construção da aplicação

## :rocket: A milha extra

Além do desafio proposto, com a finalidade de incrementar a qualidade do projeto, decidi adicionar algumas funcionalidades a mais:

- Foto de perfil - O usuário pode escolher um avatar para representá-lo em seu perfil
- Temporizador - Foi adicionado um temporizador de 90 segundos para cada partida, ao fim do tempo, o jogador perde
- Dicas - Para cada palavra sorteada, é dado uma dica para o jogador (Obrigado pela sugestão, Mauryan! :+1:)

## :wrench: Tecnologias

### Frameworks, Plataformas e Bibliotecas

- **Front-end**

[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)](https://expo.dev/)

- **Back-end**

[![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)](https://fastify.dev/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

### Linguagens

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### ORM

[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

### Banco de Dados

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Como rodar o projeto

Você precisará:

- <span id="mongodb"></span>De uma conta no **MongoDB** para criar o banco de dados e obter a **url de conexão**. Caso não possua uma conta, acesse o MongoDB Atlas [clicando aqui](https://www.mongodb.com/), crie uma conta, e então crie o banco de dados.

- Instalar o app **Expo Go** no seu dispositivo [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779). Você também pode rodar o aplicativo em um [emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/) no Windows ou Linux, ou em um [simulador iOS](https://docs.expo.dev/workflow/ios-simulator/) no macOS se preferir.

- [Node LTS release](https://nodejs.org/en/download) (preferencialmente a versão 18)

---

### Instruções:

1. Primeiro, clone o repositório:

```
git clone https://github.com/eduzrdo/projeto-proficiencia-prog-ii-disp-moveis.git
```

2. Em seguida, instale as dependências do projeto nas pastas **server** e **app** separadamente:

***Esteja usando a versão 18 lts do Node para essa parte.***

```
# dentro da pasta server instale as dependências

npm install
```
3. E então:
```
# dentro da pasta app instale as dependências

npm install
```

4. Após instalar as dependências, configure a url de conexão com o banco de dados. Crie um arquivo com o nome **.env** dentro da pasta server, e nesse arquivo crie a variável **DATABASE_URL**, onde seu valor é url de conexão obtida no [Mongo DB Atlas](#mongodb):

```
DATABASE_URL="<URL_DE_CONEXÃO_AQUI>"
```

5. Agora altere o arquivo de configuração do app que se encontra em ***app/src/config/index.ts***, substituindo o IP pelo IP da sua rede, **a porta 3333 permanece a mesma**:

```ts
export const serverConfig = {
  address: "<SEU_IP_AQUI>:3333"
}
```

6. Inicie o servidor:

```
# dentro da pasta server

npm run dev
```

7. Inicie o app:

```
# dentro da pasta app

npx expo start
```

1. Escaneie o código QR que aparecerá no terminal, com a câmera do seu dispositivo.

## :man_technologist: Autor

Eduardo Afonso de Oliveira

[![E-mail](https://raw.githubusercontent.com/eduzrdo/assets/4a88a1195b5fe2313b27f63a800d2b1dd8ff67ab/icons/mail.svg)](mailto:eduardoliveira.dev@gmail.com)
&nbsp;&nbsp;
[![GitHub](https://raw.githubusercontent.com/eduzrdo/assets/8cb8aa7fa73dd6fed3e2a450071cc3e8c349f02d/icons/github.svg)](https://github.com/eduzrdo)