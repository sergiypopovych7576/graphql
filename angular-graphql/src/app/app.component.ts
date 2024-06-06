import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-graphql';
  public episodes: any[] = [];
  public planets: any[] = [];

  constructor(private readonly apollo: Apollo) {
  }

  public ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
        query AllFilms {
          allFilms {
            films {
              id
              director
              created
              title
            }
          }
          allPlanets {
            planets {
              name
            }
          }
        }
      `,
      }).subscribe((result: any) => {
        this.episodes = result.data?.allFilms.films;
        this.planets = result.data?.allPlanets.planets;
      });
  }
}
