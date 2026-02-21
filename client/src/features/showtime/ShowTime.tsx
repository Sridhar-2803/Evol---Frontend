import { Box, Card, CardActionArea, CardContent, Chip, Grid, Skeleton, Typography } from "@mui/material";
import { useFetchShowTimesQuery } from "../home/homeApi"
import { Link, useParams } from "react-router-dom";
import { formatShowTime } from "../../library/date";

export default function ShowTime() {
  const {id} = useParams();
  const {data, isLoading} = useFetchShowTimesQuery();

  if (!data || isLoading) return (
    <Box>
      <Skeleton variant="text" width={260} height={48} sx={{ mx: 'auto', mb: 4, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} elevation={0} sx={{ width: 220 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Skeleton variant="text" width="80%" height={32} sx={{ mx: 'auto' }} animation="wave" />
              <Skeleton variant="rectangular" width={70} height={24} sx={{ mx: 'auto', mt: 1, borderRadius: 2 }} animation="wave" />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )

  return (
    <Grid>
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
        Select Showtime
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        animation: 'fadeInUp 0.6s ease-out',
      }}>
        {data.map(st => (
          <Grid key={st.id}>
            <Card
              elevation={0}
              sx={{
                width: 220,
                textAlign: 'center',
                ...(st.status !== "Full" && {
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 16px 40px rgba(123, 47, 190, 0.3)'
                        : '0 16px 40px rgba(0, 0, 0, 0.12)',
                    borderColor: 'primary.main',
                  },
                }),
                ...(st.status === "Full" && {
                  opacity: 0.5,
                  filter: 'grayscale(30%)',
                }),
              }}
            >
              <Box>
                <CardActionArea
                  component={Link}
                  to={`/home/${id}/theatre/${id}/showtime/${st.id}/bookticket`}
                  disabled={st.status == "Full"}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {formatShowTime(st.time)}
                    </Typography>
                    <Chip
                      label={st.status}
                      size="small"
                      color={
                        st.status === "Available"
                          ? "success"
                          : st.status === "Fast"
                          ? "warning"
                          : "error"
                      }
                      variant={st.status === "Full" ? "outlined" : "filled"}
                      sx={{ mt: 1, fontWeight: 700, px: 1 }}
                    />
                  </CardContent>
                </CardActionArea>
              </Box>
            </Card>
          </Grid>
        ))}
      </Box>
    </Grid>
  )
}
