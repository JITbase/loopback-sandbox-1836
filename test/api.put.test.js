'use strict';

const supertest = require('supertest');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const app = require('../server/server');
const api = supertest(app);
const expect = chai.expect;
chai.use(dirtyChai);
const ObjectId = require('bson').ObjectId;

describe('Test api PUT', function() {
  this.timeout(1000);
  let newStudent;
  before(async function() {
    const {Student} = app.models;

    // create new student
    const studentToCreate = {id: new ObjectId(), firstName: 'John', lastName: 'Doe'};
    const newStudentRes = await Student.create(studentToCreate);
    newStudent = newStudentRes;
    return true;
  });

  describe('Replace student by id', function() {
    let res;
    it('should return status 200', async function() {
      res = await api.put(`/api/students/${newStudent.id}`)
      .send({firstName: 'Jane', lastName: 'Doe'})
      .expect(200);
      return res;
    });
    it('should have updated the instance', function(){
      expect(res).to.have.deep.property('body.firstName', 'Jane');
      expect(res).to.have.deep.property('body.lastName', 'Doe');
    });
  });
});
