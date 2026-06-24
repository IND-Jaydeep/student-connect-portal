// Timetable data — static arrays from original timeTable.js

export const Sunday = [];

export const Monday = [
  { time: '9:00 - 10:00', roomNumber: '101', subject: 'Engineering Graphics', type: 'Lecture' },
  { time: '10:00 - 11:00', roomNumber: '102', subject: 'Mathematical Engineering', type: 'Lecture' },
  { time: '11:00 - 12:00', roomNumber: '103', subject: 'Computer Architecture', type: 'Lecture' },
  { time: '12:00 - 1:00', roomNumber: '-', subject: 'Lunch Break', type: '' },
  { time: '1:00 - 2:00', roomNumber: 'Lab 1', subject: 'Database Management', type: 'Lab' },
  { time: '2:00 - 3:00', roomNumber: 'Lab 1', subject: 'Database Management', type: 'Lab' },
];

export const Tuesday = [
  { time: '9:00 - 10:00', roomNumber: '104', subject: 'Network Security', type: 'Lecture' },
  { time: '10:00 - 11:00', roomNumber: '101', subject: 'Engineering Graphics', type: 'Lecture' },
  { time: '11:00 - 12:00', roomNumber: 'Lab 2', subject: 'Computer Architecture', type: 'Lab' },
  { time: '12:00 - 1:00', roomNumber: '-', subject: 'Lunch Break', type: '' },
  { time: '1:00 - 2:00', roomNumber: '102', subject: 'Mathematical Engineering', type: 'Lecture' },
  { time: '2:00 - 3:00', roomNumber: '105', subject: 'Database Management', type: 'Lecture' },
];

export const Wednesday = [
  { time: '9:00 - 10:00', roomNumber: '102', subject: 'Mathematical Engineering', type: 'Lecture' },
  { time: '10:00 - 11:00', roomNumber: '103', subject: 'Computer Architecture', type: 'Lecture' },
  { time: '11:00 - 12:00', roomNumber: '101', subject: 'Engineering Graphics', type: 'Lecture' },
  { time: '12:00 - 1:00', roomNumber: '-', subject: 'Lunch Break', type: '' },
  { time: '1:00 - 2:00', roomNumber: '104', subject: 'Network Security', type: 'Lecture' },
  { time: '2:00 - 3:00', roomNumber: 'Lab 3', subject: 'Network Security', type: 'Lab' },
];

export const Thursday = [
  { time: '9:00 - 10:00', roomNumber: '105', subject: 'Database Management', type: 'Lecture' },
  { time: '10:00 - 11:00', roomNumber: '104', subject: 'Network Security', type: 'Lecture' },
  { time: '11:00 - 12:00', roomNumber: '102', subject: 'Mathematical Engineering', type: 'Lecture' },
  { time: '12:00 - 1:00', roomNumber: '-', subject: 'Lunch Break', type: '' },
  { time: '1:00 - 2:00', roomNumber: 'Lab 2', subject: 'Engineering Graphics', type: 'Lab' },
  { time: '2:00 - 3:00', roomNumber: 'Lab 2', subject: 'Engineering Graphics', type: 'Lab' },
];

export const Friday = [
  { time: '9:00 - 10:00', roomNumber: '103', subject: 'Computer Architecture', type: 'Lecture' },
  { time: '10:00 - 11:00', roomNumber: '105', subject: 'Database Management', type: 'Lecture' },
  { time: '11:00 - 12:00', roomNumber: '104', subject: 'Network Security', type: 'Lecture' },
  { time: '12:00 - 1:00', roomNumber: '-', subject: 'Lunch Break', type: '' },
  { time: '1:00 - 2:00', roomNumber: '102', subject: 'Mathematical Engineering', type: 'Tutorial' },
  { time: '2:00 - 3:00', roomNumber: '101', subject: 'Engineering Graphics', type: 'Tutorial' },
];

export const Saturday = [];

export const ALL_DAYS = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
