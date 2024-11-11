import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AddCustAddressService {
  private addressList = new BehaviorSubject<any[]>([]);
  CurrentAddressList = this.addressList.asObservable();
  // @Output() updatedAddress = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  addAddressDetails(addrDetails: any) {
    const currentList = this.addressList.value;
    currentList.push(addrDetails);
    this.addressList.next(currentList);
  }

  getAddDetailsList() {
    return this.addressList.value;
  }

  getCountry(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/GetCountry`);
  }

  getCountryState(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/Customer/GetCountryState`
    );
  }

  updateCustAddre(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Customer/update/companyAddr/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  insertCustAddre(data: any): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/Customer/insert/Address`,
      data,
      { responseType: "text" as "json" }
    );
  }
}
