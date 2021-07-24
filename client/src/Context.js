/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CourseContext = React.createContext();

export const Provider = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.log('Error fetching and parsing data', error));
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};
