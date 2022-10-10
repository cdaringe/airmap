export default function NoDatapoint() {
  return (
    <p className="p-2">
      The datafile provided could not be converted into geojson format.
      Generally, this occurs because the columns in the data sheet do not match
      the expected field names.
    </p>
  );
}
