// console.log('hi');
const express = require('express');
const PORT = 3000;
const app = express();
let courses = require('./data');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, resp) => {
    return resp.render('index', { courses })
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

app.post('/save', (req, resp) => {
    const id = Number(req.body.id);
    const name = req.body.name;
    const course_type = req.body.course_type;
    const semester = req.body.semester;
    const department = req.body.department;

    const params = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "semester": semester,
        "department": department
    }
    courses.push(params);
    return resp.redirect('/')
});

app.post('/delete', (req, resp) => {
    const listCheckboxSelected = Object.keys(req.body);

    if (listCheckboxSelected.length <= 0) {
        return resp.redirect('/');
    }
    function onDeleteItem(length) {
        const maSanPhamCanXoa = Number(listCheckboxSelected[length]);

    courses= courses.filter(item => item.id !== maSanPhamCanXoa);
        if (length > 0) {
            console.log("Data deleted:: ", JSON.stringify(courses));
            onDeleteItem(length - 1);
        } else {
            return resp.redirect('/');
        }

    }
    onDeleteItem(listCheckboxSelected.length - 1);
});



