import { Component, OnInit } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef, NbSelectModule } from '@nebular/theme';
import { Datalet } from '../model/datalet';
import { DataCataglogueAPIService } from '../services/data-cataglogue-api.service';
import { SafeHtmlPipe } from '../../../@theme/pipes';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [NbCardModule, NbSelectModule, SafeHtmlPipe, CommonModule, TranslateModule, NbButtonModule],
  selector: 'ngx-show-datalets',
  templateUrl: './show-datalets.component.html',
  styleUrls: ['./show-datalets.component.scss']
})
export class ShowDataletsComponent implements OnInit {


  datasetID:string;
  nodeID:string;
  distributionID:string;

  datalets:Array<Datalet>=[];

  selected:Datalet=new Datalet();

  constructor(
    protected dialogRef: NbDialogRef<ShowDataletsComponent>, protected restApi: DataCataglogueAPIService) {}

  ngOnInit(): void {
    this.restApi.getDatalets(this.nodeID,this.datasetID,this.distributionID).subscribe(
      res => {
        if(res.length==0){
          // show message that no datalets are available
          this.datalets=[];
          this.selected = {datalet_html:"<div>No datalet found</div>"};
          return
        }
        this.datalets=res;
        this.selected=this.datalets[0];
      },
      err => console.log(err)
    )
  }

  close() {
    this.dialogRef.close();
  }

}
