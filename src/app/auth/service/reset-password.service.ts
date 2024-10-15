import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/ResetPassword';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    private baseUrl: string = `${environment.apiUrl}/User`
    // http://localhost:5154/api/User/reset-password

    constructor(private http: HttpClient) { }
sendResetPasswordLink(email: string) {
        return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`, {})
}
resetPassword (resetPasswordObj: ResetPassword) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPasswordObj)
}
}