export function Loader({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
