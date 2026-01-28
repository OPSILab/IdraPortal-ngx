import { DcatCatalogueRecord } from "./dcatcataloguerecord";
import { DcatDataService } from "./dcatdataservice";
import { DCTLocation } from "./dctlocation";
import { DCTPeriodOfTime } from "./dctperiod-of-time";
import { FOAFAgent } from "./foafagent";
import { ODMSCatalogueImage } from "./odmscatalogue-image";
import { ODMSCatalogueType } from "./odmscatalogue-type.enum";


export class ODMSCatalogue {
    id?: string;
    name: string;
    host: string;
    nodeType: ODMSCatalogueType;
    publisherName?: string;
    publisherUrl?: string;
    publisherEmail?: string;
    datasetCount?: number;
    registerDate?: string;
    lastUpdateDate?: string;
    description?: string;
    image?: ODMSCatalogueImage;
    location?: string;
    locationDescription?: string;
    isActive?: boolean;
    country?: string;
    category?: string;
    applicableLegislation?: string[];
    creator?: FOAFAgent;
    geographicalCoverage?: DCTLocation[];
    record?: DcatCatalogueRecord[];
    service?: DcatDataService[];
    temporalCoverage?: DCTPeriodOfTime[];

    constructor() { }
}