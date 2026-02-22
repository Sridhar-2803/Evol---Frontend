import {  useForm, type FieldValues } from "react-hook-form"
import { createMovieSchema, type CreateMovieSchema } from "../../library/schemas/createMovieSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import AppTextInput from "../../app/shared/components/AppTextInput"
import AppDropzone from "../../app/shared/components/AppDropzone"
import type { Movie } from "../../app/model/movie"
import { useEffect } from "react"
import { useCreateMovieMutation, useUpdateMovieMutation } from "./adminApi"
import {LoadingButton} from "@mui/lab"
import { handleApiError } from "../../library/util"

type Props = {
  setEditMode: (value: boolean) => void
  movie: Movie | null
  refetch: () => void
  setSelectedMovie: (value: Movie | null) => void;
}

export default function MovieForm({setEditMode, movie, refetch, setSelectedMovie}: Props) {
 
    const {control, handleSubmit, watch, reset, setError, formState: {isSubmitting}} = useForm<CreateMovieSchema>({
        mode: 'onTouched',
        resolver: zodResolver(createMovieSchema)
    })
    const watchFile = watch('file');
    const [createMovie ] = useCreateMovieMutation();
    const [updateMovie] = useUpdateMovieMutation();

    useEffect(() => {
      if(movie) reset(movie);

      return () => {
        if (watchFile) URL.revokeObjectURL((watchFile as File & {preview: string}).preview)
      }
    }, [movie, reset, watchFile]);

    const createFormData = (items: FieldValues) => {
      const formData = new FormData();
      for (const key in items) {
        formData.append(key, items[key])
      }
      return formData;
    }

    const onSubmit = async(data: CreateMovieSchema) => {
      try {
          const formData = createFormData(data);

          if (watchFile) formData.append('file', watchFile);

        if(movie) await updateMovie({id: movie.id, data: formData}).unwrap();
        else await createMovie(formData).unwrap();
        setEditMode(false);
        setSelectedMovie(null);
        refetch();
      } catch (error) {
        handleApiError<CreateMovieSchema>(error, setError,
          ['cast', 'description', 'director', 'file', 'genre', 'language', 'location', 'pictureUrl', 'status', 'title']);
      }
    }

    

  return (
    <Box component={Paper} sx={{p: 4, maxWidth: 'lg', mx: 'auto'}}>
        <Typography variant="h4" sx={{mb: 4}}>
            Movie details 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <AppTextInput control={control} name="title" label='Movie name'/>
                </Grid>
                <Grid size={12}>
                    <AppTextInput 
                     control={control} 
                     multiline
                     rows={4}
                    placeholder="Description"
                     name="description" 
                     label='Description'/>
                </Grid>
                <Grid size={6}>
                    <AppTextInput control={control} name="language" label='Language'/>
                </Grid>
                <Grid size={6}>
                    <AppTextInput control={control} name="genre" label='Genre'/>
                </Grid>
                <Grid size={6}>
                    <AppTextInput control={control} name="director" label='Director'/>
                </Grid>
                <Grid size={6}>
                    <AppTextInput control={control} name="cast" label='Cast'/>
                </Grid>
                 <Grid size={6}>
                    <AppTextInput control={control} name="status" label='Status'/>
                </Grid>
                 <Grid size={6}>
                    <AppTextInput control={control} name="location" label='Location'/>
                </Grid>
                 <Grid  size={12}>
                    <AppDropzone  name="file" control={control} /> 
                </Grid>
                
          <Grid  size={12} style={{ textAlign: "center" }}>
            {(watchFile as File & {preview: string})?.preview ? (
            <img
              src={URL.createObjectURL(watchFile!)}
              alt="preview"
              style={{ maxHeight: 200 }}
            />
            ): movie?.pictureUrl ? (
              <img
              src={movie?.pictureUrl}
              alt="preview"
              style={{ maxHeight: 200 }}
            />
            ) : null}
          </Grid>
        
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt:3}}>
                <Button onClick={() => setEditMode(false)} variant="contained" color="inherit">Cancel</Button>
                <LoadingButton 
                    loading={isSubmitting}
                    variant="contained" 
                    color="success" 
                    type="submit">Submit</LoadingButton>
            </Box>
        </form>
    </Box>
  )
}