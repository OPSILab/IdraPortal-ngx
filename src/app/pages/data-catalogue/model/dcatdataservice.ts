import { VCardOrganization } from './vcard-organization';

export interface DcatDataService {
  dataServiceId?: string;
  nodeId?: string;

  applicableLegislation?: String[]; // Legislation mandating the creation or management of the Data Service
  contactPoint?: VCardOrganization[];     // Contact information for comments about the Data Service
  documentation?: String[];         // Additional information about the Data Service
  endpointDescription?: String[];   // Description of services available via the endpoints
  endpointURL?: String[];           // Root location or primary endpoint of the service
  HVDCategory?: String[];           // HVD category to which this Data Service belongs
  licence?: String;                 // Licence under which the Data Service is made available
  rights?: String[];                // Rights associated with the Data Service
  servesDataset?: String[];         // Datasets that this Data Service can distribute
  title?: String;                   // Title of the Data Service
}