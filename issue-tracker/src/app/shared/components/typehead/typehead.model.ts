import { TypeheadSearchResult } from "./typehead.component";

export interface Typehead {
  placeholder?: string;
  search?: (event: TypeheadSearchResult | null) => void;
  searchItemSelected?: (event: any) => void;
}
