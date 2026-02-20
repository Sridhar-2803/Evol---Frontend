import z from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0,{
    message: 'A file must be upload'
})

export const createMovieSchema = z.object({
    title: z.string({required_error: "Movie Title is required" }),
    description: z.string({required_error: 'Description is required'}).min(10,{
        message: 'Description must be at least 10 character'
    }),
    language:  z.string({required_error:  'Language is required'}),
    genre:  z.string({required_error: 'Genre is required'}),
    director:  z.string({required_error: 'Director is required'}),
    cast:  z.string({required_error: 'Cast is required'}),
    status:  z.string({required_error: 'Status is required'}),
    location:  z.string({required_error:  'Location is required'}),
    pictureUrl: z.string().optional(),
    file: fileSchema.optional()

}).refine((data) => data.pictureUrl || data.file, {
    message: 'Please provide an image',
    path: ['file']
})

export type CreateMovieSchema = z.infer<typeof createMovieSchema>;