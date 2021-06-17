const app = require("../app");

class Student {
    constructor(id, student_first, student_last, hobby) {
        this.id = id;
        this.student_first = student_first;
        this.student_last = student_last;
        this.hobby = hobby;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get student_first() {
        return this._student_first;
    }

    set student_first(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid firstname')
        }
        this._student_first = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    get student_last() {
        return this._student_last;
    }

    set student_last(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid lastname')
        }
        this._student_last = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    get hobby() {
        return this._hobby;
    }

    set hobby(value) {
        if(value.length < 2 || value.length > 25) {
            throw new Error('Invalid hobby')
        }
        this._hobby = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    toString() {
        return `Student {id: ${this.id}, first name: ${this.student_first}, last name: ${this.student_last}, hobby: ${this.hobby}}`
    }

    capitalize() {
        return this.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}


module.exports = { Student }
