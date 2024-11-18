import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PakageDetailModalService {
  private pakagesList = new BehaviorSubject<any[]>([]);
  CurrentPakagesList = this.pakagesList.asObservable();

  constructor() { }

  addPakages(pakageDetails: any) {
    const currentList = this.pakagesList.value;
    currentList.push(pakageDetails);
    this.pakagesList.next(currentList);
  }
  getPakagesList() {
    return this.pakagesList.value;
  }
}
