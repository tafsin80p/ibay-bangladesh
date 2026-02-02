import { useState, useEffect } from 'react';
import { DIVISIONS } from '@/types/product';

interface LocationState {
  division: string | null;
  loading: boolean;
  error: string | null;
}

// Simple mapping of coordinates to divisions (approximate centers)
const divisionCoordinates: Record<string, { lat: [number, number]; lng: [number, number] }> = {
  dhaka: { lat: [23.5, 24.5], lng: [89.5, 91.0] },
  chittagong: { lat: [21.5, 23.5], lng: [91.0, 92.5] },
  rajshahi: { lat: [24.0, 25.5], lng: [88.0, 89.5] },
  khulna: { lat: [22.0, 23.5], lng: [88.5, 90.0] },
  sylhet: { lat: [24.0, 25.5], lng: [91.0, 92.5] },
  barisal: { lat: [22.0, 23.0], lng: [89.5, 91.0] },
  rangpur: { lat: [25.0, 26.5], lng: [88.5, 90.0] },
  mymensingh: { lat: [24.0, 25.5], lng: [89.5, 91.0] },
};

function getDivisionFromCoords(lat: number, lng: number): string | null {
  for (const [division, coords] of Object.entries(divisionCoordinates)) {
    if (
      lat >= coords.lat[0] &&
      lat <= coords.lat[1] &&
      lng >= coords.lng[0] &&
      lng <= coords.lng[1]
    ) {
      return division;
    }
  }
  // Default to Dhaka if not found
  return 'dhaka';
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    division: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        division: 'dhaka',
        loading: false,
        error: 'Geolocation not supported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const division = getDivisionFromCoords(
          position.coords.latitude,
          position.coords.longitude
        );
        setState({
          division,
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          division: 'dhaka', // Default to Dhaka
          loading: false,
          error: error.message,
        });
      },
      { timeout: 5000 }
    );
  }, []);

  return state;
}
