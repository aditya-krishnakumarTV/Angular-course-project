import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthSignInResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

interface AuthSignUpResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiKey: string = 'AIzaSyBQA0mw8Gz-c9UBCoEyqHSyelP9AQlu7_M'

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthSignUpResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthSignInResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
    }
}