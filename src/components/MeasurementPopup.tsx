import clsx from "clsx";
import { Popup } from "react-mapbox-gl";

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
  return (
    <Popup
      coordinates={feature.geometry.coordinates}
      className={clsx("overflow-auto", className)}
      {...props}
    >
      <>
        <h1 className="text-xl">{title}</h1>
        <table>
          <tbody>
            {Object.entries(feature.properties!).map(([key, value]) => (
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
