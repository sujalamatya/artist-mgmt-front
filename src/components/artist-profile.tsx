"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArtistById } from "@/api/api";

export default function ViewArtist() {
  const params = useParams();
  const id = params.id as string;

  const [artist, setArtist] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const artistId = parseInt(id, 10);
      const getArtist = async () => {
        try {
          const data = await fetchArtistById(artistId);
          setArtist(data);
        } catch (error) {
          console.error("Error fetching artist:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getArtist();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-6 w-1/6" />
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">Artist not found.</div>
    );
  }

  return (
    <div className="w-[500px] max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist.avatar_url || ""} alt="Artist Avatar" />
              <AvatarFallback className="text-2xl font-semibold">
                {artist.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                {artist.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Artist since {new Date(artist.created_at).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </span>
                <p className="text-base font-semibold">{artist.dob}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Gender
                </span>
                <p className="text-base font-semibold">{artist.gender}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Address
              </span>
              <p className="text-base font-semibold">{artist.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  First Release Year
                </span>
                <p className="text-base font-semibold">
                  {artist.first_release_year}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Albums Released
                </span>
                <p className="text-base font-semibold">{artist.no_of_albums}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Joined At
                </span>
                <p className="text-base font-semibold">
                  {new Date(artist.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Updated At
                </span>
                <p className="text-base font-semibold">
                  {new Date(artist.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
