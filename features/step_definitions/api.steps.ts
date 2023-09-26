import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';

const BaseUrl = 'https://test.hedia.dev/api/v1';

When('I GET {string}', async function (path: string) {
  this.response = await axios.get(path, { baseURL: BaseUrl });
});

Then('status code should be {int}', function (status: number) {
  assert.equal(status, this.response.status);
});

Then('response should be valid JSON', function () {
  assert.doesNotThrow(() => this.response.data);
});


Given(/^there (is|are) at least (\d+) reports?$/, function (_, expectedNumber: number) {
  assert.ok(this.response.data.length >= expectedNumber, "There is not enough reports");
  this.reportId = this.response.data[0].id;
});

When(/^I GET the (first )?report$/, async function (_) {
  assert(this.reportId, "No report id");
  this.response = await axios.get(`/reports/${this.reportId}`, { baseURL: BaseUrl, validateStatus: function (status) { return status >= 200 && status < 500; } });
});

Then('the response should contain an array of tests', function () {
  assert.ok(this.response.data.tests.length >= 1, "No tests were found");
});

Given('I POST {string} with:', async function (path: string, data: string) {
  this.response = await axios.post(path, JSON.parse(data), { baseURL: BaseUrl });
});

Then('the response should contain a report', function () {
  assert.ok(this.response.data.id, "No report id");
  this.reportId = this.response.data.id;
});

Then('the response should contain the report', function () {
  assert.equal(this.response.data.id, this.reportId, "Report id does not match");
});

When('I DELETE the report', async function () {
  this.response = await axios.delete(`/reports/${this.reportId}`, { baseURL: BaseUrl });
});
