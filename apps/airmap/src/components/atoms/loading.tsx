import AirIcon from "../icon/svg/air";
export default function Loading({ msg }: { msg?: string }) {
  return (
    <div className="flex justify-center w-full flex-column content">
      <AirIcon className="w-20 animate-spin" />
      {msg ? (
        <>
          <br />
          <p>{msg}</p>
        </>
      ) : null}
    </div>
  );
}
