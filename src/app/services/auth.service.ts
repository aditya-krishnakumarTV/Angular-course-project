import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "../shared/user.model";

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

    user: BehaviorSubject<User> = new BehaviorSubject<User>(null)

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.errorHandler),
                tap(resData => {
                    this.authenticationHandler(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            )
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.errorHandler),
                tap(resData => {
                    this.authenticationHandler(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            )
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
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

    private authenticationHandler(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        )
        const useR = new User(
            email,
            userId,
            token,
            expirationDate
        )
        this.user.next(useR)
    }
}