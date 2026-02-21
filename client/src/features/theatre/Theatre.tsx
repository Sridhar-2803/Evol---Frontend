import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useFetchTheatresQuery } from "../home/homeApi";
import TheatreList from "./TheatreList";

export default function Theatre() {
  const {data, isLoading} = useFetchTheatresQuery();

  if (!data || isLoading) return (
    <Box>
      <Skeleton variant="text" width={240} height={48} sx={{ mx: 'auto', mb: 4, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} elevation={0} sx={{ width: 345 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} animation="wave" />
              <Skeleton variant="text" width="40%" animation="wave" />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #F1F5F9, #A855F7)'
              : 'linear-gradient(135deg, #1E1B2E, #7B2FBE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Select Theatre
      </Typography>
      <TheatreList theatre={data} />
    </>
  )
}
