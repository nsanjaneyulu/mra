import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'esa-connect-withus',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, PanelModule, MenuModule],
  templateUrl: './connect-withus.component.html',
  styleUrls: ['./connect-withus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectWithusComponent  implements OnInit{
  cardList: MenuItem[] | undefined = []

    contactList = [
      {cardheader:'Technical Issues', cardicon:'esa-icon esa-icon-menu', user:'Qasir Riaz',  phone:[{icon:'', mobile:'+971 02 507 2784'}, {icon:'', mobile:'+971 50 674 7873'}], email:'Qasir.riaz@emiratessleel.com'},
      {cardheader:'Heavy Sections', cardicon:'esa-icon esa-icon-menu', user:'Manikantan Ganesan',  phone:[{icon:'', mobile:'+971 2 507 2860'}], email:'name@emiratessleel.com'},
      {cardheader:'Rebar, WireRod', cardicon:'esa-icon esa-icon-menu', user:'Hari Shankar',  phone:[{icon:'', mobile:'+971 2 507 3139'}], email:'name@emiratessleel.com'},
      {cardheader:'Market Analyst', cardicon:'esa-icon esa-icon-menu', user:'Pavel Vorobev',  phone:[{icon:'', mobile:'+971 2 507 3133'}], email:'name@emiratessleel.com'},
      {cardheader:'Market Analyst', cardicon:'esa-icon esa-icon-menu', user:'Pavel Vorobev',  phone:[{icon:'', mobile:'+971 2 507 3133'}], email:'name@emiratessleel.com'},
      {cardheader:'Market Analyst', cardicon:'esa-icon esa-icon-menu', user:'Pavel Vorobev',  phone:[{icon:'', mobile:'+971 2 507 3133'}], email:'name@emiratessleel.com'},
    ]

    ngOnInit(): void {
      this.getCardList()
     
    }


    getCardList(){
      
    }
}
