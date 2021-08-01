import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context/Context';

const UpdateCourse = () => {
  const { data, authenticatedUser, actions, userPassword } =
    useContext(Context);
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [authUser, setAuthUser] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId] = useState(authenticatedUser[0].id);
  const [validationErrors, setErrors] = useState([]);

  const [estimatedTime, setTime] = useState('');
  const [materialsNeeded, setMaterials] = useState('');
  const [user] = useState(authenticatedUser[0].emailAddress);
  const [pass] = useState(userPassword);

  const history = useHistory();

  // returns individual course if available
  useEffect(() => {
    async function fetchData() {
      await data
        .getCourse(id)
        .then((res) => {
          if (res) {
            if (res.userId === userId) {
              // console.log(res);
              setCourse(res);
              setAuthUser(res.userInfo);
              setTitle(res.title);
              setDescription(res.description);
              setTime(res.estimatedTime);
              setMaterials(res.materialsNeeded);
            } else {
              history.push('/forbidden');
            }
          } else {
            history.push('/notfound');
          }
        })
        .catch(() => history.push('/error'));
    }
    fetchData();
  }, [data, id, history, authUser.id, userId]);

  // handles updating of individual course if user is authorized, and pushes to the updated course page
  const submit = () => {
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    data
      .updateCourse(id, course, user, pass)
      .then((response) => {
        if (response.errors) {
          setErrors(response.errors);
          console.log(response.errors);
        } else {
          history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  //handles form field changes and state updating
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case 'courseTitle':
        setTitle(value);
        break;
      case 'courseDescription':
        setDescription(value);
        break;
      case 'materialsNeeded':
        setMaterials(value);
        break;
      case 'estimatedTime':
        setTime(value);
        break;
      default:
        return;
    }
  };

  return (
    <main>
      <div className='wrap'>
        <h2>Update Course</h2>
        {validationErrors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {validationErrors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className='main--flex'>
            <div>
              <label htmlFor='courseTitle'>Course Title</label>
              <input
                id='courseTitle'
                name='courseTitle'
                type='text'
                value={title}
                onChange={change}
              />

              <p style={{ textTransform: 'capitalize' }}>
                By {authUser.firstName} {authUser.lastName}
              </p>

              <label htmlFor='courseDescription'>Course Description</label>
              <textarea
                id='courseDescription'
                name='courseDescription'
                value={description}
                onChange={change}
              ></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                value={estimatedTime}
                onChange={change}
              />

              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                value={materialsNeeded}
                onChange={change}
              ></textarea>
            </div>
          </div>
          <button className='button' type='submit'>
            Update Course
          </button>
          <button
            className='button button-secondary'
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
