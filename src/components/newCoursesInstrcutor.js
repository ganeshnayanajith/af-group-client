import React, { Component } from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/* in here, we declare new const variable and assign a function with parameter called props. 
but this is not a javascript function. this is like react component.
so, we can called this react functional component. 
this is a combination of function and component.
when we called this, it render this component. */

const Course = props => (
    <tr>
        {/* <td>{props.id}</td> */}
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td><input type="button" value="Accept" className="btn btn-primary" onClick={props.onClick} id={props.id} /></td>
        {/* <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td>
        <td>
            <Link to={"/books/" + props._id}>Book</Link>
        </td> */}
    </tr>
);



export default class NewCoursesInstructor extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            courses: []
        };


    }





    //this methed invoked after rendering home component and it send a get request to api and api send response with all trains
    componentDidMount() {
        document.title = "New Courses";
        console.log(sessionStorage.getItem('UserID'));
        axios.get('http://localhost:4000/node/course/instructor/new/' + sessionStorage.getItem('UserID'))
            .then(response => {
                console.log(response);
                this.setState({ courses: response.data.courses });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick(e) {

        console.log('click');
        console.log(sessionStorage.getItem('UserID'));
        console.log(e.target.id);
        console.log('http://localhost:4000/node/course/instructor/accept/' + e.target.id + '/' + sessionStorage.getItem('UserID'));

        console.log(this.state.courses);

        var course = '';


        this.state.courses.forEach(element => {

            if (element._id === e.target.id) {
                console.log('ifone');
                console.log(element._id);
                console.log(e.target.id);

                element.instructors.forEach(element2 => {

                    if (element2.instructor === sessionStorage.getItem('UserID')) {
                        console.log('iftwo');
                        console.log(element2.instructor);
                        console.log(sessionStorage.getItem('UserID'));


                        element2.status = 'accepted';
                        course = element;
                        console.log(this.state.courses);
                        console.log(element);
                    }
                });
            }



        });


        axios.post('http://localhost:4000/node/course/instructor/accept/' + e.target.id + '/' + sessionStorage.getItem('UserID'), course)
            .then(response => {
                console.log(response);
                //this.setState({ courses: response.data.courses });
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();



    }



    render() {
        return (




            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                               
                                
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4 text-primary">New Course List</h1>
                                            </div>
                                            <table className="table table-striped" style={{ marginTop: 20 }}>
                                                <thead>
                                                    <tr>
                                                        {/* <th>ID</th> */}
                                                        <th>Code</th>
                                                        <th>Name</th>
                                                        <th>Actions</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {
                                                        this.state.courses.map((currentCourse, i) => (
                                                            <Course onClick={this.onClick} id={currentCourse._id} key={i} code={currentCourse.code} name={currentCourse.name} />
                                                        ))
                                                    }


                                                </tbody>
                                            </table>
                                            <hr />
                                            
                                        </div>
                                    </div>
                               
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        )
    }
}