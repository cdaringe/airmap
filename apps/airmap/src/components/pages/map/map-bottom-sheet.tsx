import dynamic from "next/dynamic";
import { BottomSheet } from "react-spring-bottom-sheet";
import { GeoJSONAeroqualS500 } from "../../../../../../packages/cleanair-sensor-aeroqual-s500/mod";
import {
  AEROQUAL_S500_ID,
  MINIWRAS_ID,
} from "../../../../../../packages/cleanair-sensor-common/mod";
import { GeoJSONMiniWras } from "../../../../../../packages/cleanair-sensor-miniwras/mod";

const MiniWrasStatsDyn = dynamic(
  () =>
    import("../../charts/miniwras-pm2-humidity").then((it) => it.MiniWrasStats),
  { ssr: false }
);

const AeroqualS500StatsDyn = dynamic(
  () => import("../../charts/aeroquals500-tvoc").then((it) => it.TVOC),
  { ssr: false }
);

export type Props = {
  isOpen: boolean;
  onDismiss: (v: boolean) => void;
  geojson: GeoJSONAeroqualS500;
  sensorId: number;
};
export const MapBottomSheet: React.FC<Props> = ({
  isOpen,
  onDismiss,
  geojson,
  sensorId,
}) => {
  /**
   * @warn Using weird version: https://github.com/stipsan/react-spring-bottom-sheet/issues/293
   */
  return (
    <BottomSheet
      blocking={false}
      open={isOpen}
      onDismiss={() => onDismiss(false)}
    >
      <div className="p-4">
        {sensorId === MINIWRAS_ID ? (
          <MiniWrasStatsDyn geojson={geojson as GeoJSONMiniWras} />
        ) : sensorId === AEROQUAL_S500_ID ? (
          <AeroqualS500StatsDyn geojson={geojson as GeoJSONAeroqualS500} />
        ) : (
          <div>Unknown sensor</div>
        )}
      </div>
    </BottomSheet>
  );
};
