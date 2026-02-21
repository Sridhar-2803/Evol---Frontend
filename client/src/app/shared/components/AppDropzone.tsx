import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone"
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
  name: keyof T
} & UseControllerProps<T>

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
  const {fieldState, field} = useController({...props});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const fileWithPreview = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      });
      field.onChange(fileWithPreview);
    }
  }, [field]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const dzStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: 'rgba(123, 47, 190, 0.3)',
    borderRadius: '16px',
    padding: '30px',
    height: 200,
    width: '100%',
    maxWidth: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(123, 47, 190, 0.03)',
  }

  const dzActive = {
    borderColor: '#7B2FBE',
    backgroundColor: 'rgba(123, 47, 190, 0.08)',
    boxShadow: '0 0 20px rgba(123, 47, 190, 0.15)',
  }

  return (
    <div {...getRootProps()}>
      <FormControl
        style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}
        error={!!fieldState.error}
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: 60, color: '#A855F7', mb: 1, opacity: 0.7 }} />
        <Typography variant="subtitle1" sx={{ color: '#94A3B8' }}>
          Drop image here or click to browse
        </Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  )
}
