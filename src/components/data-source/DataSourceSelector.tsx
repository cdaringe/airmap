import Select from "../atoms/select";

export enum DataSourceNames {
  googlesheetsurl = "googlesheetsurl",
  csvurl = "csvurl",
  googleDrive = "googledrive",
}

export const DataSourceSelector: React.FC<React.HTMLProps<HTMLSelectElement>> =
  (props) => (
    <Select {...props}>
      <option value={DataSourceNames.googlesheetsurl}>Google Sheets URL</option>
      <option disabled value={DataSourceNames.googleDrive}>
        Google Drive
      </option>
      <option disabled value={DataSourceNames.csvurl}>
        CSV URL
      </option>
    </Select>
  );
