import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt, {genSaltSync} from 'bcrypt';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear el Hash con bcrypt
// Recibe una palabra y se le aplica el cifrado
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

// Comparar datos entre hash y password del user
export const inValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
};