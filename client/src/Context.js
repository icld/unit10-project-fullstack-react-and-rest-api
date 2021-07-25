/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CourseContext = React.createContext();

export const Provider = (props) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({});

  const getCourses = () => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.log('Error fetching and parsing data', error));
  };

  // const getCourse = (courseId) => {
  //   axios
  //     .get(`http://localhost:5000/api/courses/${courseId}`)
  //     .then((response) => setCurrentCourse(response.data))
  //     .catch((error) => console.log('Error fetching and parsing data', error));
  // };

  const deleteCourse = (courseId) => {
    axios
      .delete(`http://localhost:5000/api/courses/${courseId}`)
      .then(() => console.log('deleted'));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        actions: {
          // getCourse: getCourse,
          getCourses: getCourses,
          deleteCourse: deleteCourse,
        },
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};
