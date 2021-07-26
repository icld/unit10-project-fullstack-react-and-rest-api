import config from './config';

export default class Data {
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

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

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

  async getCourse(id) {
    const res = await this.api(`/courses/${id}`, 'Get');

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 400) {
      return null;
    } else {
      throw new Error();
    }
  }

  // updateCourse() {}

  async deleteCourse(id, username, password) {
    const res = await this.api(`/courses/${id}`, 'Delete', null, true, {
      username,
      password,
    });

    if (res.status === 204) {
      return res.json().then((data) => data);
    } else if (res.status === 403) {
      return null;
    } else {
      throw new Error();
    }
  }
}
