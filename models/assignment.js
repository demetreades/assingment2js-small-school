const Entity = require('./entity').Entity;

const validation = require('./utilities/validation');

const _title          = new WeakMap();
const _description    = new WeakMap();
const _subDateTime    = new WeakMap();
const _oralMark       = new WeakMap();
const _assignmentMark = new WeakMap();
const _totalMarks     = new WeakMap();

class Assignment extends Entity {
  constructor(id, title, description, subDateTime, oralMark, assignmentMark) {
    super(id);
    this.title          = title;
    this.description    = description;
    this.subDateTime    = this.dateUtil.dateTime(new Date(subDateTime));
    this.oralMark       = oralMark;
    this.assignmentMark = assignmentMark;
    this.totalMarks     = this.marksCalc(oralMark, assignmentMark);
  }

  marksCalc = (oral, assignment) => {
    const totalMarks = ((oral * 40) + (assignment * 60)) / (40 + 60);
    return totalMarks;
  }
  
  get title() {
    return _title.get(this);
  }
  
  set title(value) {
    validation.rangeChecker(value.length, 2, 25, `assignment's title`);
    _title.set(this,value);
  }

  get description() {
    return _description.get(this);
  }

  set description(value) {
    if(this.description !== undefined) {
      validation.rangeChecker(value, 2, 100, `assignment's description`);
    }
    _description.set(this,value);
  }

  get subDateTime() {
    return _subDateTime.get(this);
  }

  set subDateTime(value) {
    validation.rangeChecker(value, null, this.dateUtil.today, 'subject submittion date');
    _subDateTime.set(this,value);
  }

  get oralMark() {
    return _oralMark.get(this);
  }

  set oralMark(value) {
    if(value !== undefined) { 
      validation.numTypeChecker(value, `assignment's oral mark`);
      validation.rangeChecker(value, 0, 100, `assignment's oral mark`);
    }
    _oralMark.set(this,value);
  }
  
  get assignmentMark() {
    return _assignmentMark.get(this);
  }
  
  set assignmentMark(value) {
    if(value !== undefined) { 
      validation.numTypeChecker(value, `assignment's project mark`);
      validation.rangeChecker(value, 0, 100, `assignment's project mark`);
    }
    _assignmentMark.set(this,value);
  }
  
  get totalMarks() {
    return _totalMarks.get(this);
  }
  
  set totalMarks(value) {
    if(value !== undefined) { 
      validation.numTypeChecker(value, `assignment's total mark`);
      validation.rangeChecker(value, 0, 100, `assignment's total mark`);
    }
    _totalMarks.set(this,value);
  }

  toConsoleString = () => {
    return (
      `Assignment #${this.id} ${this.title}    -    details:
      
      ------------------------
      Title:            ${this.title}
      Description:      ${this.description} 
      Submittion date:  ${this.subDateTime}
      
      Marks ~~~~~~~~~~~~~~~~~~
      
      Oral mark            ${this.oralMark} 
      Assignment's mark    ${this.assignmentMark}
      ------------------------
      Total marks          ${this.totalMarks}`
    );
  }
};

// console.log('\n\n----------------------------------');
// console.log('----------------------------------');
// const HTML1 = new Assignment(24, "HTML Assignment", "Please add description", '6/18/2021 23:59:20', 100, 80);
// console.log('\n', HTML1, '\n\nHTML1-clg------------------------');
// console.log('\n', HTML1.toConsoleString(), '\n\nHTML1-toString( )----------------\n\n');


module.exports = { Assignment };
