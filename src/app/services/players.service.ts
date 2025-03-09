import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/auth.interface';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private readonly API_URL = 'http://localhost:8000';

    constructor(private http: HttpClient) { }

    getPlayers(page: number = 1, pageSize: number = 100): Observable<Player[]> {
        const skip = (page - 1) * pageSize;
        return this.http.get<Player[]>(`${this.API_URL}/players?skip=${skip}&limit=${pageSize}`);
    }
} 