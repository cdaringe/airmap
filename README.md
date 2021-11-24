# airmap

an application to download and visualize air quality data

## usage

visit [https://cdaringe.github.io/airmap](https://cdaringe.github.io/airmap)!

## contributing

- install `fnm` or `nvm`
- `npm install -g pnpm@6`
- `pnpm install`
- `pnpm dev`

Do great work.

- https://docs.google.com/spreadsheets/d/1IzYBZ7SjdQ7ODHxYBauEPcy2sxq5Il3UM9NSDoJYI_g/gviz/tq?tq=select%20B%2C%20G%2C%20H%0Alimit%2020
- https://docs.google.com/spreadsheets/d/1N6Fnoju2QqgpLTRHarGUbg21erRTaKH3V7wG3hhIEew

## Device Specifications

### PocketLabs

example: https://docs.google.com/spreadsheets/d/1ugwfzbs-lEfgvVOqYY848W3w-XuEWiuUTHHlkI_ur9Q/edit#gid=1896735924

- input

  - rows: only rows associated with `Mean PM1.0 (µg/m³)` & `Mean PM2.5 (µg/m³)`
    - other rows shall be discarded
  - columns: `Lat`, `Lng`, `Mean PM{1.0|2.5} (µg/m³)`

- output
  - single points per `Mean PM1.0 (µg/m³)` at `(Lng, Lat)` (x,y) coordinates
  - onClick of data point: ???

### AtmoTube

example: ...

- input

  - rows: ...
    - all rows shall be considered
  - columns: ...

- transformation:

  - EPA correction

- output
  - single points per `Mean PM2.5 (µg/m³)` at `(Lng, Lat)` (x,y) coordinates

### Flow2 - PlumeLabs

TBD

## ACTIONS ITEMS

- OK to select device ID specifically pre-load
- Add toggle PM1/PM2 rendering
