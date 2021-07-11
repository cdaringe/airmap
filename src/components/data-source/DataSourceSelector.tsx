import Select from "../atoms/select";

export enum DataSourceNames {
  googlesheetsurl = "googlesheetsurl",
  csvurl = "csvurl",
}

export const DataSourceSelector: React.FC<React.HTMLProps<HTMLSelectElement>> =
  (props) => (
    <Select {...props}>
      <option value={DataSourceNames.googlesheetsurl}>Google Sheets URL</option>
      <option value={DataSourceNames.csvurl}>CSV URL</option>
    </Select>
  );
