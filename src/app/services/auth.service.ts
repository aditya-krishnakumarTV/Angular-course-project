import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiKey: string = 'AIzaSyBQA0mw8Gz-c9UBCoEyqHSyelP9AQlu7_M'

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.errorHandler))
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.errorHandler))
    }

    private errorHandler(errorRes: HttpErrorResponse) {
        let errorMsg = "An Unknown Error Occurred!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMsg)
        } else {
            return throwError(() => {
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMsg = 'The email address is already in use by another account.'
                        break
                    case 'EMAIL_NOT_FOUND':
                        errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.'
                        break
                    case 'INVALID_PASSWORD':
                        errorMsg = 'The password is invalid or the user does not have a password.'
                        break
                    case 'USER_DISABLED':
                        errorMsg = 'The user account has been disabled by an administrator.'
                        break
                }
                return errorMsg
            })
        }
    }
}