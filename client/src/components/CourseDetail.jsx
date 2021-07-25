/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { CourseContext } from '../Context.js';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const CourseDetail = (props) => {
  const { id } = useParams();
  const { courses, actions } = useContext(CourseContext);

  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {
        if (response) {
          setCourse(response.data);
          setUser(response.data.userInfo);
        } else {
          history.push('/notfound');
        }
      })
      .catch((error) => console.log('Error fetching and parsing data', error));
  }, [id, history]);

  console.log(course);
  return (
    <main>
      <div className='actions--bar'>
        <div className='wrap'>
          <Link className='button' to='update-course.html'>
            Update Course
          </Link>
          <Link className='button' onClick={() => actions.deleteCourse} to='#'>
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
                {user.firstName} {user.lastName}
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
