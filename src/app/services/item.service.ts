import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Item } from "../models/Item";

@Injectable()
export class ItemService {
    itemApiUrl = "http://localhost:8080/itens/"
    constructor(private http: HttpClient) {}

    getItens() : Observable<Item[]> {
        return this.http.get<Item[]>(this.itemApiUrl);
    }

    getItem(id: string) : Observable<Item> { // RETORNA UM ÚNICO ITEM COM O ID
        return this.http.get<Item>(this.itemApiUrl + id);
    }

    createItem(item: Item) : Observable<Item> {
        return this.http.post<Item>(this.itemApiUrl, item);
    }

    editItem(item: Item) : Observable<Item> {
        return this.http.patch<Item>(this.itemApiUrl + item.id, item)
        .pipe(catchError((err) => {
            alert(err.error.text);
            return throwError(err);
        }))
    }

    deleteItem(id: string): Observable<any> {
        const log = this.http.delete<any>(this.itemApiUrl + id);   
        return log
        .pipe(catchError((err) => {
            alert(err.error.text);
            return throwError(err);
        }))
    }

}