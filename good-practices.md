# Manual de buenas prácticas

En este archivo se detallará las buenas prácticas para la implementación de nuevos módulos, funcionalidades, secciones y/o páginas del sistema. 

Última actualización realizada el **27/09/2024**.

**Autores**: _Alexander Porro_


## Tabla de contenido

- [Convenciones](#convenciones)
  - [Nomenclatura de archivos](#nomenclatura-de-archivos)
  - [Otras convenciones](#otras-convenciones)
- [Estructura](#estructura)
  - [Enrutamiento](#enrutamiento)
  - [Componentización](#componentización)
  - [Librerías y recursos](#librerías-y-recursos)
  - [Dependencias](#dependencias)
- [Conclusión](#conclusión)
- [Recursos Adicionales](#recursos-adicionales)


## Convenciones

La siguiente guía detalla las convenciones utilizadas para nombrar archivos, carpetas y utilidades dentro del proyecto:

### Nomenclatura de archivos

| **Categoría**     | **Nombramiento** | **Descripción**                                                       | **Ejemplo**                             |
|:------------------|:-----------------|:--------------------------------------------------------------------- |:----------------------------------------|
| **Carpetas**      | Kebab-case       | Carpetas y sub-carpetas (no aplica para carpetas de componentes jsx). | `product-details/`                      |
| **Archivos .tsx** | UpperCase        | Componentes de React.                                                 | `ProductDetails.tsx`                    |
| **Archivos .ts**  | Kebab-case       | Se debe agregar la especificación del tipo de archivo.                | `product.constants.ts`, `user.types.ts` |

## Otras convenciones

| **Categoría**  | **Nombramiento**     | **Descripción**                | **Ejemplo**       |
|:---------------|:---------------------|:-------------------------------|:------------------|
| **Variables**  | camelCase            | Variables globales y locales.  | `userProfile`     |
| **Constantes** | SCREAMING_SNAKE_CASE | Constantes globales y locales. | `API_BASE_URL`    |
| **Funciones**  | camelCase            | Uso de verbos descriptivos. Además, se contempla el uso de prefijos/sufijos para funciones específicas. | `getUserDetails()`, `userDetailsService()`, `errorManager()` |


## Estructura

A continuación, se detalla el proceso y la estructura recomendada para la organización del proyecto, con el objetivo de facilitar la comprensión y el mantenimiento del código, así como permitir un desarrollo más ágil y ordenado.

La organización de los archivos se basa en una estructura modular, donde cada módulo ubicado en `features/` corresponde a una funcionalidad específica dentro del sistema. Esta metodología no solo mejora la legibilidad del código, sino que también potencia la escalabilidad del proyecto, permitiendo una integración fluida de nuevos módulos y características a medida que el sistema crece. 

Se recomienda seguir los principios de organización establecidos en el ejemplo de **[Bulletproof React][bulletproof_react_next_link]** para aplicativos Next.js App router.

### Enrutamiento

El enrutado sigue la convención de rutas con [App router de Next.js][routing_nextjs_link]. De esta forma, todas las rutas y contenido público del cliente será ubicado dentro de `/app`.

### Componentización

Para la creación de componentes en la aplicación, se siguen principios estándar para su organización global y específica con la siguiente estructura:

    ├── components/
      ├── AppLayout/
        ├── AppLayout.tsx
        ├── Footer.tsx
        ├── Header.tsx
        ├── index.ts
        ├── styles.css
      ├── PageHeader/
        ├── PageHeader.tsx
        ├── index.ts
        ├── styles.css
      ├── ...

Los componentes globales se encuentran en la raíz de la carpeta `components/`, mientras que los componentes específicos de cada módulo se organizan dentro de sus respectivas subcarpetas:

    ├── features/
      ├── auth/
        ├── components/
          ├── LoginForm
            ├── LoginForm.tsx
            ├── styles.css
      ├── user/
      ├── ...

Al crear un componente, debe definirse utilizando la palabra clave `function`. Si el componente recibe propiedades (props), es importante definir una `interface` al inicio del archivo para tiparlas adecuadamente.

```tsx
interface ComparisonTableProps {
  headers: TableHeader[];
  rows: TableRow[];
}

export default function ComparisonTable({
  headers, rows,
}: ComparisonTableProps) {
  // Componente JSX
}
```

Cada componente debe ser exportado por defecto y almacenado en su correspondiente archivo `index.ts`.

```tsx
export { default as ComparisonTable } from './ComparisonTable/ComparisonTable';
```

### Librerías y recursos

Para asegurar la coherencia en las librerías y herramientas utilizadas en el proyecto, a continuación se detalla cada una de ellas junto con su respectivo caso de uso.

- **`Autenticación`**: [NextAuth.js][nextauth_link].
- **`Estilos personalizados`**: [AntDesign][antd_link] & [CSS3][css_link].
- **`Galería de iconos`**: [AntDesign Icons][antd_icons_link].
- **`Transiciones visuales`**: [React Transition Group][react_transition_group].
- **`Cliente & administrador de solicitudes HTTP`**: [Axios][axios_link] & [TankStack React Query][react_query_link].
- **`Formateo de código`**: [ESLint][eslint_link] & [Prettier][prettier_link].

### Dependencias

Los módulos del sistema dependen de una serie de APIs y servicios web especificados a continuación.

#### Internas

- **[W.H.O Cross Sell API][cross_sell_api_link]**


## Conclusión

Para garantizar un desarrollo ordenado y fácil de mantener, es fundamental seguir las pautas establecidas en este documento. En caso de dudas, es importante que te comuniques con el equipo de trabajo o desarrollador encargado.

Es importante destacar que este documento no aborda reglas ni lógica de negocio; su propósito es exclusivamente detallar y estandarizar las normas de desarrollo para el equipo de front-end.

## Recursos adicionales

- [Repositorio de Bulletproof React][bulletproof_react_link]
- [Repositorio de AntD multipurpose dashboard template][antd_multi_link]
- [Documentación de Next.js][nextjs_docs_link]
- [Documentación de AntDesign][antd_docs_link]

<!-- Links -->
[routing_nextjs_link]: https://nextjs.org/docs/app/building-your-application/routing
[bulletproof_react_next_link]: https://github.com/alan2207/bulletproof-react/tree/master/apps/nextjs-app

[nextauth_link]: https://next-auth.js.org/
[antd_link]: https://ant.design/
[antd_icons_link]: https://ant.design/components/icon
[css_link]: https://developer.mozilla.org/es/docs/Web/CSS
[react_transition_group]: https://reactcommunity.org/react-transition-group/
[axios_link]: https://axios-http.com/docs/intro
[react_query_link]: https://tanstack.com/query/v4/docs/framework/react/overview
[eslint_link]: https://eslint.org/
[prettier_link]: https://prettier.io/
[cross_sell_api_link]: https://github.com/Welding-Helmets-Online/cross-up-sell

[nextjs_docs_link]: https://nextjs.org/
[bulletproof_react_link]: https://github.com/alan2207/bulletproof-react
[antd_multi_link]: https://github.com/design-sparx/antd-multipurpose-dashboard
[antd_docs_link]: https://ant.design/