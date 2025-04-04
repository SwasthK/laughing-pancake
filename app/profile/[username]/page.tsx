"use client";

import { Button } from "@/components/ui/button";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import React from "react";
import { Calendar, MapPin, Phone, User, Link2, FileText } from "lucide-react";
import { ProfileProgramCardProps } from "@/types";
import { ProfileProgramCard } from "@/components/profile-program-card/profile-program-card";

export default function Page() {
  const { username } = useParams();
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  if (!username?.includes("%40")) {
    router.push("/not-found");
    return null;
  }

  const normalizedUsername =
    typeof username === "string"
      ? username.replace(/%40/g, "@").split("@")[0]
      : Array.isArray(username)
      ? username[0]
      : username;

  useEffect(() => {
    if (session.status === "loading") return;

    if (session.status === "authenticated" && session.data?.user?.email) {
      const email = session.data.user.email;
      const userEmailName = email.split("@")[0];

      if (normalizedUsername === userEmailName) {
        router.push("/profile/me");
      } else {
        setLoading(false);
      }
    } else {
      router.push("/signin");
    }
  }, [session, normalizedUsername, router]);

  const {
    data,
    error,
    isLoading: isDataLoading,
  } = useSWR<
    FetchResponse<{
      name: string;
      bio: string;
      image: string;
      email: string;
      program: {
        Poster: ProfileProgramCardProps;
      }[];
    }>,
    FetchError
  >(
    session.status === "authenticated" && !loading
      ? `/api/profile/get-public?email=${normalizedUsername}@gmail.com`
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    }
  );

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full h-screen flex-col gap-2 flex items-center justify-center text-red-500">
        <div className="p-4 sm:p-32 flex-col gap-6 flex items-center justify-center bg-white rounded-lg">
          <p className="text-2xl sm:text-4xl">Error</p>
          <p className="text-sm font-mono text-center">
            {"User Not Found"} <br /> Please check the username and try again.
          </p>
          <Button onClick={() => router.push("/profile/me")}>
            Go to my profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {isDataLoading ? (
        <p>Loading profile data...</p>
      ) : (
        <>
          <div className="">
            {/* User profile header */}
            <div className="mb-4 rounded-lg flex flex-col md:flex-row justify-start md:justify-center bg-[#DADADA] px-8 gap-8 md:items-center p-6 ">
              <div className="relative aspect-square h-32 rounded-md md:rounded-full">
                {data?.data?.image ? (
                  <Image
                    src={data.data.image}
                    fill
                    alt={`${data?.data?.name || "User"}'s avatar`}
                    className="absolute object-cover rounded-md md:rounded-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white text-3xl font-bold">
                    {normalizedUsername.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-grow  flex-col px-8 py-2 items-start justify-start ">
                <p className="text-3xl font-semibold mb-1">{data?.data.name}</p>
                <p className="text-sm mb-3">{data?.data.email}</p>
                <div className="p-6  rounded-md">
                  <p className="font-semibold">About Me</p>
                  <p>{data?.data.bio}</p>
                </div>
              </div>
            </div>
          </div>
          {data?.data.program && (
            <>
              <div>
                <p className="text-2xl font-semibold mb-4">
                  Programs by {data?.data.name}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">
                {data?.data.program.map(
                  (program: { Poster: ProfileProgramCardProps }) => (
                    <Fragment key={program.Poster.title}>
                      <ProfileProgramCard
                        title={program.Poster.title}
                        brochure={program.Poster.brochure}
                        link={program.Poster.link}
                        eventType={program.Poster.eventType}
                        image={program.Poster.image}
                        date={program.Poster.date}
                      />
                    </Fragment>
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}


