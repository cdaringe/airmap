import clsx from "clsx";
import { Popup } from "react-mapbox-gl";

const MATCH_LATLONG_PRECISION = 6;

/**
 * Coordinates should be reduced precision, as mapbox API does not have a mechanism
 * to link the click event to the underlying data-point
 */
const toReducedCoordMatchPrecision = (v: number) =>
  v.toPrecision(MATCH_LATLONG_PRECISION);

export type Props = {
  evt: mapboxgl.MapMouseEvent;
  geojson: GeoJSON.FeatureCollection;
  title?: string;
} & Partial<React.ComponentProps<typeof Popup>>;

const MeasurementPopup: React.FC<Props> = ({
  coordinates: userCoordinates,
  className,
  evt,
  geojson,
  title,
  ...props
}) => {
  const coordinatesStrs = evt.lngLat
    .toArray()
    .map(toReducedCoordMatchPrecision);
  const [evtX, evtY] = coordinatesStrs;
  const coordinates = coordinatesStrs.map((v) => parseFloat(v));
  const properties =
    geojson?.features.find((f) => {
      const [cx, cy] = (f.geometry as any).coordinates.map(
        toReducedCoordMatchPrecision
      );
      return cx === evtX && cy === evtY;
    })?.properties || {};
  return (
    <Popup
      coordinates={userCoordinates || coordinates}
      className={clsx("overflow-auto", className)}
      {...props}
    >
      <>
        <h1 className="text-xl">{title}</h1>
        <table>
          <tbody>
            {Object.entries(properties).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </Popup>
  );
};
export default MeasurementPopup;
