import type { APIRoute } from "astro";
import { loginUser } from "../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { email, password } = data;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email y contraseña son requeridos" }),
      {
        status: 400,
      }
    );
  }

  const user = loginUser(email, password);

  if (!user) {
    return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Login exitoso",
      user: { id: user.id, name: user.name, email: user.email },
    }),
    {
      status: 200,
    }
  );
};
