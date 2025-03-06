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

    getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.API_URL}/players`);
    }
} 