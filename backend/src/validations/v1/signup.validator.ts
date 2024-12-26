import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../constants/errorMessage";
const signUpschema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8, PASSWORD_MIN_LENGTH).max(16, PASSWORD_MAX_LENGTH),
});

export default signUpschema;
