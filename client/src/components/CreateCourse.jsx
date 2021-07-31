import { set } from 'js-cookie';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import Modal from './Modal';

const CreateCourse = () => {
  const { data, actions, authenticatedUser, userPassword } =
    useContext(Context);
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setTime] = useState();
  const [materialsNeeded, setMaterials] = useState('');
  const [userId] = useState(authenticatedUser[0].id);
  const [errors, setErrors] = useState([]);
  const [user] = useState(authenticatedUser[0].emailAddress);
  const [pass] = useState(userPassword);
  const [validationErrors, setValidationErrors] = useState([]);
  const [newCourseId, setNewCourseId] = useState();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  let newId;

  const submit = () => {
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    let newId;

    data
      .createCourse(course, user, pass)
      .then((response) => {
        if (response) {
          setValidationErrors(response.errors);

          console.log(response);
        } else {
          data.getCourses().then((courses) => {
            newId = courses.slice(-1)[0].id;
            console.log(newId);
            setNewCourseId(newId);
            toggleModal();
          });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

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
        <h2>Create Course</h2>
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

              <p>
                {`by ${authenticatedUser[0].firstName} ${authenticatedUser[0].lastName}`}{' '}
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
            Create Course
          </button>
          <button
            className='button button-secondary'
            onClick={() => history.push('/')}
          >
            Cancel
          </button>
        </form>
      </div>
      {showModal ? (
        <Modal>
          <h1>Congratulations on creating your New Course!</h1>
          <button onClick={() => history.push(`/courses/${newCourseId}`)}>
            Check it out
          </button>
        </Modal>
      ) : null}
    </main>
  );
};

export default CreateCourse;
