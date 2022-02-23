export default function MapError({
  error,
  datasource,
}: {
  error?: unknown;
  datasource: unknown;
}) {
  return (
    <div className="p-2">
      <h1>Error</h1>
      <h2>Failed to load map data.</h2>
      <p>
        {typeof error === "string" ? (
          error
        ) : (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        )}
      </p>
      <p>
        Are you sure your datasource is correct?
        <pre>{JSON.stringify(datasource, null, 2)}</pre>
      </p>
    </div>
  );
}
