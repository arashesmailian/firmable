export type Company = {
  id: string; // uuid
  name: string;
  abn: number;
  gst: string;
  address_state: string;
  address_postcode: string;
  record_last_updated: string; // timestamp
};
