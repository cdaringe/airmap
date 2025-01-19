import clsx from "clsx";
import { Popup } from "react-map-gl";

export type Props = {
  feature: GeoJSON.Feature<GeoJSON.Point>;
  title?: string;
} & Partial<React.ComponentProps<typeof Popup>>;

const MeasurementPopup: React.FC<Props> = ({
  feature,
  className,
  title,
  ...props
}) => {
  const [longitude, latitude] = feature.geometry.coordinates;
  return (
    <Popup
      {...{
        ...props,
        className: clsx("overflow-auto", className),
        latitude,
        longitude,
      }}
    >
      <>
        <h1 className="text-xl">{title}</h1>
        <table>
          <tbody>
            {Object.entries(feature.properties!).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {typeof value == "number" ? value.toPrecision(2) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </Popup>
  );
};
export default MeasurementPopup;
