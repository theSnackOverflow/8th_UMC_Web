export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export const dummyMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster_path:
      "https://image.tmdb.org/t/p/w500/p1LbrdJ53dGfEhRopG71akfzOVu.jpg",
    vote_average: 8.4,
  },
  {
    id: 2,
    title: "Furiosa: A Mad Max Saga",
    poster_path:
      "https://image.tmdb.org/t/p/w500/ehumsuIBbgAe1hg343oszCLrAfI.jpg",
    vote_average: 7.9,
  },
  {
    id: 3,
    title: "Inside Out 2",
    poster_path:
      "https://image.tmdb.org/t/p/w500/jFK2ZLQUzo9pea0jfMCHDfvWsx7.jpg",
    vote_average: 7.5,
  },
  {
    id: 4,
    title: "The Fall Guy",
    poster_path:
      "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    vote_average: 7.1,
  },
  {
    id: 5,
    title: "Godzilla x Kong: The New Empire",
    poster_path:
      "https://image.tmdb.org/t/p/w500/8uVKfOJUhmybNsVh089EqLHUYEG.jpg",
    vote_average: 7.0,
  },
  {
    id: 6,
    title: "Kung Fu Panda 4",
    poster_path:
      "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    vote_average: 6.8,
  },
  {
    id: 7,
    title: "Civil War",
    poster_path:
      "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMzO0JpV.jpg",
    vote_average: 7.3,
  },
  {
    id: 8,
    title: "Kingdom of the Planet of the Apes",
    poster_path:
      "https://image.tmdb.org/t/p/w500/54b3vKj9U3BBak4a3cUFeL5nCkC.jpg",
    vote_average: 7.5,
  },
  {
    id: 9,
    title: "Challengers",
    poster_path:
      "https://image.tmdb.org/t/p/w500/A4LwtW4S2v1qX3W12yt3N4ZfB4Q.jpg",
    vote_average: 7.6,
  },
  {
    id: 10,
    title: "The Garfield Movie",
    poster_path:
      "https://image.tmdb.org/t/p/w500/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
    vote_average: 6.9,
  },
];
