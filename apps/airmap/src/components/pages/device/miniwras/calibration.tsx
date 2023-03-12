/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  DatEntry,
  RHO_TRUE,
  sum,
  toPartialμgPerM3,
  toPartialμgPerM3SansRho,
} from "../../../../../../../packages/cleanair-sensor-miniwras/mod";
import Button from "../../../atoms/button";
import Input from "../../../atoms/input";
import { useDataSource } from "../../../data-source/use-data-source";

function derivePM05Density(channels: DatEntry["channels"], rho: number) {
  return sum(
    ...channels.map((channel) =>
      toPartialμgPerM3(
        channel.value,
        channel.diameterMidpointNm,
        channel.calibrationIndex,
        rho
      )
    )
  );
}

const Calibration: React.FC = () => {
  const router = useRouter();
  const ds = useDataSource();
  const luggage = ds.value.luggage;
  if (!luggage) {
    console.warn(`missing miniwras luggage data, sending user to homepage`);
    router.replace("/");
    return null;
  }
  const [calibrationSampleIndex, setCalibrationSampleIndex] = React.useState(0);
  const features = luggage.features;
  const [referenceDensity, setReferenceDensity] = useState(
    features[calibrationSampleIndex]?.properties.pm05 || 1
  );
  const rhoCalibrated = React.useMemo(() => {
    const feature = features[calibrationSampleIndex].properties;
    const denominator = sum(
      ...feature.channels.map((channel, i) => {
        const value =
          i < feature.pm05EndCol
            ? toPartialμgPerM3SansRho(
                channel.value,
                channel.diameterMidpointNm,
                channel.calibrationIndex
              )
            : 0;
        return value;
      })
    );
    return referenceDensity / denominator;
  }, [referenceDensity, features, calibrationSampleIndex]);
  features.forEach(({ properties }) => {
    properties.pm05Calibrated = derivePM05Density(
      properties.channels,
      rhoCalibrated
    );
    properties.pm05To3Calibrated =
      properties.pm_2_5 - properties.pm05Calibrated;
  });
  return (
    <div className="p-4">
      <div>
        <label className="mt-4 mr-2" htmlFor="reference">
          Calibration Sample:
        </label>
        <select
          onChange={(evt) => {
            setCalibrationSampleIndex(parseInt(evt.currentTarget.value, 10));
          }}
        >
          {features.map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-2" htmlFor="reference">
          0.5 µg/m³ reference:
        </label>
        <Input
          name="reference"
          label="0.5 microgram per cubic meter reference"
          type="number"
          onChange={(evt) => {
            try {
              setReferenceDensity(parseFloat(evt.currentTarget.value));
            } catch {
              //
            }
          }}
          defaultValue={referenceDensity}
        />
      </div>
      <table className="mt-2">
        <tr>
          <td className="p-1">RHO_TRUE (PM0.5, kg/m3, Grimm)</td>
          <td className="p-1">RHO_CALIBRATED (PM0.5, kg/m3)</td>
        </tr>
        <tr>
          <td className="p-1">{RHO_TRUE.toFixed(2)}</td>
          <td className="p-1">{rhoCalibrated.toFixed(2)}</td>
        </tr>
        <tr></tr>
      </table>
      <br />
      <div>
        <Button
          onClick={() => {
            ds.update(ds.value);
            router.push("/map");
          }}
        >
          Continue
        </Button>
      </div>
      <br />
      <Head key={"caltable"}>
        <style>
          {`
table#caltab, th, td {
  border: 1px solid black;
}
`}
        </style>
      </Head>
      <table className="mt-2" id="caltab">
        <tr>
          <th className="p-1">Time</th>
          <th className="p-1">Density µg/m3 PM0.5 (uncalibrated)</th>
          <th className="p-1">Density µg/m3 PM0.5 (calibrated)</th>
        </tr>
        {luggage.features.map(
          ({ properties: { date, pm05, pm05Calibrated } }, i) => (
            <tr
              className={i === calibrationSampleIndex ? "bg-lime-200" : ""}
              key={i}
            >
              <td className="p-1">{date.toLocaleTimeString()}</td>
              <td className="p-1">{pm05.toFixed(2)}</td>
              <td className="p-1">{pm05Calibrated.toFixed(2)}</td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};

export default Calibration;
