export default function Loading() {
  return (
    <div className="flex justify-center items-center py-24 space-x-2">
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}