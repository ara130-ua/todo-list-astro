interface tarea {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    estado: string;
}

let tareas: tarea[] = [];

export function agregarTarea(titulo: string, descripcion: string, fecha: string, estado: string): tarea | null {
    const newTarea: tarea = {
        id: Date.now().toString(),
        titulo,
        descripcion,
        fecha,
        estado
    };

    tareas.push(newTarea);
    console.log(tareas);
    return newTarea;
}

export function obtenerTareas(): tarea[] {
    return tareas;
}

export function obtenerTarea(id: string): tarea | null {
    const tarea = tareas.find((t) => t.id === id);
    return tarea || null;
}

export function editarTarea(id: string, titulo: string, descripcion: string, fecha: string, estado: string): tarea | null {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) {
        return null;
    }

    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    tarea.fecha = fecha;
    tarea.estado = estado;

    return tarea;
}

export function eliminarTarea(id: string): void {
    // Filtra las tareas para excluir la tarea con el ID proporcionado
    tareas = tareas.filter((t) => t.id !== id);
}

export function cambiarEstadoTarea(id: string, estado: string): tarea | null {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) {
        return null;
    }

    tarea.estado = estado;

    return tarea;
}


