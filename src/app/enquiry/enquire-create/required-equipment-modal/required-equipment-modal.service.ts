import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequiredEquipmentModalService {

  private equipmentList = new BehaviorSubject<any[]>([]);
  CurrentEquipmentList = this.equipmentList.asObservable();

  constructor() { }

  addEquipment(equipmenttDetails: any) {
    const currentList = this.equipmentList.value;
    currentList.push(equipmenttDetails);
    this.equipmentList.next(currentList);
  }
  getEquipementList() {
    return this.equipmentList.value;
  }
}
