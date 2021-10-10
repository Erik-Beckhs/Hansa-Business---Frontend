import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  contactos:any

  constructor(private service:LoginService) { }

  ngOnInit(): void {
    this.service.getContacts().then(con=>console.log(con))
  }
}
