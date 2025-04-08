"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArtistById, fetchArtistSongs } from "../actions/artist.action";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ViewArtist() {
  const params = useParams();
  const id = params.id as string;

  const [artist, setArtist] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const artistId = parseInt(id, 10);
      const getArtistData = async () => {
        try {
          const [artistData, songsData] = await Promise.all([
            fetchArtistById(artistId),
            fetchArtistSongs(artistId),
          ]);
          setArtist({
            ...artistData,
            songs: songsData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getArtistData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <Skeleton className="h-40 w-40 rounded-full md:h-60 md:w-60" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full md:w-96" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <Card className="w-full max-w-6xl mx-auto p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Artist not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The artist you're looking for doesn't exist or may have been
            removed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row gap-6 items-end">
        <Avatar className="h-40 w-40 md:h-60 md:w-60 border-4 border-background shadow-lg">
          <AvatarImage
            src={
              artist.image
                ? `http://localhost:8000${artist.image}`
                : "/placeholder.png"
            }
            alt={artist.name}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl font-bold bg-muted">
            {artist.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 flex-1">
          <Badge variant="secondary" className="text-sm">
            ARTIST
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {artist.name}
          </h1>
          <p className="text-muted-foreground">
            {artist.no_of_albums}{" "}
            {artist.no_of_albums === 1 ? "album" : "albums"} • Joined{" "}
            {new Date(artist.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">DEBUT</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{artist.first_release_year}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              GENDER
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{artist.gender}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              BIRTH DATE
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{artist.dob}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              LOCATION
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{artist.address}</p>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-2xl font-bold">About</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Artist Details</h3>
                <p className="text-muted-foreground mt-2">
                  {artist.name} began their musical journey in{" "}
                  {artist.first_release_year} and has since released{" "}
                  {artist.no_of_albums} albums.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">First Release</h3>
                <p className="text-muted-foreground mt-2">
                  {artist.first_release_year}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Activity</h3>
                <p className="text-muted-foreground mt-2">
                  Joined on {new Date(artist.created_at).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground mt-1">
                  Last updated{" "}
                  {new Date(artist.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Background</h3>
                <p className="text-muted-foreground mt-2">
                  Based in {artist.address || "unknown location"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Releases - Actual Songs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Popular Releases</h2>
        {artist.songs?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artist.songs.slice(0, 5).map((song: any) => (
              <Card
                key={song.id}
                className="hover:bg-accent/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden flex items-center justify-center">
                    {artist.image ? (
                      <img
                        src={`http://localhost:8000${artist.image}`}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-music"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold truncate">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {artist.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              No songs available for this artist
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
