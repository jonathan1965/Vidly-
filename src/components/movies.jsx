import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup'
import Like from './common/like';
import { getGenres } from '../services/fakeGenreService';
import {pagination} from '../utils/paginate'


class Movies extends React.Component {
    state = {
        movies: [],
        currentPage:1,
        genre:  [],
        pageSize: 4
    }

    componentDidMount() {
          this.setState({movies: getMovies(), genres: getGenres()})
    }

    handleDelete = movie => {
         const movies =  this.state.movies.filter(m => m._id !== movie._id)
         this.setState({movies})
    }

    handleLike = movie => {
       const movies = [...this.state.movies];
       const index = movies.indexOf(movie);
       movies[index] = {...movies[index]};
       movies[index].liked = !movies[index].liked;
       this.setState({movies}); 

    }

    handlePageChange = page => {
        this.setState({currentPage:page})
    }

   handleGenreSelect = genre => {
       this.setState({selectedGenre: genre})
   }

    render() { 
        const {length:count} = this.state.movies
        const {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;


        if (count === 0)
         return <p>There are no movies in the database.</p>

         const filtered = selectedGenre ? allMovies.filter(m =>m.genre._is === selectedGenre._id) : allMovies;
         const movies = pagination(filtered,currentPage, pageSize);
         
        return (
            <div className='row'>
              <div className='col-3 pt-3'>
                  <ListGroup 
                  items={this.state.genres}
                  selectedItem={this.state.selectedGenre}
                  onItemSelect={this.handleGenreSelect}/>
              </div>
              <div className='col pt-3'>
              <p>showing {filtered.length} movies in the database</p> 

         <table className='table'>
             <thead>
                 <tr>
                     <th>Title</th>
                     <th>Genre</th>
                     <th>Stock</th>
                     <th>Rate</th>
                     <th></th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
              {movies.map(movie => ( 
              <tr key={movie._id }>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/>
                    <td><button onClick={() => this.handleDelete (movie)} className='btn btn-danger btn-sm'>Delete</button></td>
                    

                 </tr>
                 ))}
               
             </tbody>
         </table>
         <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
          />
              </div>
         </div>
        )
    }
}
 
export default Movies;
