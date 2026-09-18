
## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1: Evolución del Contexto

El carrito ya no manejar productos individuales, maneja objetos "CartItem", cada uno compuesto por el producto y su "quantity".

En el preparcial ya tenía algo de este estilo, para agregar una "quantity" y eliminarla por completo, pero lo único que agregué fue la funcionalidad de disminuir en una unidad este contador.

Todas las operaciones usan de "useState" y crean nuevos arreglos y objetos con "map", "filter" y "spread. así garantizamos que no se cambien directamente las referencias previas y los componentes que consumen "CartContext" reciben actualizaciones predecibles.


### Punto 2: Cálculo de Totales

Los totales "totalItemsCount" y "totalPrice" se calculan durante cada renderización usandio "reduce", usando la cantidad de cada "CartItem". 
No se almacenan como estados separados porque son valores derivados del carrito; así se evita duplicar información y que el total pueda quedar desincronizado después de una modificación.


### Punto 3: Arquitectura del Formulario

La ruta "src/app/checkout" es un componente de cliente, ya que  necesita eventos, estado local y consumo del contexto global.

Cada campo es controlado por React, y sus cambios se actualizan con "onChange". 

La verificación de: nombre, correo, método de pago y términos queda centralizada en una función que viene  del estado actual.

 los mensajes de nombre y correo solo aparecen después de marcar el campo como visitado con "onBlur". Lo cuál quiere decir que si el usuario no escribe nada en el campo coorespondiente (lo deja vacío pero igual lo "visita") va a aparecer el mensaje de error de todas formas!

El envío del formulario usa "preventDefault", esto bloquea el botón durante una operación asíncrona  y evita envíos duplicados.

Al finalizar, se debría ejecutar "clearCart" (pero no me dio), esto debería reiniciar los valores y campos visitado.


La navegación al checkout se ofrece de dos formas: dese el "Header" y desde el resumen del carrito.






---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------




Esto estaba en el Preparcial... Lo dejaré quieto

## Como ejecutar? ->

Primero ejecutar el comando:

```bash
npm run dev


Abrir [http://localhost:3000](http://localhost:3000) en el navegador para visualizar la página.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
