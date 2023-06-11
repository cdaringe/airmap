import { BottomSheet } from "react-spring-bottom-sheet";
import { GeoJSONMiniWras } from "../../../../../../packages/cleanair-sensor-miniwras/mod";
import { MiniWrasStats } from "../../charts/miniwras-pm2-humidity";

export type Props = {
  isOpen: boolean;
  onDismiss: (v: boolean) => void;
  geojson: GeoJSONMiniWras;
};
export const MapBottomSheet: React.FC<Props> = ({
  isOpen,
  onDismiss,
  geojson,
}) => {
  return (
    <BottomSheet
      blocking={false}
      open={isOpen}
      onDismiss={() => onDismiss(false)}
    >
      <div className="p-4">
        <h3>PM2.5 & Humidity - MiniWRAS & PocketLabs</h3>
        <MiniWrasStats geojson={geojson as GeoJSONMiniWras} />
      </div>
    </BottomSheet>
  );
};
