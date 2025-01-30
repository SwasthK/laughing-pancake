import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

export default function CreatePost() {
  const CreateEventForm = dynamic(
    () => import("@/components/create-event/form"),
    {
      loading: () => (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader size={20} className="animate-spin" />
        </div>
      ),
    }
  );
  return (
    <div className="flex flex-col justify-center items-center">
      <CreateEventForm />
    </div>
  );
}
