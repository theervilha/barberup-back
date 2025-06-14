// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

// `tseslint.config` é uma função auxiliar que simplifica a criação de configurações.
// É a forma recomendada de criar sua configuração ao usar TypeScript.
export default tseslint.config(
  // 1. Configurações globais de "ignores"
  // Você estava certo, a propriedade agora é `ignores`.
  // É comum adicionar uma barra no final para garantir que pastas inteiras sejam ignoradas.
  {
    ignores: [
      "node_modules/",
      "dist/",
      // É uma boa prática ignorar o próprio arquivo de configuração do ESLint.
      "eslint.config.mjs",
    ],
  },

  // 2. Configuração base para todos os arquivos
  // Aplica as regras recomendadas do ESLint para todos os arquivos.
  js.configs.recommended,

  // 3. Configurações específicas para TypeScript
  // Usa o operador "spread" (...) para incluir todas as configurações recomendadas do typescript-eslint.
  // Isso já configura o parser, o plugin e as regras para arquivos .ts.
  ...tseslint.configs.recommended,

  // 4. Configurações personalizadas para o seu projeto
  // Este bloco é para ajustes finos, como definir variáveis globais.
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], // Aplica a todos os arquivos relevantes
    languageOptions: {
      globals: {
        ...globals.browser, // Adiciona globais de ambiente de navegador (ex: document, window)
        ...globals.node, // Adiciona globais de ambiente Node.js (ex: process, require)
      },
    },
    // Você pode adicionar ou sobrescrever regras aqui
    rules: {
      // Exemplo: exigir ponto e vírgula no final das linhas
      // 'semi': ['error', 'always'],
      // Exemplo: avisar sobre o uso de 'any' em TypeScript
      // '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
