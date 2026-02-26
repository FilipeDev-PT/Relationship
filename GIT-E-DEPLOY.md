# Git, Deploy e Como Colocar o Site no Ar

Tudo que você precisa para versionar o projeto com Git e publicar o site na internet.

---

## Parte 1: Git

### O que é Git

Git é um sistema de controle de versão: guarda o histórico do seu código, permite voltar atrás, trabalhar em ramos e publicar em repositórios remotos (GitHub, GitLab, etc.).

### Instalação

- **Windows:** [git-scm.com/download/win](https://git-scm.com/download/win)  
- Depois de instalar, abra o terminal e confira: `git --version`

### Configuração inicial (uma vez por máquina)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Como trocar de conta no Git

Quando você usa outra conta (pessoal, trabalho, outro usuário do GitHub/GitLab), precisa ajustar **nome/email** e, ao fazer push/pull, **as credenciais de login**.

#### 1. Trocar nome e e-mail (quem aparece nos commits)

**Para todos os repositórios da máquina (conta global):**

```bash
git config --global user.name "Outro Nome"
git config --global user.email "outro@email.com"
```

**Só neste projeto (conta por repositório):**

```bash
cd "c:\Users\FilipeCristovam\Documents\04 - Projects - Personal\Relationship"

git config user.name "Outro Nome"
git config user.email "outro@email.com"
```

Assim os **próximos commits** desse repo usarão esse nome e e-mail. Para conferir:

```bash
git config user.name
git config user.email
```

(Se não estiver definido no repo, o Git usa o global.)

#### 2. Trocar a conta usada no push/pull (GitHub, GitLab, etc.)

O Git não guarda sua senha no repositório; quem guarda é o **Gerenciador de Credenciais** do Windows (ou do macOS). Para passar a usar outra conta ao fazer `git push` ou `git pull`:

**Opção A – Remover a conta salva (Windows)**

1. Abra **Gerenciador de Credenciais do Windows**:  
   Menu Iniciar → digite “Credenciais” ou “Gerenciador de Credenciais”.
2. Vá em **Credenciais do Windows** → **Credenciais genéricas**.
3. Procure entradas como `git:https://github.com` ou `github.com`.
4. Clique na entrada → **Remover** (ou **Editar** para trocar usuário/senha).
5. Na próxima vez que der `git push` ou `git pull`, o Windows vai pedir de novo; use o usuário e a senha (ou token) da conta que quiser usar.

**Opção B – Usar outra URL com o outro usuário**

Se você tem dois usuários no GitHub e quer deixar explícito qual usar neste repo:

```bash
# Ver o remoto atual
git remote -v

# Trocar a URL do origin para a conta desejada (substitua OUTRO_USUARIO)
git remote set-url origin https://github.com/OUTRO_USUARIO/relationship.git
```

Depois remova a credencial antiga no Gerenciador de Credenciais (Opção A) e na próxima vez que fizer push/pull use o login da conta que corresponde a `OUTRO_USUARIO`.

**Opção C – Usar token de acesso pessoal (recomendado no GitHub)**

O GitHub recomenda **Personal Access Token (PAT)** em vez de senha:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
2. Marque o escopo necessário (ex.: `repo`).
3. Use o token como “senha” quando o Git ou o Windows pedir.
4. Para trocar de conta: remova a credencial antiga no Gerenciador de Credenciais e, no próximo `git push`, informe o usuário e o token da outra conta.

#### 3. Resumo rápido

| O que trocar | Onde |
|--------------|------|
| Nome/e-mail dos commits | `git config [--global] user.name "..."` e `user.email "..."` |
| Conta do GitHub/GitLab no push/pull | Gerenciador de Credenciais do Windows (remover/editar) ou `git remote set-url` + login com a outra conta |

### Comandos essenciais

| Comando | O que faz |
|--------|------------|
| `git status` | Mostra arquivos modificados e não commitados |
| `git add .` | Prepara todos os arquivos para o próximo commit |
| `git add arquivo.ts` | Prepara só um arquivo |
| `git commit -m "mensagem"` | Grava um ponto no histórico com uma mensagem |
| `git log --oneline` | Lista os últimos commits em uma linha |
| `git branch` | Lista ramos (a branch atual tem *) |
| `git checkout -b nome-da-branch` | Cria e entra em uma nova branch |
| `git checkout main` | Volta para a branch `main` |
| `git pull` | Baixa e integra alterações do remoto |
| `git push` | Envia seus commits para o remoto |

### Fluxo típico no dia a dia

```bash
# 1. Ver o que mudou
git status

# 2. Incluir tudo (ou arquivos específicos)
git add .

# 3. Registrar no histórico
git commit -m "Descrição curta do que você fez"

# 4. Enviar para o remoto (ex.: GitHub)
git push origin main
```

### Iniciar Git neste projeto (primeira vez)

Se a pasta ainda **não** é um repositório Git:

```bash
cd "c:\Users\FilipeCristovam\Documents\04 - Projects - Personal\Relationship"

# Cria o repositório Git na pasta
git init

# Cria a branch principal (opcional; alguns já criam como main)
git branch -M main

# Adiciona todos os arquivos
git add .

# Primeiro commit
git commit -m "Projeto inicial: site do relacionamento com contadores"
```

### Conectar a um repositório remoto (GitHub / GitLab)

1. Crie um repositório **vazio** no GitHub (sem README, sem .gitignore).
2. Copie a URL (HTTPS ou SSH), por exemplo:  
   `https://github.com/SEU_USUARIO/relationship.git`

Depois, no terminal (dentro da pasta do projeto):

```bash
# Adiciona o remoto com o nome "origin"
git remote add origin https://github.com/SEU_USUARIO/relationship.git

# Envia a branch main para o remoto
git push -u origin main
```

Da próxima vez, basta usar `git push`.

### Arquivos que não devem ir para o Git

O `.gitignore` já deve conter algo como:

- `node_modules/`
- `dist/`
- `.env.local`, `.env.*.local`
- Logs e arquivos de IDE

**Importante:** Não commite senhas nem chaves. Variáveis de ambiente sensíveis ficam só em `.env.local` (ou nas configurações do serviço de deploy), e o `.gitignore` deve ignorar os `.env*.local`.

### Resumo rápido Git

- **Commit** = snapshot do projeto com uma mensagem.
- **Push** = envia seus commits para o servidor (GitHub, etc.).
- **Pull** = traz alterações do servidor para sua máquina.
- Sempre faça `git add` e `git commit` antes de `git push`.

---

## Parte 2: Deploy – Colocar o Site no Ar

Este projeto é um **SPA (Single Page Application)** com Vite e React. O build gera arquivos estáticos na pasta `dist/`. Qualquer serviço que sirva arquivos estáticos e redirecione todas as rotas para `index.html` consegue hospedar o site.

### Pré-requisito: build local

Antes de deployar, teste o build:

```bash
npm run build
npm run preview
```

Abre em `http://localhost:4173`. Se tudo funcionar (incluindo navegação entre páginas), o deploy tende a funcionar também.

---

## Opção recomendada: Vercel (gratuito e simples)

**Por que a Vercel:** integração ótima com Git, deploy automático a cada push, HTTPS e domínio gratuito, configuração mínima para Vite/React.

### Passo a passo

1. **Conta**
   - Acesse [vercel.com](https://vercel.com) e crie conta (pode usar GitHub).

2. **Conectar o repositório**
   - “Add New” → “Project”.
   - Importe o repositório do GitHub (ex.: `relationship`).
   - Root Directory: deixe em branco (raiz do projeto).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Variáveis de ambiente (se precisar)**
   - Em Settings → Environment Variables, adicione por exemplo:
     - `VITE_APP_ENV` = `production`
   - Só é necessário se você usar variáveis no build (ex.: API). Para este projeto, o default já funciona.

4. **Deploy**
   - Clique em “Deploy”. A Vercel faz o build e gera uma URL (ex.: `relationship.vercel.app`).

5. **Rotas do SPA (importante)**  
   Para o TanStack Router funcionar (ex.: `/aniversario-dela`, `/casamento`), a Vercel já trata SPA por padrão: todas as rotas caem no `index.html`. Não é preciso configurar nada extra.

6. **Atualizações**
   - A cada `git push` na branch conectada, a Vercel faz um novo deploy automaticamente.

---

## Opção alternativa: Netlify

Também gratuito e muito usado para SPAs.

1. Acesse [netlify.com](https://netlify.com) e crie conta (pode usar GitHub).
2. “Add new site” → “Import an existing project” → GitHub → escolha o repositório.
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

**SPA (rotas):** crie um arquivo `public/_redirects` (ou `dist/_redirects` no build) com uma linha:

```
/*    /index.html   200
```

Ou em Netlify: Site settings → Build & deploy → Post processing → “Redirects” e adicione a regra acima. Assim todas as rotas servem o `index.html`.

---

## Opção alternativa: GitHub Pages

Gratuito, hospedado no próprio GitHub.

### Configuração

1. No repositório, vá em **Settings** → **Pages**.
2. Source: **GitHub Actions** (recomendado) ou “Deploy from a branch”.
3. Se usar branch: escolha a branch (ex.: `main`) e a pasta `/ (root)` ou uma branch `gh-pages` com a pasta `dist` (ou `docs` com conteúdo de `dist`).

### Build com GitHub Actions (recomendado)

Crie o arquivo `.github/workflows/deploy.yml` no projeto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install and build
        run: npm ci && npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

No repositório: **Settings** → **Pages** → Source: **GitHub Actions**. Depois de um push na `main`, o workflow faz o build e publica. A URL fica no estilo `https://SEU_USUARIO.github.io/relationship/`.

**Base path:** se a URL for `https://usuario.github.io/relationship/`, o app precisa saber que está em `/relationship/`. No `vite.config.ts` adicione:

```ts
export default defineConfig({
  base: "/relationship/",  // nome do repositório
  plugins: [react(), tailwindcss()],
});
```

E no TanStack Router, se você usar paths absolutos a partir da raiz do site, pode ser necessário configurar a base (consulte a doc do TanStack Router para “base path”). Para Vercel/Netlify em domínio próprio, normalmente `base: "/"` (padrão) é suficiente.

---

## Resumo: melhor forma de colocar o site no ar

| Critério | Recomendação |
|----------|--------------|
| Mais fácil e rápido | **Vercel** (conectar GitHub e deploy automático) |
| Também fácil | **Netlify** (mesma ideia, configurar `_redirects` para SPA) |
| Sem sair do GitHub | **GitHub Pages** (com workflow de Actions e `base` no Vite se a URL tiver subpasta) |

Para este projeto, o caminho mais direto é:

1. Subir o código no **GitHub** (Git como na Parte 1).
2. Conectar o repositório na **Vercel** e fazer o primeiro deploy.
3. Usar a URL que a Vercel fornecer (ex.: `relationship.vercel.app`).

---

## Domínio próprio (opcional)

- **Vercel:** Settings do projeto → Domains → adicione seu domínio (ex.: `nosso.site.com`) e siga as instruções de DNS.
- **Netlify:** Domain settings → Add custom domain → configure o DNS conforme indicado.
- **GitHub Pages:** Settings → Pages → Custom domain → digite o domínio e configure o DNS (geralmente um CNAME apontando para `SEU_USUARIO.github.io`).

---

## Ambientes (produção vs QA)

- **Produção:** `npm run dev` usa `.env.development` (VITE_APP_ENV=production). No deploy, o build de produção usa o que você configurar no painel (ex.: Vercel) ou o default.
- **QA:** `npm run dev:qa` usa `.env.qa` (VITE_APP_ENV=qa). Para ter um “site de QA” no ar, você pode criar um segundo projeto na Vercel/Netlify apontando para a mesma repo e uma branch tipo `qa`, ou usar um único projeto e definir variáveis diferentes por branch.

---

## Checklist antes do deploy

- [ ] `npm run build` roda sem erro.
- [ ] `npm run preview` e testar navegação (home, aniversário dela, aniversário namoro, casamento).
- [ ] `.gitignore` inclui `node_modules/`, `dist/`, `.env*.local`.
- [ ] Repositório no GitHub criado e código enviado (`git push`).
- [ ] Serviço de deploy configurado (Vercel/Netlify/Pages) com comando de build e pasta `dist`.
- [ ] Se usar GitHub Pages em subpasta, `base` no `vite.config.ts` configurado.

Com isso você tem o que precisa sobre Git, deploy e a melhor forma de colocar o site no ar.
