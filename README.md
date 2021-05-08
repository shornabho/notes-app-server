# Notes API 🗒️

The Notes API is a RESTful service and is primarily built to provide CRUD operations for a Note Taking application.

## Get started 🚀

This project api is made with Express.js which runs on the Node.js runtime.

You should download and install [Node.js and npm](https://nodejs.org/) (Recommended: v14.15.x or higher) on your system.

After installation, make sure both `node` and `npm` commands are added to your path. Running `node --version` and `npm --version` should return the appropriate versions of each of them.

To import the project and install the necessary dependencies, execute the following in your terminal:

```bash
git clone https://github.com/shornabho/notes-app-server
cd notes-app-server
npm install
```

Rename [.env.example](.env.example) to `.env`. In there, replace the value of `<PORT>` with a port number you want to run the server on, e.g. `5000`.

Next, configure and start a MongoDB instance, and paste the connection url in the `.env` file. The format of the connection url is already provided in [.env.example](.env.example).

Once all the dependencies are successfully installed, run `npm start` to start the development server. This server is run with [nodemon](https://www.npmjs.com/package/nodemon) and supports hot reloading, avoiding the need for manually restarting the server for every new change.

If everything goes fine, you should see the message:

```
> server@1.0.0 start
> nodemon index.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server running on port PORT

```

where, `PORT` is the port number specified in the `.env` file.

### Try it! 💻

Assuming that the server is running on `PORT` `5000` run this JavaScript snippet to test the API:

```js
fetch("http://localhost:5000/notes")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

Since the database is empty, it should return an empty json array.

## Features

- Get all the notes
- Get a specific note
- Create a new note
- Edit a specific note
- Delete a specific note
- Pin a note
- Unpin a note

## A Sample Note

```json
{
  "_id": "60942b9c85ce9279eb8b25bf",
  "title": "First Note",
  "body": "Body of Note 1",
  "attachments": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAc..."
  ],
  "tags": ["firstnote", "newexperiences"],
  "pinned": false,
  "createdAt": "2021-05-06T17:46:06.925Z",
  "lastModifiedAt": "2021-05-06T18:39:07.114Z"
}
```

## Available Methods

### Get all the notes

```http
GET /notes HTTP/1.1
```

#### Sample Request:

```js
fetch("http://localhost:5000/notes")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Create a new note

```http
POST /notes HTTP/1.1
```

The `POST` body should contain the fields as specified in the Note schema in the [models/Note.js](models/Note.js) file. The optional fields have a `default` attribute specified. The `id` of each document is auto-generated in MongoDB and returned after a successful insertion.

#### Sample Request:

```js
fetch("http://localhost:5000/notes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    title: "New note",
    body: "Body of new note",
    attachments: [],
    tags: ["newnote", "testingapi"],
    pinned: false,
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Get a specific note

```http
GET /notes/{note_object_id} HTTP/1.1
```

#### Sample Request:

```js
const noteId = "6096c4e05e0c13c39ba5f437";
fetch(`http://localhost:5000/notes/${noteId}`)
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Edit a specific note

```http
PATCH /notes/{note_object_id} HTTP/1.1
```

The `PATCH` body should contain one or more of the fields as specified in the Note schema in the [models/Note.js](models/Note.js) file. Only the fields to be edited can be sent with the request.

#### Sample Request:

```js
const id = "6096c4e05e0c13c39ba5f437";
fetch(`http://localhost:5000/notes/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    title: "New title of the note",
    body: "New body of new note",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Delete a specific note

```http
DELETE /notes/{note_object_id} HTTP/1.1
```

#### Sample Request:

```js
const noteId = "6096c4e05e0c13c39ba5f437";
fetch(`http://localhost:5000/notes/${noteId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Pin a specific note

```http
PATCH /notes/{note_object_id}/pin HTTP/1.1
```

#### Sample Request:

```js
const noteId = "6096c4e05e0c13c39ba5f437";
fetch(`http://localhost:5000/notes/${noteId}/pin`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Unpin a specific note

```http
PATCH /notes/{note_object_id}/unpin HTTP/1.1
```

#### Sample Request:

```js
const noteId = "6096c4e05e0c13c39ba5f437";
fetch(`http://localhost:5000/notes/${noteId}/unpin`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

---

Coded and maintained by [Swarnava Ghosh](https://www.linkedin.com/in/swarnava-ghosh/) 😄
