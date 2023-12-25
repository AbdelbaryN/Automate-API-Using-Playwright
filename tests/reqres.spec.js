import {test, expect} from '@playwright/test';

test.describe('API', () => {
    test('List Users', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time

        const response = await request.get(url + '/api/users', {
            params: {
                page: 2
            }
        });

        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds

        console.log(`API Response Time: ${responseTime} ms`);

        expect(responseTime).toBeLessThanOrEqual(1000);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody.page).toBe(2);
        expect(responseBody.total).toBe(12);
        expect(responseBody.per_page).toBe(6);
        expect(responseBody.data[0].id).toBe(7);
        expect(responseBody.data[0].email).toBe('michael.lawson@reqres.in');
        expect(responseBody.data[1].id).toBe(8);
        expect(responseBody.data[1].email).toBe('lindsay.ferguson@reqres.in');
        console.log(responseBody.support.text);
    });

    test('List a single user', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.get(url + '/api/users/2');
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        expect(responseBody.support.text).toBe('To keep ReqRes free, contributions towards server costs are appreciated!');
    })

    test('List a not found user', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.get(url + '/api/users/23');
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(404);
    })

    test('Create User', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.post(url + '/api/users', {
            data: {
                name: 'morpheus',
                job: 'leader'
            }
        });
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(2000);
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log(responseBody);
        const id = responseBody.id;
        expect(responseBody.id).toBe(id);
        console.log(id);
        expect(responseBody.name).toBe('morpheus');
        expect(responseBody.job).toBe('leader');
        expect(responseBody.createdAt).toBeTruthy();
        expect(responseBody.id).toBeTruthy();
    })

    test('Update User using put method', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.put(url + '/api/users/2', {
            data: {
                name: 'abdelbary',
                job: 'tester'
            },
            timeout: 1000
        });
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.name).toBe('abdelbary');
        expect(responseBody.job).toBe('tester');
        expect(responseBody.updatedAt).toBeTruthy();
    })

    test('Update User using patch method', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.patch(url + '/api/users/2', {
            data: {
                name: 'abdelbary',
                job: 'tester'
            },
            timeout: 1000
        });
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.name).toBe('abdelbary');
        expect(responseBody.job).toBe('tester');
        expect(responseBody.updatedAt).toBeTruthy();
    })

    test('Delete User', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.delete(url + '/api/users/2');
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(response.status()).toBe(204);
    })

    test('verify register failed', async ({ request }) => {
        const url = 'https://reqres.in';
        const startTime = performance.now(); // Record the start time
        const response = await request.post(url + '/api/register', {
            data: {
                email: "sydney@fife",
            }
        })
        const endTime = performance.now(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        console.log(`API Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.error).toBe("Missing password");
    })
})