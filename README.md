# API del Curso

Esta es una API simple para gestionar productos. Proporciona endpoints para obtener la lista de productos y detalles de cada producto.

## Endpoints

- `GET /api/productos`: Obtiene la lista de todos los productos.

## Ejemplo de respuesta

```json
[
  { "id": 1, "nombre": "Producto 1", "precio": 100 },
  { "id": 2, "nombre": "Producto 2", "precio": 200 }
]
```

## CRUD

| CRUD   | Uso Habitual | Método HTTP habitual |
| ------ | ------------ | -------------------- |
| Create | Crear        | POST                 |
| Read   | Leer         | GET                  |
| Update | Actualizar   | PUT / PATCH          |
| Delete | Eliminar     | DELETE               |

## Contrato de productos

| Necesidad              | Método | Endpoint         | Respuesta esperada                | Estado principal esperado |
| ---------------------- | ------ | ---------------- | --------------------------------- | ------------------------- |
| Listar Productos       | GET    | /api/productos   | Array Productos en JSON           | 200                       |
| Obtener un producto    | GET    | /api/productos/1 | Objeto Producto en JSON           | 200                       |
| Crear un producto      | POST   | /api/productos   | Un objeto Producto en JSON con ID | 201                       |
| Actualizar un producto | PUT    | /api/productos/1 | Un objeto Producto en JSON        | 200                       |
| Eliminar un producto   | DELETE | /api/productos/1 | Confirmación o sin contenido      | 200 o 204                 |

/api/productos/{id}

