import dynamic from "next/dynamic";

export default function CreatePost() {
  const CreateEventForm = dynamic(() => import('@/components/create-event/form'), {
    loading: () => <p>Loading...</p>,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <CreateEventForm />
    </div>
  );
}