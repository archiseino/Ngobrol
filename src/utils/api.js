/*
 * File related to the API calls for the forum application.
 */

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetch(url, options) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  /*
   * Users Related API
   * Consist of Login, Register, Get Profile, and Get Users
   */

  async function registerUser({ name, email, password }) {
    const response = await _fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function loginUser({ email, password }) {
    const response = await _fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    // Save the access token to local storage
    putAccessToken(data.token);
  }

  async function getProfile() {
    const response = await _fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function getUsers() {
    const response = await _fetch(`${BASE_URL}/users`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.users;
  }

  /*
   * Threads Related API
   * Consist of Create Thread, Get Threads, and Get Thread Detail
   */

  async function createThread({ title, body, category }) {
    const response = await _fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  async function getThreads() {
    const response = await _fetch(`${BASE_URL}/threads`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.threads;
  }

  async function getThreadDetail(id) {
    const response = await _fetch(`${BASE_URL}/threads/${id}`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.detailThread;
  }

  /*
   * Comments, Upvote Related API
   * Consist of Create Comment, Upvote Thread, Downvote Thread, Neutralize Vote Thread
   */

  async function createComment({ id, content }) {
    const response = await _fetch(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.comment;
  }

  /**
   * The upvoteThread function is used to upvote a thread by its ID.
   * It sends a POST request to the API endpoint for upvoting a thread.
   * If the request is successful, it returns the status of the response.
   */

  async function upvoteThread(id) {
    const response = await _fetch(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  async function downvoteThread(id) {
    const response = await _fetch(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  async function neutralizeVoteThread(id) {
    const response = await _fetch(`${BASE_URL}/threads/${id}/neutral-vote`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  /**
   * The same things also goes for the comments upvote
   */

  async function upvoteComment({ threadId, commentId }) {
    const response = await _fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      }
    );

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  async function downvoteComment({ threadId, commentId }) {
    const response = await _fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      }
    );

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  async function neutralizeVoteComment({ threadId, commentId }) {
    const response = await _fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      }
    );

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return status;
  }

  /*
   * Leaderboards API
   */

  async function getLeaderboards() {
    const response = await _fetch(`${BASE_URL}/leaderboards`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    // Destructuring the response to get the error message
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    registerUser,
    loginUser,
    getProfile,
    getUsers,
    createThread,
    getThreads,
    getThreadDetail,
    createComment,
    upvoteThread,
    downvoteThread,
    neutralizeVoteThread,
    upvoteComment,
    downvoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
