import { Component, OnInit } from '@angular/core';

declare function import_plugins():any

@Component({
  selector: 'app-content-principal',
  templateUrl: './content-principal.component.html',
  styleUrls: ['./content-principal.component.css']
})
export class ContentPrincipalComponent implements OnInit {

  constructor() {
    import_plugins()
   }

  ngOnInit(): void {
    //location.reload()
  }
}
