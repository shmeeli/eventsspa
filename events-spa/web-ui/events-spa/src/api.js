import store from './store';


//code based on Nat Tuck's lectures

export async function api_get(path) {
    let text = await fetch("http://localhost:4000/api/v1" + path, {});
    let resp = await text.json();
    return resp.data;
}

export function fetch_users() {
    api_get("/users").then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function delete_comment(id) {
  return api_delete("/comments/",id);
}

async function api_delete(path, id) {

  let text = await fetch(
    "http://localhost:4000/api/v1" + path + id, {method: 'DELETE'}).then((resp) => {
      fetch_comments();
      console.log(resp);
    });
  return await text.json();
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

export function fetch_events() {
  api_get("/events").then((data) => store.dispatch({
    type: 'events/set',
    data: data,
  }));
}

export function fetch_comments() {
  api_get("/comments").then((data) => store.dispatch({
    type: 'comments/set',
    data: data,
  }));
}

export function api_login(name, password) {
  api_post("/session", {name, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function create_user(user) {
  console.log(user);
  return api_post("/users", {user});
}

export function create_comment(comment) {
  console.log(comment);
  let state = store.getState();
  let token = state.session.token;
  //console.log(state.session)
  let url = window.location.href;
  let id = url.substring(url.lastIndexOf('/') + 1);
  let data = new FormData();
  data.append("comment[body]", comment.body);
  data.append("comment[user_id]", state.session.user_id);
  data.append("comment[event_id]", id)
  console.log(data);
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
  };
  fetch(
    "http://localhost:4000/api/v1/comments", opts).then((resp) => {
      fetch_comments();
      console.log(resp);
    });
}

export function create_event(event) {
  //let state = store.getState();
  //event["user_id"] = state.session.user_id;
  //return api_post("/events", {event});

  console.log(event);
  let state = store.getState();
  let token = state.session.token;
  //console.log(state.session)

  let data = new FormData();
  data.append("event[body]", event.body);
  data.append("event[title]", event.title);
  data.append("event[date]", event.date);
  data.append("event[user_id]", state.session.user_id);
  console.log(data);
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
  };
  fetch(
    "http://localhost:4000/api/v1/events", opts).then((resp) => {
      fetch_events();
      console.log(resp);
    });
}

export function load_defaults() {
    fetch_users();
    fetch_events();
    fetch_comments();
}
