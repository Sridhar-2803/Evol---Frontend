import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Chip, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Movielist from "./Movielist";
import { useFetchMoviesQuery } from "./homeApi";

function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

export default function Home() {
  const {data, isLoading} = useFetchMoviesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = useMemo(() => {
    if (!data) return [];
    const unique = [...new Set(data.map(m => m.genre).filter(Boolean))];
    return ['All', ...unique];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter(m =>
      m.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedGenre === 'All' || m.genre === selectedGenre)
    );
  }, [data, debouncedSearch, selectedGenre]);

  if (isLoading || !data) return (
    <Box sx={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <Skeleton
        variant="text"
        width={220}
        height={48}
        sx={{
          mx: 'auto',
          mb: 4,
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(168, 85, 247, 0.12)'
              : 'rgba(123, 47, 190, 0.08)',
        }}
        animation="wave"
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} elevation={0} sx={{ width: 250, overflow: 'hidden' }}>
            <Skeleton
              variant="rectangular"
              height={340}
              sx={{
                borderRadius: '16px 16px 0 0',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(168, 85, 247, 0.1)'
                    : 'rgba(123, 47, 190, 0.06)',
              }}
              animation="wave"
            />
            <CardContent>
              <Skeleton
                variant="text"
                width="70%"
                sx={{
                  mx: 'auto',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(168, 85, 247, 0.12)'
                      : 'rgba(123, 47, 190, 0.08)',
                }}
                animation="wave"
              />
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
          mb: 3,
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
        Now Showing
      </Typography>

      {/* Search Bar */}
      <Box sx={{ maxWidth: 480, mx: 'auto', mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Genre Filter Chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
        {genres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            onClick={() => setSelectedGenre(genre)}
            variant={selectedGenre === genre ? 'filled' : 'outlined'}
            sx={{
              ...(selectedGenre === genre
                ? {
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }
                : {
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(168, 85, 247, 0.4)'
                        : 'rgba(123, 47, 190, 0.3)',
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: 'rgba(123, 47, 190, 0.1)',
                    },
                  }),
            }}
          />
        ))}
      </Box>

      {filtered.length > 0 ? (
        <Movielist movie={filtered} />
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No movies found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter
          </Typography>
        </Box>
      )}
    </>
  )
}
