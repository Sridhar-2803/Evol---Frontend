import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/home";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 16 }}>
          <Paper sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 4,
            animation: 'fadeInUp 0.5s ease-out',
          }}>
            <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Something went wrong
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              An unexpected error occurred. Please try again.
            </Typography>
            {this.state.error && (
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(239, 68, 68, 0.05)',
                  color: 'error.light',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={this.handleReset}
                sx={{
                  background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
                  },
                }}
              >
                Go Home
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                sx={{
                  borderColor: 'primary.light',
                  color: 'primary.light',
                }}
              >
                Reload Page
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
