/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context/Context';
import ReactMarkdown from 'react-markdown';

const CourseDetail = (props) => {
  const { data, authenticatedUser, actions, userPassword } =
    useContext(Context);

  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState();

  const history = useHistory();

  // establishes authorized user
  useEffect(() => {
    if (authenticatedUser) {
      setIsSignedIn(true);
      setUserId(authenticatedUser[0].id);
    }

    //gets course detail
    data
      .getCourse(id)
      .then((res) => {
        if (res) {
          setCourse(res);
          setUser(res.userInfo);
        } else {
          history.push('/notfound');
        }
      })
      .catch(() => history.push('/error'));
  }, [data, id, history, authenticatedUser, isSignedIn, userId, user.id]);

  //handle course deletion.
  const deleteCourse = () => {
    data
      .deleteCourse(id, authenticatedUser[0].emailAddress, userPassword)
      .then(() => {
        history.push('/');
        console.log('course has been deleted');
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  return (
    <main>
      <div className='actions--bar'>
        <div className='wrap'>
          {/* if user is the owner of course, render buttons for deletion and  updating.  else don't render these  */}
          {isSignedIn && userId === user.id ? (
            <>
              <Link className='button' to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <Link
                className='button'
                onClick={(e) => {
                  e.preventDefault();
                  deleteCourse();
                }}
                to='/'
              >
                Delete Course
              </Link>
            </>
          ) : null}
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
              <p style={{ textTransform: 'capitalize' }}>
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
