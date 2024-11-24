const data = [
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Mon",
    DateOrTime: "10:00 AM - 11:00 AM",
    StartDateTime: "2024-06-16T10:00:20.170Z",
    EndDateTime: "2024-06-16T11:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Tue",
    DateOrTime: "10:00 AM - 11:00 AM",
    StartDateTime: "2024-06-16T10:00:20.170Z",
    EndDateTime: "2024-06-16T11:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Wed",
    DateOrTime: "10:00 AM - 11:00 AM",
    StartDateTime: "2024-06-16T10:00:20.170Z",
    EndDateTime: "2024-06-16T11:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Mon",
    DateOrTime: "11:00 AM - 12:00 PM",
    StartDateTime: "2024-06-16T11:00:20.170Z",
    EndDateTime: "2024-06-16T12:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Tue",
    DateOrTime: "11:00 AM - 12:00 PM",
    StartDateTime: "2024-06-16T11:00:20.170Z",
    EndDateTime: "2024-06-16T12:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
  {
    SubjectCode: "KCA-043",
    SubName: "IOT",
    Day: "Wed",
    DateOrTime: "11:00 AM - 12:00 PM",
    StartDateTime: "2024-06-16T11:00:20.170Z",
    EndDateTime: "2024-06-16T12:00:20.170Z",
    TeacherName: "Neeraj Kaushik",
    Initials: "NEK",
    RoomNumber: "A210",
    SectionCode: "A",
  },
];

const uniqueTimeRange = Array.from(new Set(data.map((x) => x.DateOrTime)));
const uniqueDays = Array.from(new Set(data.map((x) => x.Day)));
console.log(uniqueTimeRange);
console.log(uniqueDays);

const finalData = uniqueDays.map((day) => {
  const dt = uniqueTimeRange.reduce((prev, time) => {
    const dayRow = data.find((x) => x.DateOrTime === time && x.Day === day);
    return {
      ...prev,
      Day: day,
      [time]: dayRow,
    };
  }, []);
  return dt;
});

console.log(finalData.length);
