// Variables
const express       = require('express');
const exphbs        = require('express-handlebars');
const bodyParser    = require("body-parser");

const titleStudents = 'Students list'
const titleForm     = 'Add students'
const students      = [];

// Config express & port
const port      = 4000;
const app       = express();
const router    = express.Router();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes & main application
router.get('/', (req, res) => {
    res.render('home', {
      titleStudents,
      students,
      titleForm
    });
});

// Form configuration
router.route('/students/add')
    .post((req, res) => {
        const username = req.body.username;
        students.push(req.body.username);
        res.render('form', {
          username
        })
        console.log('new user:', students);
    })
    .get((req,res) => {
        res.json({message: 'get request from signup'});
});

// add router in the Express app.
app.use("/", router);

// Run server on port :3000
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});