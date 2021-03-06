"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
// import expressBuyan from 'express-bunyan-logger'
const index_1 = __importDefault(require("./routes/index"));
const contact_1 = __importDefault(require("./routes/contact"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.use(morgan_1.default('dev'));
// app.use(require('express-bunyan-logger')());
// app.use(expressBuyan());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use('/', index_1.default);
app.use('/api', user_1.default);
// app.use('/api', authRouter);
app.use('/api', auth_1.default, contact_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map