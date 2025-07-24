import { VCardOrganization } from './vcard-organization';
import { DCTLocation } from './dctlocation';
import { FOAFAgent } from './foafagent';
import { DCTPeriodOfTime } from './dctperiod-of-time';

export interface DcatDatasetSeries {
  datasetSeriesId?: string;
  nodeId?: string;
  datasetId?: string;
  applicableLegislation?: String[];
  contactPoint?: VCardOrganization[];
  description?: String[];
  frequency?: String;
  geographicalCoverage?: DCTLocation[];
  modificationDate?: String;
  publisher?: FOAFAgent;
  releaseDate?: String;
  temporalCoverage?: DCTPeriodOfTime[];
  title?: String[];
}