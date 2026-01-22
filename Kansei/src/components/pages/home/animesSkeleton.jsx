import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material'
import React from 'react'

export default function AnimesSkeleton() {
  const isMobile = useMediaQuery("(max-width:600px)")

  return (
    <Box mt={2} mb={2} display="flex" flexDirection="column" alignItems="center" gap={3}>
      {new Array(5).fill(null).map((_, index) => (
        <Stack key={index} direction="column" spacing={1} alignItems="center">
          {/* Скелет заголовка */}
          <Skeleton variant="text" animation="wave" width={isMobile ? "80%" : 200} height={32} />

          {/* Скелеты карточек */}
          <Stack direction="row" spacing={2} justifyContent="center">
            {new Array(5).fill(null).map((_, idx) => (
              <Box key={idx}>
                <Skeleton 
                  variant="rectangular" 
                  animation="wave" 
                  width={isMobile ? 150 : 350} 
                  height={250} 
                  sx={{ borderRadius: 2 }} 
                />
                <Skeleton 
                  variant="text" 
                  animation="wave" 
                  width={isMobile ? 150 : 350} 
                  height={20} 
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </Box>
  )
}
