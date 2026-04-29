export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
      {message}
    </div>
  );
}
