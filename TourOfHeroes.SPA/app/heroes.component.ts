import { Component, OnInit  } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

// METADATA
@Component({
    selector: 'heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    providers: [HeroService] // creates a new instance
                             //of HeroService every time
                             //AppComponenet is created
})
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private router: Router) { }

    selectedHero: Hero;
    heroes: Hero[];

    onSelect(hero: Hero): void {
        this.selectedHero = hero; // Note the *this*
    }

    getHeroes(): void {
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    goToDetails(): void {
        let link = ['detail', this.selectedHero.id];
        this.router.navigate(link);
    }

    add(name: string): void {
        name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });  
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}