import { HttpError } from "https://deno.land/x/oak/mod.ts";

class AppError extends HttpError {
    constructor(message: string, statusCode = 400){
        super()
        this.message = message
        this.status = statusCode
    }
}

export default AppError