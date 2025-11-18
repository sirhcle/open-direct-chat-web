# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# 1. Inicializa un repositorio Git (si no lo has hecho ya)
# Si ya tienes una carpeta .git, puedes omitir este paso.
git init

# 2. Añade todos los archivos del proyecto para el primer guardado
git add .

# 3. Guarda esta primera versión con un mensaje
git commit -m "Initial commit"

# 4. Asegúrate de que tu rama principal se llame "main" (práctica recomendada)
git branch -M main

# 5. Conecta tu repositorio local con el de GitHub
#    - Reemplaza 'github.com-personal' con el Host de tu configuración SSH.
#    - Reemplaza 'sirhcle' con tu nombre de usuario de GitHub.
#    - Reemplaza 'nombre-del-repositorio' con el nombre exacto del repo que creaste en GitHub.
git remote add origin git@github.com-personal:sirhcle/nombre-del-repositorio.git

# 6. Sube (push) tu código por primera vez a GitHub
#    El '-u' le dice a Git que recuerde esta conexión para futuros 'push' y 'pull'.
git push -u origin main