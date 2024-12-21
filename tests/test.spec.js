const { test, expect } = require('@playwright/test');

const {Ajv} = require("ajv");

const ajv = new Ajv()

test('get test', async ({ request }) => {

const response = await request.get('https://reqres.in/api/users/2');

expect(response.status()).toBe(200)

const responseJson = await response.json();

expect (responseJson.data.id).toEqual(2)
expect(responseJson.data.email).toBe("janet.weaver@reqres.in");

 const valid =  ajv.validate(require('./json-schema/get-object.schema.json'), responseJson);

if (!valid) {
console.error("AJV Validation Errors:", ajv.errorsText());
}
expect(valid).toBe(true);

});

test('post data', async ({ request }) => { 

  const body = {
    "name": "morpheus",
    "job": "leader"
  };
  
  const header = {
    Accept:'application/json'
  }
  
  const response = await request.post("https://reqres.in/api/users", {
    headers: header,
    data: body,
  });
    console.log(response.status());
    console.log(await response.json());
    expect(response.status()).toBe(201)


  });

  test('delete test', async ({ request }) => {

    const response = await request.delete('https://reqres.in/api/users/2');
    
    expect(response.status()).toBe(204)

});

test('put data', async ({ request }) => { 

    const body = {
      "name": "morpheus",
      "job": "zion resident"
    };
    
    const header = {
      Accept:'application/json'
    }
    
    const response = await request.put("https://reqres.in/api/users", {
      headers: header,
      data: body,
    });
      console.log(response.status());
      console.log(await response.json());
      expect(response.status()).toBe(200)
  
  
    });
