/**
 * Universidad de La Laguna
 * Escuela Superior de Ingerniería y Tecnología
 * Grado en Ingenieria Informática
 * Asignatura Programación de Aplicaciones Interactivas (PAI)
 * Curso: 3º
 * Response of board: c8 with coverage
 * @author Cristo García González
 * @date 8 Abril 2021
 * @mail alu0101204512@ull.edu.es
 * @brief GradeSchool where to store and manipulate a set of grades with unique
 *   names
 **/
'use strict';
/**
 * Class representing the grades of a school's students
 */
export class GradeSchool {
  /**
   * Initialize the array that will contains "pairs"(name, grade)
   */
  constructor() {
    this.students = {};
  }

  /**
   * Return the roster
   * @return {array | int} - roster
   */
  roster() {
    return JSON.parse(JSON.stringify(this.students));
  };

  /**
   * Add the name of the new students and the associated grade
   * @param {string} name - name of the new student
   * @param {number} grade - grade of the new student
   */
  add(name, grade) {
    if (!Number.isInteger(grade) || grade < 0) {
      throw Error ('Number must be a positive integer');
    }
    this.findAndDelete(name);
    if (!(grade in this.students)) {
      this.students[grade] = [name];
    } else {
      this.students[grade].push(name);
      this.students[grade].sort();
    }
  };

  /**
   * Return all the nanmes of a determined grade
   * @param {Integer} grade - Requested grade
   * @return {Array | String} all the nanmes of a determined grade,
   *   empty array in case the requested grade is not initialized
   */
  grade(grade) {
    if (this.students[grade]) {
      return JSON.parse(JSON.stringify(this.students[grade]));
    }
    return [];
  };

  /**
   * Find and delete one element in the array if the name match
   * @param {String} name - name to identified the element to deleted when
   * finded
   */
  findAndDelete(name) {
    for (const GRADE in this.students) {
      if (this.students.hasOwnProperty(GRADE)) {
        const INDEX = this.students[GRADE].indexOf(name);
        if (INDEX > -1) {
          this.students[GRADE].splice(INDEX, 1);
        }
      }
    }
  };
};
