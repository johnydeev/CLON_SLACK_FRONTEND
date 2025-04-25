# Proyecto CLON de Slack

Slack es un software de comunicación y colaboración empresarial basado en la nube. Se clasifica como una herramienta de mensajería instantánea y gestión de trabajo en equipo, diseñada para mejorar la comunicación dentro de organizaciones y equipos de trabajo.

## Tech Stack

### Frontend

- **Runtime:** [Vite](https://vitejs.dev/) ![Vite](https://img.shields.io/badge/-Vite-purple?style=flat-square&logo=vite&logoColor=white)  

- **Styling:** CSS ![CSS](https://img.shields.io/badge/-CSS-blue?style=flat-square&logo=css3&logoColor=white)  

- **UI Components:** [React Icons](https://react-icons.github.io/react-icons/)  ![React Icons](https://img.shields.io/badge/-React%20Icons-blue?style=flat-square&logo=react&logoColor=white)  

- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)  ![Sonner](https://img.shields.io/badge/-Sonner-yellow?style=flat-square&logo=javascript&logoColor=white)
  
## [Link a la pagina](https://frontend-pwa-despliegue.vercel.app)

## TODO LIST

- [x] Autenticacion con JWT
- [x] Confirmacion de correo con **Nodemailer**
- [x] Recuperacion de contraseña **Nodemailer**
- [x] Proteccion y validacion de usuarios mediante middleware
- [ ] Responsive
- [ ] Tipado
- [ ] Handlebars (SSR)

## Para correr Localmente

1. Clonar repositorio

   ```bash
   git clone https://github.com/johnydeev/FRONTEND_CLON_SLACK.git
   ```

2. Instalar dependencias

   ```bash
   npm i
   ```

3. Copiar the `.env example` como `.env` y cargar variables de entorno.

   ```bash
   cp .env example .env
   ```

4. Para correr el servidor localmente

   ```bash
   npm run dev
   ```
