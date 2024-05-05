const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/**Custom Modules */
const databaseConnection = require('./database/conn');
const RegisterRouter = require('./routers/register');
const LoginRouter = require('./routers/login');
const BudgetsRouter = require('./routers/budgets');
const DashboardRouter = require('./routers/dashboard');
// const UserRouter = require('./routers/user');
// const NotificationRouter = require('./routers/notification');

/**Local Variables */
const PORT = process.env.PORT || 4000;

/**Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(upload.array());
// Use the express-fileupload middleware
// app.use(fileUpload());

/**Routers */
app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);
app.use('/budget', BudgetsRouter);
app.use('/dashboard', DashboardRouter);
// app.use('/user', UserRouter);
// app.use('/notification', NotificationRouter)

/**Requests */
app.get("/", (req, res) => {
    res.status(200).send("Server Running Successfully");
});


databaseConnection().then(() => {
    try {
        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    } catch (err) {
        console.error("Error : Could not connect to server");
    };
}).catch((err) => {
    console.error("Error : Invalid database connection");
});