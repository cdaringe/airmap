# MiniWras Data Processing

The MiniWras device emits TSV data:

```csv
Time	Scan #	10.00 nm	14.00 nm	19.00 nm	27.00 nm	37.00 nm	52.00 nm	72.00 nm	100.00 nm	139.00 nm	193.00 nm	274.58 nm	323.88 nm	381.74 nm	449.48 nm	530.18 nm	625.38 nm	737.02 nm	867.18 nm	1021.47 nm	1205.86 nm	1424.96 nm	1679.58 nm	1978.13 nm	2332.27 nm	2745.80 nm	3238.77 nm	3817.43 nm	4499.40 nm	5307.20 nm	6253.83 nm	7370.21 nm	8685.62 nm	10240.20 nm	12069.47 nm	14226.56 nm	16773.33 nm	19768.32 nm	23301.03 nm	27467.18 nm	32375.50 nm	38162.42 nm	Inhalable [ug/m3]	Thoracic [ug/m3]	Alveolar [ug/m3]	pm10 [ug/m3]	pm2.5 [ug/m3]	pm1 [ug/m3]	ID:N	Meas_Nr	Ic[nA]	HV[V]	Um[V]	RH[%]	T[0C]	Err0	Err1	Loc	GF	Err2	Qbatt	Im	Sensor Ue4	Sensor Ue3	Sensor Ue2 (RH [%])	Sensor Ue1 (T [�C])	Iv	ID:M	Ivv Dev	LV Error
2023/02/02 06:00:44	1	5.787251E+3	8.070842E+3	1.007647E+4	1.402742E+4	1.846404E+4	2.376446E+4	2.276977E+4	1.658080E+4	9.235065E+3	3.550260E+3	1.596523E+3	6.485875E+2	3.097462E+2	1.740281E+2	6.360876E+1	3.226155E+1	1.053072E+1	4.711737E+0	2.077703E+0	8.339319E-1	1.505604E+0	7.886470E-1	1.174567E+0	7.781324E-1	6.470148E-1	4.700911E-1	4.257875E-1	1.936148E-1	1.546820E-1	4.198900E-2	2.808192E-2	1.400135E-2	4.190348E-2	0.000000E+0	0.000000E+0	0.000000E+0	1.402136E-2	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	3.385421E+1	2.677213E+1	2.069907E+1	2.620491E+1	1.682880E+1	1.445200E+1	N	20	2.501	3077	5.05	24.4	20.8	0	0	1	20	0	130	40			0	0.0	0	Mc	5.533915E+2	0
2023/02/02 06:01:44	2	2.484052E+4	3.166615E+4	3.200553E+4	2.873552E+4	2.706509E+4	2.613813E+4	2.323285E+4	1.642364E+4	9.111564E+3	3.491002E+3	1.743297E+3	7.241478E+2	3.313762E+2	1.887300E+2	6.258102E+1	3.527076E+1	1.284748E+1	4.711737E+0	2.216216E+0	1.111909E+0	1.163421E+0	9.320374E-1	7.600142E-1	9.903503E-1	7.314081E-1	2.626980E-1	1.987008E-1	2.351037E-1	2.953021E-1	6.998166E-2	9.828670E-2	7.000673E-2	4.190348E-2	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	3.307519E+1	3.140514E+1	2.210167E+1	3.224425E+1	1.778733E+1	1.558370E+1	N	30	2.504	3075	5.05	23.5	20.8	0	0	1	20	0	130	40			0	0.0	0	Mc	6.011067E+2	0
2023/02/02 06:02:44	3	1.199077E+4	1.588993E+4	1.773295E+4	2.026218E+4	2.366204E+4	2.802270E+4	2.634327E+4	1.904475E+4	1.059736E+4	4.070677E+3	1.929187E+3	8.167281E+2	3.813637E+2	2.030118E+2	6.720585E+1	3.576063E+1	1.228584E+1	5.497026E+0	2.701013E+0	2.015336E+0	1.916223E+0	1.433904E+0	9.672908E-1	9.196110E-1	9.001945E-1	6.774843E-1	1.845079E-1	1.797852E-1	1.546820E-1	1.819523E-1	1.123277E-1	2.800269E-2	5.587131E-2	2.810311E-2	0.000000E+0	1.400924E-2	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	0.000000E+0	4.304265E+1	3.652654E+1	2.457039E+1	3.576649E+1	1.999102E+1	1.713338E+1	N	40	2.503	3074	5.05	22.9	20.9	0	0	1	20	0	130	40			0	0.0	0	Mc	6.570542E+2	0
```

Observations:

- Most columns represent a scalar value that _correlates_ to a particle count

## Processing

## Parse data

Convert TSV => object representation.

## Derive a virtual density value, ρ_derived

...representing the virtual density for all of the observed particulate.
Such a value will likely be a flawed, especially given that our assumptions presume multiple particle types and multiple manifestations of diesel--our particle of greatest interest.

1. Given an miniwras-aggregated PM2.5 value, derive the particulate density by solving for `ρ`
   - `pm2_5 = GRIMM_SUMMATION`
   - `pm2_5 = Σ(ρ*channel_observation_i)`
   - `pm2_5 = (ρ * x_0) + (ρ * x_1) + ... (ρ * x_n)`
   - `pm2_5 = ρ * (x_0 + x_1 + ... + n)`
   - `ρ = (x_0 + x_1 + ... + n) / pm2_5`

...where `i` maps to channel and `y` maps to sample. `x_i` is a scalar, representing a given channel's contribution to the overall pm2.5 density. For any given `y`, `x_i` is:

1. `raw_observation_i` (scalar / cm^3)
2. `|> / channel_calibration_factor_i` (see appendix)
3. `|> * (cubic-cm-to-cubic-m)` (cm^3 / m^3)
4. `|> * (pi/6)`
5. `|> * channel_midpoint_diameter_m^3` (m^3 / 1)
6. `|> * 1e9` (µg/kg)

...these units don't cancel, so I'm unclear why we `* 1e9`. This formula was provided by Grimm & PCA.
With no known correct inputs and outputs, current implentations

`x_i` are summed for all <3000nm channels (which are presumed to be included in the Grimm pm2.5 column, due to obscure European standard). `ρ_derived = pm2_5_y0 / sum(x_i_y0)` (µg / m^ 3).

## Appendix

## channel_calibrations

```json
[
  6.842765,
  7.1751666,
  7.0114602,
  6.9088991,
  7.0263146,
  6.9180838,
  7.0393966,
  6.989318,
  6.9812267,
  5.2701795,
  14.0655402,
  13.8262107,
  14.1929174,
  14.0017841,
  13.8883794,
  13.9963284,
  14.0409634,
  14.2779903,
  13.8513492,
  13.898864,
  13.6873067,
  14.3390373,
  13.8184393,
  14.1478588,
  14.0655395,
  13.8262102,
  14.1929179,
  13.8296286,
  14.062005,
  13.9963317,
  14.040958,
  14.001345,
  13.96783,
  /* div/0 */ 14,
  13.95533,
  14.00924,
  /* div/0 */ 14,
  /* div/0 */ 14,
  /* div/0 */ 14,
  /* div/0 */ 14,
  /* div/0 */ 14,
];
```
