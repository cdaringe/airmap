import dynamic from "next/dynamic";
import { BottomSheet } from "react-spring-bottom-sheet";
import { GeoJSONAeroqualS500 } from "../../../../../../packages/cleanair-sensor-aeroqual-s500/mod";
import {
  AEROQUAL_S500_ID,
  MINIWRAS_ID,
  TIGER_XT_ID,
} from "../../../../../../packages/cleanair-sensor-common/mod";
import { GeoJSONMiniWras } from "../../../../../../packages/cleanair-sensor-miniwras/mod";
import { GeoJSONTigerXt } from "../../../../../../packages/cleanair-sensor-tiger-xt/mod";

const MiniWrasStatsDyn = dynamic(
  () =>
    import("../../charts/miniwras-pm2-humidity").then((it) => it.MiniWrasStats),
  { ssr: false }
);

const AeroqualS500StatsDyn = dynamic(
  () => import("../../charts/aeroquals500-tvoc").then((it) => it.TVOC),
  { ssr: false }
);

const TigerXtStatsDyn = dynamic(
  () => import("../../charts/tiger-xt-isobutylene").then((it) => it.TigerXtIsobutylene),
  { ssr: false }
);

export type Props = {
  isOpen: boolean;
  onDismiss: (v: boolean) => void;
  geojson: GeoJSON.FeatureCollection<any>;
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
        ) : sensorId === TIGER_XT_ID ? (
          <TigerXtStatsDyn geojson={geojson as GeoJSONTigerXt} />
        ) : (
          <div>Unknown sensor</div>
        )}
      </div>
    </BottomSheet>
  );
};
