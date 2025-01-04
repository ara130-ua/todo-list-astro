import type { APIRoute } from "astro";
import { registerUser } from "../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, password } = data;
  console.log(data);

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requeridos" }),
      {
        status: 400,
      }
    );
  }

  const user = registerUser(name, email, password);

  if (!user) {
    return new Response(JSON.stringify({ error: "El usuario ya existe" }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({ message: "Usuario registrado exitosamente" }),
    {
      status: 200,
    }
  );
};
