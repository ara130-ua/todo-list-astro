import type { APIRoute } from "astro";
import { obtenerTareas, agregarTarea, eliminarTarea, editarTarea } from "../../lib/tareas";


export const GET: APIRoute = async () => {
  const tareas = obtenerTareas();
  return new Response(JSON.stringify(tareas), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { titulo, descripcion, fecha, estado } = data;

  if (!titulo || !descripcion || !fecha || !estado) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requeridos" }),
      {
        status: 400,
      }
    );
  }

  // Comprobamos si la fecha es válida
    if (isNaN(Date.parse(fecha))) {
        return new Response(
        JSON.stringify({ error: "La fecha es inválida" }),
        {
            status: 400,
        }
        );
    }

  const tarea = agregarTarea(titulo, descripcion, fecha, estado);

  if (!tarea) {
    return new Response(JSON.stringify({ error: "Error al agregar la tarea" }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({ message: "Tarea agregada exitosamente" }),
    {
      status: 200,
    }
  );
};

export const DELETE: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID es requerido" }),
      {
        status: 400,
      }
    );
  }

  eliminarTarea(id);

  return new Response(
    JSON.stringify({ message: "Tarea eliminada exitosamente" }),
    {
      status: 200,
    }
  );
};

// modificar tarea

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { id, titulo, descripcion, fecha, estado } = data;

  if (!id || !titulo || !descripcion || !fecha || !estado) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requeridos" }),
      {
        status: 400,
      }
    );
  }

  // Comprobamos si la fecha es válida
    if (isNaN(Date.parse(fecha))) {
        return new Response(
        JSON.stringify({ error: "La fecha es inválida" }),
        {
            status: 400,
        }
        );
    }

  const tarea = editarTarea(id, titulo, descripcion, fecha, estado);

  if (!tarea) {
    return new Response(JSON.stringify({ error: "Error al editar la tarea" }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({ message: "Tarea editada exitosamente" }),
    {
      status: 200,
    }
  );
};