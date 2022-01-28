import AirIcon from "../icon/svg/air";
export default function Loading() {
  return (
    <div className="flex flex-column w-full content justify-center">
      <AirIcon className="animate-spin w-20" />
    </div>
  );
}
