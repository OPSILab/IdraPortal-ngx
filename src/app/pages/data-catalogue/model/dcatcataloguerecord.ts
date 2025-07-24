// filepath: c:\Users\ACER\Desktop\BeOpen\IdraPortal-ngx\src\app\pages\data-catalogue\model\dcatcataloguerecord.ts

import { DCTStandard } from './dctstandard';

export interface DcatCatalogueRecord {
  catalogueRecordId?: string;
  nodeID?: string;
  applicationProfile?: DCTStandard[];
  changeType?: String;
  description?: String[];
  language?: String[];
  listingDate?: String;
  modificationDate?: String;
  primaryTopic?: String;
  title?: String[];
}