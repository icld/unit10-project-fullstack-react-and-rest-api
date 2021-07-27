import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const CreateCourse = () => {
  const { data, actions, authenticatedUser, userPassword } =
    useContext(Context);
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState();
  const [materials, setMaterials] = useState('');
  const [userId] = useState(authenticatedUser[0].id);
  const [errors, setErrors] = useState([]);
  const [user] = useState(authenticatedUser[0].emailAddress);
  const [pass] = useState(userPassword);

  const submit = async () => {
    const course = { title, description, time, materials, userId };
    await data.createCourse(course, user, pass).then(history.push('/'));
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
        <div className='validation--errors'>
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
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
                value={time}
                onChange={change}
              />

              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                value={materials}
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
    </main>
  );
};

export default CreateCourse;
