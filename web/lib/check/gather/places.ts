/**
 * web/lib/check/gather/places.ts
 *
 * Fetches Google Places (New API) data for the business.
 * Gracefully skips if GOOGLE_MAPS_API_KEY is not set.
 */

import { ENV } from "../config";
import type { PlacesResult, PlacesData } from "../types";

interface PlacesApiPlace {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  types?: string[];
  regularOpeningHours?: {
    openNow?: boolean;
    periods?: unknown[];
  };
  websiteUri?: string;
  nationalPhoneNumber?: string;
  businessStatus?: string;
  googleMapsUri?: string;
  photos?: unknown[];
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
  }[];
}

interface PlacesApiResponse {
  places?: PlacesApiPlace[];
}

export async function gatherPlaces(business: string, suburb: string): Promise<PlacesResult> {
  if (!ENV.google) {
    return {
      available: false,
      note: "GOOGLE_MAPS_API_KEY not set",
    };
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": ENV.google,
        "X-Goog-FieldMask": [
          "places.id",
          "places.displayName",
          "places.rating",
          "places.userRatingCount",
          "places.primaryType",
          "places.types",
          "places.regularOpeningHours",
          "places.websiteUri",
          "places.nationalPhoneNumber",
          "places.businessStatus",
          "places.googleMapsUri",
          "places.reviews",
          "places.photos",
        ].join(","),
      },
      body: JSON.stringify({ textQuery: `${business} ${suburb}` }),
    });

    if (!response.ok) {
      return {
        available: false,
        note: `Places API error: HTTP ${response.status} ${response.statusText}`,
      };
    }

    const body = (await response.json()) as PlacesApiResponse;
    const place = body.places?.[0];

    if (!place) {
      return {
        available: true,
        note: "No matching place found in Google Maps",
      };
    }

    const recentReviews = (place.reviews ?? []).map((r) => ({
      rating: r.rating ?? null,
      when: r.relativePublishTimeDescription ?? r.publishTime ?? null,
    }));

    const data: PlacesData = {
      name: place.displayName?.text ?? "",
      rating: place.rating ?? null,
      reviewCount: place.userRatingCount ?? null,
      primaryType: place.primaryType ?? null,
      types: place.types ?? [],
      hasHours: !!place.regularOpeningHours,
      openNow: place.regularOpeningHours?.openNow ?? null,
      website: place.websiteUri ?? null,
      phone: place.nationalPhoneNumber ?? null,
      businessStatus: place.businessStatus ?? null,
      photoCount: place.photos?.length ?? 0,
      recentReviews,
      mapsUri: place.googleMapsUri ?? null,
    };

    return { available: true, data };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      available: false,
      note: `Places fetch error: ${msg}`,
    };
  }
}
