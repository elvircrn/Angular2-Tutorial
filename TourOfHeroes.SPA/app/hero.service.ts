import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero }          from './hero';

@Injectable()
export class HeroService {
    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'aplication/json'});

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
                   .put(url, JSON.stringify(hero), { headers: this.headers })
                   .toPromise()
                   .then(() => hero)
                   .catch(this.handleError);
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                        .toPromise()
                        .then(respose => respose.json().data as Hero[])
                        .catch(this.handleError);
    }

    private heroesUrl = 'app/heroes'; //URL to web api

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve => 
            setTimeout(resolve, 2000))
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then (heroes => heroes.find(hero => hero.id === id));
    }

    // NOTE: Postman
    create(name: string): Promise<Hero> {
        return this.http
                   .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json().data)
                   .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.heroesUrl}/${id}`;
        return this.http
                    .delete(url, { headers: this.headers }) // headers is not needed for delete
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
    }
}