/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { CourseContext } from '../Context.js';
import ReactMarkdown from 'react-markdown';

const CourseDetail = (props) => {
  let { id } = useParams();
  let { courses } = useContext(CourseContext);
  // let [course, setCourse] = useState();

  let course = courses[id - 1];
  console.log(course);

  return (
    <main>
      <div className='actions--bar'>
        <div className='wrap'>
          <Link className='button' to='update-course.html'>
            Update Course
          </Link>
          <Link className='button' to='#'>
            Delete Course
          </Link>
          <Link className='button button-secondary' to='/'>
            Return to List
          </Link>
        </div>
      </div>

      <div className='wrap'>
        <h2>Course Detail</h2>

        <form>
          <div className='main--flex'>
            <div>
              <h3 className='course--detail--title'>Course</h3>
              <h4 className='course--name'>{course.title}</h4>
              <p>
                By{' '}
                {`${course.userInformation.firstName} ${course.userInformation.lastName} `}
              </p>

              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              {course.estimatedTime ? (
                <>
                  <h3 className='course--detail--title'>Estimated Time</h3>
                  <p>{course.estimatedTime}</p>{' '}
                </>
              ) : null}

              {course.materialsNeeded ? (
                <>
                  <h3 className='course--detail--title'>Materials Needed</h3>

                  <ReactMarkdown className='course--detail--list'>
                    {course.materialsNeeded}
                  </ReactMarkdown>
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
