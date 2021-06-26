const _id = new WeakMap();
const _student_first = new WeakMap();
const _student_last = new WeakMap();
const _hobby = new WeakMap();

class Student {
    constructor(id, student_first, student_last, hobby) {
        this.id = id;
        this.student_first = student_first;
        this.student_last = student_last;
        this.hobby = hobby;
    }

    get id() {
        return _id.get(this);
    }

    set id(value) {
        _id.set(this,value);
    }

    get student_first() {
        return _student_first.get(this);
    }

    set student_first(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid firstname')
        }
        _student_first.set(this,value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    }

    get student_last() {
        return _student_last.get(this);
    }

    set student_last(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid lastname')
        }
        _student_last.set(this,value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    }

    get hobby() {
        return _hobby.get(this);
    }

    set hobby(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid hobby')
        }
        _hobby.set(this,value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    }

    toString() {
        return `Student {id: ${this.id}, first name: ${this.student_first}, last name: ${this.student_last}, hobby: ${this.hobby}}`
    }
};

module.exports = { Student }
