import * as Yup from "yup"
import { ErrorMessage } from "../static"

export const loginSchema = Yup.object({
    email: Yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.REQUIRED),
})