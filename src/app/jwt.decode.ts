import { Injectable } from '@angular/core';
import {jwtDecode }from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoder {
  constructor() { }

  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);

      return decoded;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getUserId(token: string): number | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.id !== undefined) {
      console.log(decodedToken.id,"ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
      return decodedToken.id;
     
    } else {
      console.error('Token does not contain user ID');
      return null;
    }
  }  

  getProfilekey(token: string): number | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.isProfileCompleted !== undefined) {
      console.log(decodedToken.isProfileCompleted,"ssssssssssssssssssssssssss")
      return decodedToken.isProfileCompleted;
     } else {
      console.error('Token does not profile contain user ID');
      return null;
    }
  }

  getUserRole(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      console.log('Decoded token:', decodedToken);
      if (decodedToken.role_id !== undefined) {
        return decodedToken.role_id;
      } else {
        console.error('Token does not contain role_id');
      }
    } else {
      console.error('Failed to decode token');
    }
    return null;
  }
}
