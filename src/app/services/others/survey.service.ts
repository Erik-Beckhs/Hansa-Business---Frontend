import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
idSurvey!:string

  constructor(
    private http:HttpClient
  ) { }

  getSurveyAndSectionByIdSurvey(is:string){
    let url=`${URL_SERVICE}/api/surveys?filter={"where": {"and": [{"id": "${is}"}]}, "include":"sections"}`
    return this.http.get(url) 
  }

  getQueriesByIdSection(idSection:any){
    let url = `${URL_SERVICE}/api/sections/${idSection}/queries`
    return this.http.get(url)
  }

  getQueriesAndOptionsByIdQuery(idQuery:any){
    let url=`${URL_SERVICE}/api/querys?filter={"where": {"and": [{"id": "${idQuery}"}]}, "include":"options"}`
    return this.http.get(url)
  }
}
