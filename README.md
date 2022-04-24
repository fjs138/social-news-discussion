# redditclone
reddit-like website powered by the MEAN stack
<br>

## The Goal
Attempt to reproduct reddit-like functionality, using the MEAN stack. 
## Technology Stack


| Technology    	| Use           	  | Description     										  |
| :------------------|:-------------------| :----------------										  |
| AngularJS     	| Frontend 			  |JavaScript web-app framework for dynamic views in web-apps. |
| Angular ui-router | Client-side routing |Solution to flexible routing with nested views in AngularJS.|
| Bootstrap | Styling			  |The most popular HTML, CSS, and JS framework for web projects.|
| Node.js 			| Server     |Event-driven I/O server-side JavaScript environment.				  |
| Express   		| Backend 			  | Minimal, flexible web-app framework for Node.js.							  |
|EJS|alternative template engine|Embedded JavaScript templates|
|Passport|authentication middleware|Passport is Express-compatible authentication middleware for Node.js.|
| MongoDB			| Database			  |	Next-generation NoSQL / JSON database.            |
| Mongoose.js       | For adding structure to MongoDB |Writing MongoDB boilerplate is a drag. |
|jsonwebtoken|data exchange|An implementation of JSON Web Tokens.|
|Morgan | logging|HTTP request logger middleware for node.js|

## Project Specifications

* Create new posts

* View all posts ordered by upvotes

* Add comments about a given post

* View comments for a given post

* Upvote posts and comments

## Anatomy of Project
### located in sub-folder `redditclone`
`app.js` - The launching point of the app. Imports all server files
including modules, configure routes, open database connections, etc.

`bin/` - Contains executable scripts, notably the `www` script, which
includes `app.js` and when executed launches our Node.js server

`node_modules/` - Contains of all external modules used in the project.
The command `npm install` populates this.

`package.json` - Defines a JSON object that contains various properties
of our project, including names and version numbers.
Defines what modules our project depends on. See the link for details:
https://www.npmjs.org/doc/package.json.html

`public/` - Anything in this folder will be made publicly available by
the server. Contains JavaScript, CSS, images, and templates that
the client(s) are intended to access.

`routes/` - Contains the Node.js controllers. This is where most of the
backend code will be stored.

`views/` - Contains the various views. Due to specifying the `--ejs` flag
when generating the project, views will have the extension '.ejs' rather
than '.jade'. This means the views will be in HTML instead of Jade.

Note: Views are capable of being rendered <i>directly</i> by Node.js
by the use of the `render()` function and can contain logic that allows
the server to dynamically change the content. This functionality will
not be used in this project however. This is because the Angular.js
framework is being used to create the dynamic experience instead.

### The actions that users can perform are mapped to routes as follows:
`GET /posts` - return a list of posts and associated metadata

`POST /posts` - create a new post

`GET /posts/:id` - return an individual post with associated comments

`PUT /posts/:id/upvote` - upvote a post, notice we use the post ID in the URL

`POST /posts/:id/comments` - add a new comment to a post by ID

`PUT /posts/:id/comments/:id/upvote` - upvote a comment

### Instructions
Start the application by running `npm start` from within the `redditclone` folder.
Go to `http://localhost:3000` in a modern web browser to see the Angular application.
<br><br>

## License

MIT License

Copyright (c) 2015 Frank Santaguida

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
