import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../constants/errorMessage";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, PASSWORD_MIN_LENGTH).max(16, PASSWORD_MAX_LENGTH),
});
export default signInSchema;
