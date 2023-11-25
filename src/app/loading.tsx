export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="dui-loading dui-loading-ball dui-loading-xs"></span>
      <span className="dui-loading dui-loading-ball dui-loading-sm"></span>
      <span className="dui-loading dui-loading-ball dui-loading-md"></span>
      <span className="dui-loading dui-loading-ball dui-loading-lg"></span>
    </div>
  );
}
