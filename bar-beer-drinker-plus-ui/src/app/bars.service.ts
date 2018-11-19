import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  license: string;
  city: string;
  phone: string;
  addr: string;
}

export interface BarMenuItem {
  name: string;
  type: string;
  manf: string;
  price: number;
  likes: number;
}

export interface Spender{
  Customer: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }

  getTopBrandsPerDay(day : string, bar : string) {
    return this.http.get<any[]>('/api/top-beers-bar/' + bar + '/' + day);
  }

  getTopSpendersPerBar(bar : string) {
    return this.http.get<any[]>(`api/top-spenders/${bar}`);
  }

  getInventorySold(bar : string) {
    return this.http.get<any[]>(`/api/inventory-distribution/${bar}`);
  }

  getDistributionTime(bar : string, day : string) {
    return this.http.get<any[]>('/api/busiest-hours/' + bar + '/' + day);
  }

  getDistributionDay(bar : string) {
    return this.http.get<any[]>('/api/busiest-days/' + bar);
  }

  getBeerManufacturers(beer?: string): any {
    if (beer) {
      return this.http.get<string>(`/api/beer-manufacturer/${beer}`);
    }
    return this.http.get<string[]>('/api/beer-manufacturer');
  }

  getTopBarsPerBrand(manf : string) {
    return this.http.get<any[]>('/api/top-bars-manf/' + manf);
  }
  

 

}