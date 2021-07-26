/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Context } from '../Context/Context';

const Courses = () => {
  const { data, actions, authenticatedUser } = useContext(Context);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    data.getCourses().then((res) => setCourses(res));
  }, [data]);
  return (
    <main>
      <div className='wrap main--grid'>
        {courses.map((course) => (
          <Link
            className='course--module course--link'
            to={`/courses/${course.id}`}
            key={course.id}
          >
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        ))}

        <Link
          className='course--module course--add--module'
          to='create-course.html'
        >
          <span className='course--add--title'>
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 13 13'
              className='add'
            >
              <polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
