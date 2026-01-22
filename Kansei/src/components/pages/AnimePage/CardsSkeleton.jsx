import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import React from "react";

export default function AnimesSkeleton({ rows = 2, cardsPerRow = 5 }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box mt={2} mb={2} display="flex" flexDirection="column" alignItems="center" gap={4}>
      {new Array(rows).fill(null).map((_, rowIdx) => (
        <Stack key={rowIdx} direction="column" spacing={2} alignItems="center" width="100%">
          {/* Скелет заголовка (для секции) */}
          <Skeleton
            variant="text"
            animation="wave"
            width={isMobile ? "60%" : 200}
            height={36}
          />

          {/* Скелет карточек */}
          <Stack
            direction="row"
            spacing={isMobile ? 1.5 : 2}
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
          >
            {new Array(cardsPerRow).fill(null).map((_, cardIdx) => (
              <Box key={cardIdx} sx={{ mb: isMobile ? 2 : 0 }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={isMobile ? 140 : 200}
                  height={isMobile ? 200 : 280}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={isMobile ? 140 : 200}
                  height={24}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
