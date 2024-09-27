<h1 align="center">Welding Helmets Online | Admin Control Panel</h1>

<div align="center">
  <p style="text-align: center;">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />

  ![Next.js + React + AntDesign][main-screen]

  [📚 Documentación][docs_link] | [📖 Manual de buenas prácticas][manual_link] | [🗣 Historial de Versiones][version_history_link]
</div>

## Tabla de contenido

- [Descripción](#descripción)
  - [Módulos activos](#módulos-activos)
  - [Tecnologías](#tecnologías)
- [Primeros pasos](#primeros-pasos)
- [Versionamiento](#versionamiento)
  - [Ramificación](#ramificación)
  - [Lanzamientos](#lanzamientos)


## Descripción

Sistema web para uso operativo de y administración de utilidades de [Welding Helmets Online][who_link] (proyecto front-end). Antes de comenzar, se recomienda leer el **[Manual de buenas prácticas][manual_link]** adjunto del proyecto.

### Módulos activos

- Módulo de autenticación.
- Módulo de Cross Selling (W.H.O).

### Tecnologías

Este proyecto ha sido desarrollado utilizando _[Next.js][nextjs_link]_ + _[React][react_link]_ y _[TypeScript][typescript_link]_. Para estilos personalizados se emplea el framework UI de _[AntDesign][antd_link]_.

El formateo y estilo de código son gestionados con _[ESlint][eslint_link]_ y _[Prettier][prettier_link]_.

&nbsp;
<div style="display: inline_block">
  <img align="center" alt="react-icon" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img align="center" alt="react-icon" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img align="center" alt="typescript-icon" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img align="center" alt="typescript-icon" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/antdesign/antdesign-original.svg">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>
&nbsp;


## Primeros pasos

Sigue los siguientes pasos para configurar el entorno de desarrollo del proyecto:

```bash
# Clonar el repositorio
git clone https://github.com/Welding-Helmets-Online/admin-control-panel-frontend-nextjs

# Acceder a la raíz
cd admin-control-panel-frontend-nextjs/

# Instalar dependencias
npm install

# Desplegar localmente
npm run dev
```

El proyecto será alojado por defecto en la ruta http://localhost:3000/


Es imprescindible configurar las variables de entorno requeridas, utilizando el archivo `.env.example` como referencia.


## Versionamiento

Para mantener un flujo de versionamiento consistente se siguen los principios de [versionado semántico][semver_link] de software para la numeración de versiones del aplicativo y principios de [commits convencionales][conv-commits_link] para la creación de mensajes uniformes de cambios en el repositorio.

### Ramificación

La creación y gestión se basa en la metodología de **[Git Flow][gitflow_link]** lo que permite una organización e integración eficientes de implementaciones en el proyecto.

### Lanzamientos

Se recomienda seguir el [formato de lanzamientos][release_format_link] del proyecto para estandarizar la descripción de las versiones lanzadas como oficiales del sistema. Cada migración en la rama principal `main` debe acompañarse de un **[lanzamiento (release) de Github][release_link]** que sea detallado y ùtil para la documentación del proyecto.
 
<!-- Images -->
[main-screen]: https://genfinplan.com/wp-content/uploads/2019/12/slider5.jpg

<!-- Links -->
[docs_link]: https://drive.google.com/drive/folders/1A2wZoK8bchUEAS9R6Gav3WvDrcTXJYcj?usp=sharing
[manual_link]: ./good-practices.md
[version_history_link]: https://github.com/Welding-Helmets-Online/admin-control-panel-frontend-nextjs/releases

[who_link]: https://weldinghelmetsonline.com.au/
[nextjs_link]: https://nextjs.org/
[react_link]: https://es.react.dev/
[typescript_link]: https://www.typescriptlang.org/
[antd_link]: https://ant.design/
[eslint_link]: https://eslint.org/
[prettier_link]: https://prettier.io/

[semver_link]: https://semver.org/lang/es/
[conv-commits_link]: https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13
[gitflow_link]: https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow
[github-tag_link]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[release_format_link]: ./release-example.md
[release_link]: https://docs.github.com/es/repositories/releasing-projects-on-github/managing-releases-in-a-repository
