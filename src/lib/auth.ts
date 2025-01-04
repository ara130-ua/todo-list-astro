interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

let users: User[] = [];

export function registerUser(
  name: string,
  email: string,
  password: string
): User | null {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return null;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // En una aplicación real, hasheamos la contraseña antes de almacenarla
  };

  users.push(newUser);
  console.log(users);
  return newUser;
}

export function loginUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password);
  console.log(users);
  console.log(user);
  return user || null;
}
