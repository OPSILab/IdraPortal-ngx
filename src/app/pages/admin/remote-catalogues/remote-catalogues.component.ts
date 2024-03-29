import { Component, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CataloguesServiceService } from '../catalogues-service.service';
import { ODMSCatalogueInfo } from '../../data-catalogue/model/odmscatalogue-info';
import { ODMSCatalogue } from '../../data-catalogue/model/odmscatalogue';



interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Name: string;
  Country: string;
  Type: string;
  Level: string;
  Host: string;
}


@Component({
  selector: 'ngx-remote-catalogues',
  templateUrl: './remote-catalogues.component.html',
  styleUrls: ['./remote-catalogues.component.scss']
})
export class RemoteCataloguesComponent implements OnInit {
	
   cataloguesInfos: Array<ODMSCatalogueInfo>=[]
   loading=false;
   id=0;

   totalCatalogues;
   cataloguesMoreInfos: ODMSCatalogue
   data: TreeNode<FSEntry>[] = [];

   activeMode = [{text:'',value:true},{text:'',value:false}];
   allRemCat = []
   allRemCatJson = [];
 

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private restApi:CataloguesServiceService) { }

  ngOnInit(): void {
	
	
	// GET REM CATALOGUES LIST
	this.restApi.getAllRemCat().subscribe(infos =>{
				console.log("\nCHIAMATA API GET ALL REM CAT. infos: "+infos[0].URL);
				this.allRemCat = infos;
	
	},err=>{
      console.log(err);
     //this.loading=false;
    })

	this.restApi.getRemoteNodesJson().subscribe(infos2 =>{
				console.log("\nCHIAMATA API GET ALL REM CAT JSON. infos2: "+infos2.length);
				this.allRemCatJson = infos2;
				
				
				console.log("\nREM CAT 1: "+this.allRemCatJson[0].name);
// /*	
				 for (let k = 0; k < this.allRemCatJson.length; k++) {
							
					console.log("\nLOCATION: "+this.allRemCatJson[k].host);
					//let nameHost = "<a href=\""+infos2.host+"\\\">"+infos2.name+"<a/>";
					
					let level = this.getLevel(this.allRemCatJson[k].nodeType);
					
					
					let data2 = [
						    {
					       data: { Name: this.allRemCatJson[k].name, Country: this.allRemCatJson[k].country, Type: this.allRemCatJson[k].nodeType, Level: level, Host: this.allRemCatJson[k].host},
						}
					  ];
					
					if(this.data.length==0){
						
						this.data = [
						    {
					      data: { Name: this.allRemCatJson[k].name, Country: this.allRemCatJson[k].country, Type: this.allRemCatJson[k].nodeType, Level: level, Host: this.allRemCatJson[k].host},
					    }
					  ];
					}
					else{
						this.data = this.data.concat(data2);
						
					}
					
					//costrutisco la tabella
					this.dataSource = this.dataSourceBuilder.create(this.data);
					
					}

//*/


	
	},err=>{
      console.log(err);
     //this.loading=false;
    })
	
	
	
	
	
	/*
	
	    this.loading=true

    this.restApi.getCataloguesInfo().subscribe(infos =>{
    console.log("PRIMA API");
	
      this.cataloguesInfos = infos;
      this.totalCatalogues = this.cataloguesInfos.length;
      for (let i = 0; i < this.cataloguesInfos.length; i++) {

			  this.id=this.cataloguesInfos[i].id;
		
		      console.log("NUM CATALOGHI: "+this.cataloguesInfos[i].name);
			  console.log("ID CAT: "+this.id);
		
		      //this.searchRequest.nodes = infos.map(x=>x.id)
		      //this.searchDataset(true)    
		
		   
		      this.restApi.getCatalogue(this.id).subscribe(infos2 =>{
			  console.log("\nSECONDA API, ID: "+this.id);
		
		      this.cataloguesMoreInfos = infos2;
			 // this.loading=false
		      //this.searchDataset(true)    
console.log("\nLOCATION: "+infos2.host);
//let nameHost = "<a href=\""+infos2.host+"\\\">"+infos2.name+"<a/>";

let level = this.getLevel(infos2.nodeType);


let data2 = [
	    {
       data: { Name: infos2.name, Country: infos2.country, Type: infos2.nodeType, Level: level, Host: infos2.host},
	}
  ];

if(this.data.length==0){
	
	this.data = [
	    {
      data: { Name: infos2.name, Country: infos2.country, Type: infos2.nodeType, Level: level, Host: infos2.host},
    }
  ];
}
else{
	this.data = this.data.concat(data2);
	
}

//costrutisco la tabella
this.dataSource = this.dataSourceBuilder.create(this.data);


		    },err=>{
		      console.log(err);
		     // this.loading=false;
		    })
 
  this.loading=false



    } // fine FOR

    },err=>{
      console.log(err);
     this.loading=false;
    })
	*/
  }

getLevel(nodeType: string): string {
		switch(nodeType){
			case 'CKAN':
				//federationLevel='LEVEL_3';
				return "3";
			case 'DKAN':
				//node.federationLevel='LEVEL_2';
				return "2";
			case 'SOCRATA':
				//node.federationLevel='LEVEL_2';
				return "2";
			case 'SPOD':
				//node.federationLevel='LEVEL_2';
				return "2";
			case 'WEB':
				//node.federationLevel='LEVEL_2';
				return "2";
			case 'DCATDUMP':
				//if(node.dumpURL!=''){
					//node.federationLevel='LEVEL_2';
					return "2";
				//}
				//else{
					//node.federationLevel='LEVEL_4';
					//return "4";
				//}

			case 'ORION':
				//node.federationLevel='LEVEL_4';
				return "4";
			case 'SPARQL':
				//node.federationLevel='LEVEL_4';
				return "4";
			case 'OPENDATASOFT':
			case 'JUNAR':	
				//node.federationLevel='LEVEL_2';
				return "2";
			default:
				break;
			}
}

  // ------------------------- TABLE
  defaultColumns = [ 'Name', 'Country', 'Type', 'Level', 'Host'];
  allColumns = [ ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }



  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  //-------------------------------------------------------------

}
