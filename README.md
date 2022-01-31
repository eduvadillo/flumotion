# Encuentra las carátulas de las canciones de tus artistas favoritos

[Live version 🖥](https://fluendo-challenge.netlify.app/)

## Objetivo

Implementar una interfaz de usuario al que se le pueda dar el título y el autor de una canción mediante un formulario y muestre la carátula de la canción o del álbum al que pertenece en su defecto. Para extraer la carátula se usará la API de iTunes.

## Solución tecnológica adoptada

Solución realizada con React, Node js y Express.

## Notas

Para conseguir el resultado deseado, se ha tenido que adaptar la búsqueda del artista y la canción escrita por el usuario al formato que requiere la API. En el caso del artista se ha tenido que substituir el espacio vacío por un + y en el caso de las canciones requería que cada palabra empezara por mayúscula.

En caso de no escribir artista, canción o ni artista ni canción señala que es obligatorio. <br>
En caso de no encontrar el artista, se manda un mensaje informativo.

## Extras

Se ha añadido una demo de la canción para escuchar al lado de la carátula.

En caso de no encontrar la canción deseada muestra otras 4 canciones y carátulas del artista.
