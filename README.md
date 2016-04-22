# redditclone
A clone of the wildly popular social message board Reddit. 
<br>
# Technology Stack:


| Technology    	| Use           	  | Description     										  |
| :------------------|:-------------------| :----------------										  |
| AngularJS     	| Frontend 			  |JavaScript web-app framework for dynamic views in web-apps. |
| Express   		| Backend 			  | Minimal, flexible web-app framework for Node.js.							  |
| Node.js 			| Server     |Event-driven I/O server-side JavaScript environment.				  |
| MongoDB			| Database			  |	Next-generation NoSQL / JSON database.            |
| Twitter Bootstrap | Styling			  |The most popular HTML, CSS, and JS framework for web projects.|
| Angular ui-router | Client-side routing |Solution to flexible routing with nested views in AngularJS.|
| Mongoose.js       | For adding structure to MongoDB |Writing MongoDB boilerplate is a drag. |

# Project Specifications

Create new posts

View all posts ordered by upvotes

Add comments about a given post

View comments for a given post

Upvote posts and comments

# Anatomy of 'redditclone' Node.js Project
## located in sub-folder `redditclone`
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

## The actions that users can perform are mapped to routes as follows:
`GET /posts` - return a list of posts and associated metadata

`POST /posts` - create a new post

`GET /posts/:id` - return an individual post with associated comments

`PUT /posts/:id/upvote` - upvote a post, notice we use the post ID in the URL

`POST /posts/:id/comments` - add a new comment to a post by ID

`PUT /posts/:id/comments/:id/upvote` - upvote a comment

# Instructions
Start the application by running `npm start` from within the `redditclone` folder.
Go to `http://localhost:3000` in a modern web browser to see the Angular application.
