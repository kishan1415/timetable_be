const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql/msnodesqlv8");
var cors = require("cors");

const app = express();

var dbConfig2 = {
  connectionTimeout: 30000,
  connectionString:
    "Driver={SQL Server Native Client 11.0};Server=G7\\SQLEXPRESS;Database=Course;Trusted_Connection=yes;",
  options: {},
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(cors("*"));

const port = 3001;

app.get("/", (req, res) => res.send("Hello World!"));

app.delete("/timetable/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Timetable set isActive = 0 where id=${id}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/timetable", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(`
                select	SBJ.code SubjectCode,
                    SBJ.subName SubName, 
                    TMTBL.tmDay [Day],
                    FORMAT(TMTBL.startDateTime, 'h:mm tt', 'en-US') + ' - '  + FORMAT(TMTBL.endDateTime, 'h:mm tt', 'en-US') DateOrTime,
                    TMTBL.startDateTime StartDateTime, 
                    TMTBL.endDateTime EndDateTime,
                    USR.userName TeacherName,
                    USR.initials Initials,
                    RMS.code RoomNumber,
                    SEC.code SectionCode,
                    TMTBL.id
                from	Timetable TMTBL inner join 
                    Subjects SBJ on 
                    TMTBL.subjectId = SBJ.id inner join 
                    Users USR on 
                    USR.id = TMTBL.createdBy inner join 
                    Rooms RMS on 
                    RMS.id = TMTBL.roomId inner join 
                    Section SEC on 
                    SEC.id = TMTBL.sectionId
                where	TMTBL.isActive = 1
        `);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/course", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select id as value, name as label from Course where isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/course/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Course set isActive=0 where id = ${id}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.post("/course-entry", async (req, res) => {
  const { name } = req.body;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `insert into Course(name, courseYear) values('${name}', getdate())`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/rooms", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select id as value, code as label from Rooms where isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/rooms-list", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(`select * from Rooms where isActive = 1`);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.post("/rooms-entry", async (req, res) => {
  const { code } = req.body;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(`insert into Rooms(code) values('${code}')`);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/rooms/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Rooms set isActive = 0 where id=${roomId}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/section", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select id as value, code as label from Section where isActive = 1 `
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/semester", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select S.id as value, S.num as label, S.semesterYear, S.courseId, C.name from Semester 
      S inner join Course C on C.id = S.courseId Where S.isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/semester-by-course/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select S.id as value, S.num as label, S.semesterYear, S.courseId, C.name from Semester 
      S inner join Course C on C.id = S.courseId Where S.isActive = 1 and S.courseId = ${id}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/semester/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Semester set isActive= 0 where id = ${id}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.post("/semester-entry", async (req, res) => {
  const { num, courseId } = req.body;

  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `insert into Semester(num, courseId, semesterYear) values(${num}, ${courseId}, GETDATE())`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/subjects", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select id as value, subName + ' - ' +  code as label from Subjects where isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/subject-list", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(`select * from Subjects Where isActive = 1`);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/subject/:subjectId", async (req, res) => {
  const subjectId = req.params.subjectId;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Subjects set isActive = 0 Where id = ${subjectId}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select  id as value, initials + ' - ' + userName as label from Users where isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/teacher-list", async (req, res) => {
  try {
    await sql.connect(dbConfig2);

    const result = await sql.query(
      `select U.*, UR.roleName from Users U inner join UserRole UR on U.roleId = UR.id Where UR.isActive = 1 and U.isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.get("/userroles", async (req, res) => {
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `select  id as value, roleName + ' - ' + shortName as label from UserRole where isActive = 1`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.post("/teacher-entry", async (req, res) => {
  const { initials, userName, roleId } = req.body;

  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `insert into Users(initials, userName, roleId) values('${initials}', '${userName}', ${roleId})`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/teacher/:teacherId", async (req, res) => {
  const teacherId = req.params.teacherId;
  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `update Users set isActive=0 where id = ${teacherId}`
    );

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

app.post("/timetable-entry", async (req, res) => {
  const {
    teacher,
    room,
    subjects,
    day,
    section,
    semester,
    course,
    startDateTime,
    endDateTime,
  } = req.body;

  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `insert into
        Timetable(tmDay, roomId, sectionId, createDateTime, createdBy, startDateTime, endDateTime, subjectId)
        values('${day}', ${room}, ${section}, GETDATE(), ${teacher}, '${startDateTime}', '${endDateTime}', ${subjects})`
    );

    return res.json(result.recordset);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "test", error: err });
  }
});

app.post("/subjects-entry", async (req, res) => {
  const { code, subName, subDesc } = req.body;

  try {
    await sql.connect(dbConfig2);
    const result = await sql.query(
      `insert into Subjects(code, subName, subDesc, createDate) values('${code}', '${subName}', '${subDesc}', GETDATE())`
    );

    return res.json(result.recordset);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "test", error: err });
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  );
});
