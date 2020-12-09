import React, {Component} from "react";
import SavedBooks from "../components/saved/saved"
import API from "../utils/google-books"
import Axios from "axios";
import { promises } from "fs";

class Saved extends Component{
    state = {
        result: [],
        test: ""
    }

    loadBooks(){
        API.getBooks()
        .then(res=>{
            console.log(res)
            this.setState({result: res.data})})
        .catch(err => console.log(err))

    }

    deleteBook = (e) =>{
        let bookid = e.target.getAttribute("data-bookid")
        Promise.all([API.deleteBook(bookid)]).then(this.loadBooks())

        .catch(err =>console.log(err))
    }

    componentDidMount(){
        this.loadBooks()
    }

     render(){
        return (
            <div>
                {this.state.result.map(item => (
                    <SavedBooks
                    key={item._id}
                    bookid={item._id}
                    title={item.title}
                    author={item.author}
                    description={item.description}
                    image={item.image}
                    link={item.link}
                    deleteBook={this.deleteBook}
                    />
                ))}
            </div>
        )
    }

}

export default Saved;