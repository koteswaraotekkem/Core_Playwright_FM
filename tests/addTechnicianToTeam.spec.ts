import { test, expect } from './BaseTest';
import { APIAddTechnicianToTeam } from '../helpers/APIAddTechnicianToTeam';
import { randomUUID } from 'crypto';

test('FXDOPSTOY-1835 Verify the Assigning Technicians to a particular Team is saved or not', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  
  const response = await apiAddTechnician.addTechnicianToTeam('999');
    expect(response, `Expected API to return status 202 (Accepted) but received ${response}`).toBe(201);
});

test('FXDOPSTOY-2581 Make a Post to add a technician to team without TeamID', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  
  const response = await apiAddTechnician.addTechnicianToTeam('');
  expect(response, `Expected API to return status 404 (Accepted) but received ${response}`).toBe(404);
  
});

test('FXDOPSTOY-2582 Make a Post to add a technician to team without x-store-id', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  
  const response = await apiAddTechnician.addTechnicianToTeam('999', { storeId: '' });
    expect(response, `Expected API to return status 404 (Accepted) but received ${response}`).toBe(400);
});

test('FXDOPSTOY-2583 Make a Post to add a technician to team without x-enterprise-id', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  
  const response = await apiAddTechnician.addTechnicianToTeam('999', { enterpriseId: '' });
    expect(response, `Expected API to return status 404 (Accepted) but received ${response}`).toBe(400);
});

test('FXDOPSTOY-2584 Make a Post to add invalid employee to team', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  
  const response = await apiAddTechnician.addTechnicianToTeam('999', undefined, {
    employees: ['invalid-employee-id']
  });
    expect(response, `Expected API to return status 400 (Bad Request) but received ${response}`).toBe(400);
});

test('FXDOPSTOY-1980 remove technician', async () => {
  const apiAddTechnician = new APIAddTechnicianToTeam();
  const employeeId = randomUUID();
  
  let response = await apiAddTechnician.addTechnicianToTeam('999', undefined, {
    employees: [employeeId]
  });
  expect(response).toBe(201);
  
  response = await apiAddTechnician.removeTechnicianFromTeam('999', employeeId);
  expect(response, `Expected API to return status 204 (No Content) but received ${response}`).toBe(204);
});

