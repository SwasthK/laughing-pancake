import { ZodSchema } from "zod";

export const zodHandler = <T>(data: unknown, schema: ZodSchema<T>) => {
    const response = schema.safeParse(data);
    if (!response.success) {
        return { error: response.error.errors[0].message }
    } else {
        return { data: response.data }
    }
}

// Incase if needed to return success status

// export const zodHandler = <T>(data: unknown, schema: ZodSchema<T>) => {
//     const response = schema.safeParse(data);
//     if (!response.success) {
//         return { success: false, error: response.error.errors[0].message };
//     } else {
//         return { success: true, data: response.data };
//     }
// }