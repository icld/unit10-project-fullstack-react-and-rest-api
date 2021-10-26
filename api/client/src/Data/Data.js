//API url
import config from './config';

export default class Data {
  //API call
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    //convert  body to json string
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //encodes credentials
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // get a user from api
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
      // return null;
    } else if (response.status === 401) {
      // return response.json().then((res) => res);
      return null;
    } else {
      throw new Error();
    }
  }

  //post a user via api
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      console.log(response);
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // GET all courses from api
  async getCourses() {
    const res = await this.api('/courses', 'Get');
    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 400) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET a single course from api
  async getCourse(id) {
    const res = await this.api(`/courses/${id}`, 'Get');

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 400) {
      return res.json().then((data) => {
        return null;
      });
    } else {
      throw new Error();
    }
  }

  // POST a course, requires authentication
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, {
      username,
      password,
    });
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      return response.json((res) => {
        return res.errors;
      });
    } else {
      throw new Error();
    }
  }

  //PUT a course, requires authentication
  async updateCourse(id, data, username, password) {
    const response = await this.api(`/courses/${id}`, `PUT`, data, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return response.status;
    } else if (response.status === 400) {
      return response.json((res) => {
        return res.errors;
      });
    } else {
      throw new Error();
    }
  }

  //DELETE a course, requires auth
  async deleteCourse(id, username, password) {
    const res = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      username,
      password,
    });

    if (res.status === 204) {
      // return res.json().then((data) => data);
      return null;
    } else if (res.status === 403) {
      return null;
    } else {
      throw new Error();
    }
  }
}
