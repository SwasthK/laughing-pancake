"use client";

import { onError } from "@/components/create-event/form-methods";
import { ProfileImage } from "@/components/profile/profile-image";
import { StatBox } from "@/components/profile/statbox";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { profileUpdateSchema } from "@/zod";
import { zodHandler } from "@/zod/resolve";
import { KeyRound, Sparkle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast.error("You are not authenticated. Please log in.");
      router.push("/signin");
    } else if (session.status === "loading") {
      toast.loading("Loading...");
    } else if (session.status === "authenticated") {
      toast.dismiss();
    }
  }, [session.status, router]);

  const { data, isLoading, error } = useSWR<FetchResponse<any>, FetchError>(
    session.status === "authenticated"
      ? `/api/profile/get-private?email=${session.data.user?.email}`
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    },
  );

  if (error) {
    toast.error(error.message);
    router.push("/signin");
  }

  const form = useForm<z.infer<typeof profileUpdateSchema>>();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const subscription = form.watch((val) => {
      setDisabled(!(val.bio || val.username));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(formdata: z.infer<typeof profileUpdateSchema>) {
    const updatedData: Record<string, string> = {};
    Object.entries(formdata).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        updatedData[key] = value;
      }
    });

    const { error } = zodHandler(updatedData, profileUpdateSchema);
    if (error) return toast.error(error);

    const res = await fetch("/api/profile/update-meta-data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    toast.promise(
      res.json().then((data) => {
        if (!data.success) {
          throw new Error(data.error);
        }
        return data;
      }),
      {
        loading: "Wait a moment...",
        success: (data) => data.message,
        error: (err) => err.message,
      },
    );
    form.setValue("username", "");
    form.setValue("bio", "");
  }

  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div className="lg:py-16 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative">
            <div className="flex gap-10 flex-col lg:h-[calc(100vh-250px)] justify-center  bg-[#DADADA] rounded-xl px-8 py-20 lg:px-6 xl:p-20 ">
              <p className="text-xl font-semibold absolute top-4 left-7">
                About <span className="text-[#666666]">you</span>
              </p>
              <div className="flex gap-8 lg:flex-row items-center">
                <ProfileImage
                  pUrl={data?.data.image}
                  fallback={data?.data.name}
                ></ProfileImage>
                <div className="flex flex-col gap-1 overflow-hidden truncate">
                  <p className="text-3xl font-semibold">{data?.data.name}</p>
                  <p className="text-sm">{data?.data.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold font-trebuchet text-sm">
                  Something about me
                </p>
                <p className="text-sm font-mono">
                  {data?.data.bio == ""
                    ? "Write about youself in the bio"
                    : data?.data.bio}
                </p>
              </div>
              <div className="flex gap-4 px-4 justify-center items-center">
                <StatBox value={11} label="Posts" />
                <StatBox value={"BCA"} label="Dept" />
                <StatBox value={"12"} label="Posts" />
              </div>
            </div>

            <div className="flex relative gap-10 flex-col lg:h-[calc(100vh-250px)] justify-center  bg-[#DADADA] rounded-xl px-8 py-20 lg:px-6  md:p-20 ">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                  <div>
                    <p className="text-xl font-semibold absolute top-4 left-7">
                      Update your{" "}
                      <span className="text-[#666666]">profile</span>
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm">Username</p>
                        <div className="flex flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="RockyJon"
                                  className="w-full"
                                />
                              </>
                            )}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">Bio</p>
                          <div className="flex flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                            <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                <Textarea
                                  {...field}
                                  className="resize-none font-mono text-sm"
                                  placeholder="Update your bio here"
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex mt-8 flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={disabled}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="flex gap-2 justify-start items-center">
                  <KeyRound className="h-5 w-5" />
                  <p>Generate a Pass key</p>
                </div>
                <div className="">
                  <p className="text-sm text-gray-700 font-mono">
                    Passkey is used for the secured login!
                  </p>
                  <Link
                    href="/web-auth"
                    className="flex gap-2 mt-4 text-sm justify-start items-center bg-black text-white px-2 py-1.5 rounded-lg w-24"
                  >
                    <Sparkle className="h-4 w-4" />
                    Generate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
